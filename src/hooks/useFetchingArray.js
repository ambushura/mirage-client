import {useEffect, useState} from 'react'

export function useFetchingArray(urls) {
    const [data, setData] = useState([])
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let isMounted = true
        const fetchAllData = async () => {
            setLoading(true)
            setData([])
            setErrors([])
            try {
                const results = await Promise.all(
                    urls.map(async (url, index) => {
                        try {
                            const response = await fetch(url.url)
                            if (!response.ok) throw new Error(response.statusText)
                            const data = await response.json()
                            return {index, data: {data: data.data, filial: url.filial}, error: null}
                        } catch (err) {
                            return {index, data: {data: null, filial: url.filial}, error: err.message}
                        }
                    })
                )
                if (isMounted) {
                    const sortedResults = results.sort((a, b) => a.index - b.index)
                    setData(sortedResults.map((res) => res.data))
                    setErrors(sortedResults.map((res) => res.error))
                }
            } catch (err) {
                if (isMounted) setErrors([err.message])
            } finally {
                if (isMounted) setLoading(false)
            }
        }
        fetchAllData()
        return () => {
            isMounted = false
        }
    }, [urls])
    return [data, errors, loading]
}