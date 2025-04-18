import {useDispatch,useSelector} from "react-redux"
import {useEffect} from "react"
import {setCurrentPage,setParams,setSearchParams} from "./redux/interfaceReducer.js"
import {useParams,useSearchParams} from "react-router-dom"
import {Box,Fade} from "@mui/material"
import PageFilms from "./page/pages/films/PageFilms.jsx"
import PageFilm from "./page/pages/film/PageFilm.jsx"
import PageSeance from "./page/pages/seance/PageSeance.jsx"
import PageAdmin from "./page/pages/admin/PageAdmin.jsx"
import PageSchedule from "./page/pages/schedule/PageSchedule.jsx"
import PageHoreca from "./page/pages/horeca/PageHoreca.jsx"
import PageKitchen from "./page/pages/kitchen/PageKitchen.jsx"

const AppRoutes = (props)=> {

    const dispatch = useDispatch()
    const permissions = useSelector(state => state.auth.permissions)
    const params = useParams()
    const [search_params, set_search_params] = useSearchParams()

    useEffect(() => {
        dispatch(setCurrentPage(props.current_page))
    }, [dispatch, props.current_page])

    useEffect(() => {
        dispatch(setParams(params))
    }, [dispatch, params])

    useEffect(() => {
        dispatch(setSearchParams(JSON.stringify(Object.fromEntries(search_params.entries()))))
    }, [dispatch, search_params])

    useEffect(() => {
        if (!search_params.has("wp")) {
            const new_params = new URLSearchParams(search_params.toString())
            new_params.set("wp", "mpopcorn2")
            set_search_params(new_params, { replace: true })
        }
    }, [set_search_params])

    const pages = {
        schedule: <PageSchedule/>,
        films: <PageFilms/>,
        film: <PageFilm/>,
        seance: <PageSeance/>,
        menu: permissions.includes(0) && search_params.get("wp") ? <PageHoreca/> : null,
        "admin/cinema": permissions.includes(0) && search_params.get("wp") ? <PageAdmin/> : null,
        "admin/horeca": permissions.includes(0) && search_params.get("wp") ? <PageAdmin/> : null,
        kitchen: <PageKitchen/>
    }

    return <Fade in={!!pages[props.current_page]} unmountOnExit><Box>{pages[props.current_page] || null}</Box></Fade>
}

export default AppRoutes
