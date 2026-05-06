import {useEffect, useMemo, useRef, useState} from 'react'
import axios from 'axios'
import debounce from 'lodash/debounce'
import {useDispatch} from 'react-redux'
import {center_catalog_load, center_catalog_search} from '../../service/fetch_service.js'

export function useAsyncSelect({filial, type, value, limit = 20, delay = 500}) {
  const dispatch = useDispatch()

  const MAX_CACHE = 50

  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const cache = useRef(new Map())
  const abortRef = useRef(null)

  const fetchOptions = useMemo(
      () =>
          debounce(async (search) => {
        if (!filial) return

        const q = search?.trim().toLowerCase()

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
          const res = await dispatch(
              center_catalog_search(filial, type, q, limit, controller.signal)
          )

          if (abortRef.current !== controller) return

          const data = Array.isArray(res.data) ? res.data : []

          if (cache.current.size >= MAX_CACHE) {
            const firstKey = cache.current.keys().next().value
            cache.current.delete(firstKey)
          }

          cache.current.set(q, data)
          setOptions(data)
        } catch (err) {
          if (!axios.isCancel(err) && err.name !== 'AbortError') {
            console.error(err)
          }
        } finally {
          if (abortRef.current === controller) {
            setLoading(false)
          }
        }
          }, delay),
      [dispatch, filial, type, limit, delay]
  )

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
    cache.current.clear()
    setOptions([])
  }, [filial, type])

  useEffect(() => {
    if (!value || !filial) return

    const controller = new AbortController()

    const loadById = async () => {
      try {
        const res = await dispatch(
            center_catalog_load(filial, [{type, value}], controller.signal)
        )

        const data = Array.isArray(res.data) ? res.data : []

        const item = data[0]

        if (!item?.uid) return

        setOptions((prev) => {
          const exists = prev.some((option) => option.uid === item.uid)

          return exists ? prev : [item, ...prev]
        })
      } catch (err) {
        if (!axios.isCancel(err) && err.name !== 'AbortError') {
          console.error(err)
        }
      }
    }

    loadById()

    return () => controller.abort()
  }, [dispatch, filial, type, value])

  return {
    options,
    loading,
    inputValue,
    setInputValue,
    setOptions,
  }
}
