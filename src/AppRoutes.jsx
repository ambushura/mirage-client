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
        menu: uid_user !== null && <PageHoreca/>,
        "admin/orders/cinema": uid_user !== null && <PageAdmin/>,
        "admin/orders/horeca": uid_user !== null && <PageAdmin/>,
        "admin/zbooks": uid_user !== null && <PageAdmin/>,
        "admin/zbook": uid_user !== null && <PageAdmin/>,
        "admin/receipt": uid_user !== null && <PageAdmin/>,
        "admin/slip": uid_user !== null && <PageAdmin/>,
        "admin/operations": uid_user !== null && <PageAdmin/>,
        "admin/operation": uid_user !== null && <PageAdmin/>,
        "admin/halls": uid_user !== null && <PageAdmin/>,
        "admin/scheme": uid_user !== null && <PageAdmin/>,
        "admin/egais": uid_user !== null && <PageAdmin/>,
        "admin/staff": uid_user !== null && <PageAdmin/>,
        "admin/acquiring": uid_user !== null && <PageAdmin/>,
        "admin/sales": uid_user !== null && <PageAdmin/>,
    }

    return <Box id='page'>{pages[current_page] || null}</Box>
}

export default AppRoutes