import {useEffect} from "react"
import {setTopMenu} from "../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"

export function useSetTopMenu() {

    const dispatch = useDispatch()
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const top_menu = useSelector(state => state.interface.top_menu)
    const param_date = useSelector(state => state.interface.params.param_date)

    useEffect(() => {
        if (city !== undefined && param_date !== undefined) {
            const top_menu_new = [[], []]
            let i = 0
            for (i; i < 2; i++) {
                top_menu[i].forEach(old_option => {
                    let new_option = Object.assign({}, old_option)
                    new_option.path = `/${old_option.id}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${['films', 'film', 'schedule'].find(p => p === old_option.id) !== undefined ? param_date + '/' : ''}`
                    top_menu_new[i].push(new_option)
                })
            }
            dispatch(setTopMenu(top_menu_new))
        }
    }, [city, dispatch, filial, param_date])

}