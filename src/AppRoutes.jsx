import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useParams, useSearchParams} from "react-router-dom"
import {Box, Fade} from "@mui/material"

import {setCurrentPage, setParams, setSearchParams} from "./redux/interfaceReducer.js"

import PageFilms from "./page/pages/films/PageFilms.jsx"
import PageFilm from "./page/pages/film/PageFilm.jsx"
import PageSeance from "./page/pages/seance/PageSeance.jsx"
import PageAdmin from "./page/pages/admin/PageAdmin.jsx"
import PageSchedule from "./page/pages/schedule/PageSchedule.jsx"
import PageHoreca from "./page/pages/horeca/PageHoreca.jsx"
import PageKitchen from "./page/pages/kitchen/PageKitchen.jsx"

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
        schedule: <PageSchedule/>,
        films: <PageFilms/>,
        film: <PageFilm/>,
        seance: <PageSeance/>,
        menu: isAdmin ? <PageHoreca/> : null,
        "admin/orders/cinema": isAdmin ? <PageAdmin/> : null,
        "admin/orders/horeca": isAdmin ? <PageAdmin/> : null,
        "admin/zbooks": isAdmin ? <PageAdmin/> : null,
        "admin/operations": isAdmin ? <PageAdmin/> : null,
        "admin/halls": isAdmin ? <PageAdmin/> : null,
        "admin/equipment": isAdmin ? <PageAdmin/> : null,
        "admin/egais": isAdmin ? <PageAdmin/> : null,
        kitchen: <PageKitchen/>
    }

    return (
        <Fade in={!!pages[current_page]} unmountOnExit>
            <Box id='page'>
                {pages[current_page] || null}
            </Box>
        </Fade>
    )
}

export default AppRoutes