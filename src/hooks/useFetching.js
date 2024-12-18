import {useEffect, useState} from "react"
export function useFetching(url) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const response = await fetch(url)
                if (!response.ok) throw new Error(response.statusText)
                const data = await response.json()
                if (isMounted) setData(data)
            } catch (err) {
                if (isMounted) setError(err.message)
            } finally {
                if (isMounted) setLoading(false)
            }
        }
        fetchData()
        return () => {
            isMounted = false
        }
    }, [url])
    return [data, error, loading]
}
export default useFetching