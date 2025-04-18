import {useEffect, useState} from "react"
import {FOOTER_HEIGHT, HEADER_HEIGHT, TOP_MENU_HEIGHT} from "../../redux/interfaceReducer.js"
import {useSelector} from "react-redux"

export function useSetContentHeight() {

    const current_page = useSelector(state => state.interface.current_page)
    const app_height = useSelector(state => state.interface.app_height)
    const permissions = useSelector(state => state.auth.permissions)
    const [authenticated, set_authenticated] = useState(0)
    const [height, setHeight] = useState('')
    const [show_pre_order, set_show_pre_order] = useState(false)

    useEffect(() => {
        if (permissions.includes(0)) {
            set_authenticated(1)
        } else {
            set_authenticated(0)
        }
        setHeight(`calc(${app_height}px - ${HEADER_HEIGHT[authenticated]}px - ${['menu', 'seance', 'admin/cinema', 'admin/horeca'].find(el => el === current_page) === undefined ? TOP_MENU_HEIGHT[authenticated] : 0}px - ${FOOTER_HEIGHT[authenticated]}px)`)
    }, [app_height, authenticated, permissions, current_page])

    useEffect(() => {
        if (permissions.includes(0)) {
            set_show_pre_order(true)
        } else {
            set_show_pre_order(false)
        }
    }, [permissions])

    return [height, show_pre_order]
}