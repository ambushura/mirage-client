import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import {setTopMenu} from "./redux/interfaceReducer.js"
import {useSetCityAndFilial} from "./hooks/useSetCityAndFilial.js"
import {useParams} from "react-router-dom"
import {useSetCurrentPage} from "./hooks/useSetCurrentPage.js"
import {Box, Fade} from "@mui/material"
import PageFilms from "./page/pages/films/PageFilms.jsx"
import {useSetDateShift} from "./hooks/useSetDateShift.js"
import PageFilm from "./page/pages/film/PageFilm.jsx"
import PageSeance from "./page/pages/seance/PageSeance.jsx"
import PageAdmin from "./page/pages/admin/PageAdmin.jsx"
import PageHoreca from "./page/pages/horeca/PageHoreca.jsx"

const AppRoutes = (props) => {

    const dispatch = useDispatch()

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const top_menu = useSelector(state => state.interface.top_menu)

    // Установка города и филиала по умолчанию
    const {param_city, param_filial, param_date} = useParams()
    useSetCityAndFilial(param_city, param_filial)
    // Установка даты смены расписания
    useSetDateShift(param_date)
    // Установка текущей страницы
    useSetCurrentPage(props.current_page)

    // Заполнение главного меню, исходя из города, филиала и авторизации
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

    return (
        <>
            <Fade in={props.current_page === 'films'} unmountOnExit>
                <Box>
                    {props.current_page === 'films' ? <PageFilms/> : <></>}
                </Box>
            </Fade>
            <Fade in={props.current_page === 'film'} unmountOnExit>
                <Box>
                    {props.current_page === 'film' ? <PageFilm/> : <></>}
                </Box>
            </Fade>
            <Fade in={props.current_page === 'seance'} unmountOnExit>
                <Box>
                    {props.current_page === 'seance' ? <PageSeance/> : <></>}
                </Box>
            </Fade>
            <Fade in={props.current_page === 'menu'} unmountOnExit>
                <Box>
                    {props.current_page === 'menu' ? <PageHoreca/> : <></>}
                </Box>
            </Fade>
            <Fade in={props.current_page === 'admin'} unmountOnExit>
                <Box>
                    {props.current_page === 'admin' ? <PageAdmin/> : <></>}
                </Box>
            </Fade>
        </>
    )
}
export default AppRoutes