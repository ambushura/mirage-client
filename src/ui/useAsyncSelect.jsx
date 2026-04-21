import {useEffect, useMemo, useRef, useState} from "react"
import axios from "axios"
import debounce from "lodash/debounce"
import {useSelector} from "react-redux"

export function useAsyncSelect({filial, type, value, limit = 20, delay = 300}) {

    const MAX_CACHE = 50

    const {wp, kiosk, version} = useSelector(state => state.interface)
    const {center} = useSelector(state => state.center)

    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(false)
    const [inputValue, setInputValue] = useState("")

    const cache = useRef(new Map())
    const abortRef = useRef(null)
    const token = localStorage.getItem("token")

    const headers = useMemo(() => ({
        Authorization: token, uid_filial: filial?.uid ?? "", wp, kiosk: String(kiosk), version, center: String(center),
    }), [token, filial, wp, kiosk, version, center])

    const fetchOptions = useMemo(() => debounce(async (search) => {

        if (!filial) return

        const q = search?.trim()

        if (!q) {
            setOptions([])
            return
        }

        if (cache.current.has(q)) {
            setOptions(cache.current.get(q))
            return
        }

        abortRef.current?.abort()
        const controller = new AbortController()
        abortRef.current = controller

        setLoading(true)

        try {
            const res = await axios.get(`http://${filial.ip}:${filial.port}/api/catalog/search`, {
                params: {type, value: q, limit}, headers, signal: controller.signal
            })

            const data = res.data ?? []

            if (cache.current.size >= MAX_CACHE) {
                const first = cache.current.keys().next().value
                cache.current.delete(first)
            }

            cache.current.set(q, data)
            setOptions(data)

        } catch (err) {
            if (err.name !== "CanceledError" && err.name !== "AbortError") {
                console.error(err)
            }
        } finally {
            setLoading(false)
        }

    }, delay), [delay, filial, type, limit, headers])

    useEffect(() => {
        return () => {
            fetchOptions.cancel()
            abortRef.current?.abort()
        }
    }, [fetchOptions])

    useEffect(() => {
        fetchOptions(inputValue)
    }, [inputValue, fetchOptions])

    useEffect(() => {

        if (!value || !filial) return

        const controller = new AbortController()

        const loadById = async () => {
            try {
                const res = await axios.get(`http://${filial.ip}:${filial.port}/api/catalog/load`, {
                    params: {value: value, type}, headers, signal: controller.signal
                })

                const item = res.data
                if (!item) return

                setOptions(prev => {
                    if (!prev.find(o => o.uid === item.uid)) {
                        return [item, ...prev]
                    }
                    return prev
                })

            } catch (err) {
                if (err.name !== "CanceledError" && err.name !== "AbortError") {
                    console.error(err)
                }
            }
        }

        loadById()

        return () => controller.abort()

    }, [value, type, filial, headers])

    return {
        options, loading, inputValue, setInputValue, setOptions
    }
}