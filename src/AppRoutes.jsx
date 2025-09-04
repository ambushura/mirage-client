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
    const [searchParams] = useSearchParams()

    useEffect(() => {
        dispatch(setCurrentPage(current_page))
    }, [dispatch, current_page])

    useEffect(() => {
        dispatch(setParams(params))
    }, [dispatch, params])

    useEffect(() => {
        const searchObj = Object.fromEntries(searchParams.entries())
        dispatch(setSearchParams(JSON.stringify(searchObj)))
    }, [dispatch, searchParams])

    const isAdmin = permissions.includes(0) && wp !== undefined

    const pages = {
        second_screen: <SecondScreen/>,
        schedule: <PageSchedule/>,
        films: <PageFilms/>,
        film: <PageFilm/>,
        seance: <PageSeance/>,
        kitchen: <PageKitchen/>,
        menu: isAdmin ? <PageHoreca/> : null,
        "admin/orders/cinema": isAdmin ? <PageAdmin/> : null,
        "admin/orders/horeca": isAdmin ? <PageAdmin/> : null,
        "admin/zbooks": isAdmin ? <PageAdmin/> : null,
        "admin/operations": isAdmin ? <PageAdmin/> : null,
        "admin/halls": isAdmin ? <PageAdmin/> : null,
        "admin/equipment": isAdmin ? <PageAdmin/> : null,
        "admin/egais": isAdmin ? <PageAdmin/> : null,
        "admin/staff": isAdmin ? <PageAdmin/> : null,
        "admin/acquiring": isAdmin ? <PageAdmin/> : null,
    }

    return (
        <Box id='page'>
            {pages[current_page] || null}
        </Box>
    )
}

export default AppRoutes