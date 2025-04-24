import {useEffect} from "react"
import {PARAM_DATE_SHIFT, setTopMenu} from "../../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"

export function useSetTopMenu() {

    const dispatch = useDispatch()
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const top_menu = useSelector(state => state.interface.top_menu)
    const param_date = useSelector(state => state.interface.params.param_date)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)

    useEffect(() => {
        if (city !== undefined) {
            const top_menu_new = [[], []]
            let i = 0
            for (i; i < 2; i++) {
                top_menu[i].forEach(old_option => {
                    let new_option = structuredClone(old_option)
                    if (PARAM_DATE_SHIFT.find(el => el === new_option.id) !== undefined) {
                        new_option.path = `/${old_option.id}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${param_date}`
                    }
                    if (PARAM_DATE_SHIFT.find(el => el === new_option.id) === undefined) {
                        if (new_option.id.includes('admin')) {
                            new_option.path.forEach(el => {
                                el.path = `/${el.id}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${param_date_admin}`
                            })
                        } else {
                            new_option.path = `/${old_option.id}/${city.code}/${filial === undefined ? 'all' : filial.eais}/`
                        }
                    }
                    top_menu_new[i].push(new_option)
                })
            }
            dispatch(setTopMenu(top_menu_new))
        }
    }, [city, dispatch, filial, param_date, param_date_admin])
}