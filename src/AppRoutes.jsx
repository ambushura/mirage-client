import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useParams, useSearchParams} from "react-router-dom"
import {Box} from "@mui/material"

import {setCurrentPage, setParams, setSearchParams} from "./redux/interfaceReducer.js"

import PageFilms from "./page/body/films/PageFilms.jsx"
import PageFilm from "./page/body/film/PageFilm.jsx"
import PageSeance from "./page/body/seance/PageSeance.jsx"
import PageAdmin from "./page/body/admin/PageAdmin.jsx"
import PageSchedule from "./page/body/schedule/PageSchedule.jsx"
import PageHoreca from "./page/body/menu/PageHoreca.jsx"
import PageKitchen from "./page/body/kitchen/PageKitchen.jsx"
import SecondScreen from "./page/body/second_screen/SecondScreen.jsx"

const AppRoutes = ({current_page}) => {

    const dispatch = useDispatch()

    const permissions = useSelector(state => state.auth.permissions)
    const wp = useSelector(state => state.interface.wp)

    const params = useParams()
    const [search_params] = useSearchParams()

    useEffect(() => {
        dispatch(setCurrentPage(current_page))
    }, [dispatch, current_page])

    useEffect(() => {
        dispatch(setParams(params))
    }, [dispatch, params])

    useEffect(() => {
        const search_params_new = Object.fromEntries(search_params.entries())
        dispatch(setSearchParams(JSON.stringify(search_params_new)))
    }, [dispatch, search_params])

    const uid_user = useSelector(state => state.auth.uid)

    const pages = {
        second_screen: <SecondScreen/>,
        schedule: <PageSchedule/>,
        films: <PageFilms/>,
        film: <PageFilm/>,
        seance: <PageSeance/>,
        kitchen: <PageKitchen/>,
        menu: uid_user !== null ? <PageHoreca/> : null,
        "admin/orders/cinema": uid_user !== null ? <PageAdmin/> : null,
        "admin/orders/horeca": uid_user !== null ? <PageAdmin/> : null,
        "admin/zbooks": uid_user !== null ? <PageAdmin/> : null,
        "admin/operations": uid_user !== null ? <PageAdmin/> : null,
        "admin/halls": uid_user !== null ? <PageAdmin/> : null,
        "admin/scheme": uid_user !== null ? <PageAdmin/> : null,
        "admin/egais": uid_user !== null ? <PageAdmin/> : null,
        "admin/staff": uid_user !== null ? <PageAdmin/> : null,
        "admin/acquiring": uid_user !== null ? <PageAdmin/> : null,
        "admin/sales": uid_user !== null ? <PageAdmin/> : null,
    }

    return <Box id='page'>{pages[current_page] || null}</Box>
}

export default AppRoutes