import {useEffect} from "react"
import {PARAM_DATE_SHIFT, setTopMenu} from "../../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"
import {from_dayjs_to_str} from "../../service/advanced.js";
import dayjs from "dayjs";

export function useSetTopMenu() {

    const dispatch = useDispatch()
    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const top_menu = useSelector(state => state.interface.top_menu)
    const param_date = useSelector(state => state.interface.params.param_date)

    useEffect(() => {
        if (city !== undefined) {
            const top_menu_new = [[], []]
            let i = 0
            for (i; i < 2; i++) {
                top_menu[i].forEach(old_option => {
                    let new_option = Object.assign({}, old_option)
                    if (PARAM_DATE_SHIFT.find(el => el === new_option.id) !== undefined) {
                        if (param_date === undefined) {
                            new_option.path = `/${old_option.id}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${from_dayjs_to_str(dayjs(new Date()))}`
                        } else {
                            new_option.path = `/${old_option.id}/${city.code}/${filial === undefined ? 'all' : filial.eais}/${param_date}`
                        }
                    }
                    if (PARAM_DATE_SHIFT.find(el => el === new_option.id) === undefined) {
                        new_option.path = `/${old_option.id}/${city.code}/${filial === undefined ? 'all' : filial.eais}/`
                    }
                    top_menu_new[i].push(new_option)
                })
            }
            dispatch(setTopMenu(top_menu_new))
        }
    }, [city, dispatch, filial, param_date])
}