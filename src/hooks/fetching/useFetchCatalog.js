import {useState} from "react"
import {useFetching} from "../common/useFetching.js"

export function useFetchCatalog() {

    const [url, set_url] = useState(undefined)
    const [fetch_data, fetch_errors, fetch_loading] = useFetching(url)
    const [data, set_data] = useState([])

}