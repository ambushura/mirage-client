import { useEffect, useState } from 'react'

export function useFetchingArray(urls) {

    const [results, set_results] = useState([])

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            const initialResults = urls.map(url => ({
                url: url.url,
                data: null,
                filial: url.filial,
                loading: true,
                error: null
            }))
            set_results(initialResults)
            const fetchResults = await Promise.all(
                urls.map(async (url) => {
                    try {
                        const response = await fetch(url.url)
                        if (!response.ok) throw new Error(response.statusText)
                        const json = await response.json()
                        return {url: url.url, data: json.data, filial: url.filial, loading: false, error: null}
                    } catch (err) {
                        return {url: url.url, data: null, filial: url.filial, loading: false, error: err.message}
                    }
                })
            )
            if (isMounted) {
                set_results(fetchResults)
            }
        }
        fetchData()
        return () => {
            isMounted = false
        }
    }, [urls])

    return results
}