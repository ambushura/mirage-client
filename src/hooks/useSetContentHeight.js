import {useEffect, useState} from "react"
import {FOOTER_HEIGHT, HEADER_HEIGHT, TOP_MENU_HEIGHT} from "../redux/interfaceReducer.js"
import {useSelector} from "react-redux"

export function useSetContentHeight() {

    const app_height = useSelector(state => state.interface.app_height)
    const permissions = useSelector(state => state.auth.permissions)
    //const pre_order = useSelector(state => state.orders.pre_order)
    const [authenticated, set_authenticated] = useState(0)
    const [height, setHeight] = useState('')
    const [show_pre_order, set_show_pre_order] = useState(false)

    useEffect(() => {
        if (permissions.includes("staff")) {
            set_authenticated(1)
        } else {
            set_authenticated(0)
        }
        setHeight(`calc(${app_height}px - ${HEADER_HEIGHT[authenticated]}px - ${TOP_MENU_HEIGHT[authenticated]}px - ${FOOTER_HEIGHT[authenticated]}px)`)
    }, [app_height, authenticated, permissions])

    useEffect(() => {
        if (permissions.includes("staff")) {
            set_show_pre_order(true)
        } else {
            set_show_pre_order(false)
        }
    }, [permissions])

    return [height, show_pre_order]
}