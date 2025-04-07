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
            set_search_params(prev => {
                const new_params = new URLSearchParams(prev)
                new_params.set("wp", "mpopcorn2")
                return new_params
            }, {replace: true})
        }
    }, [search_params, set_search_params])

    const pages = {
        schedule: <PageSchedule/>,
        films: <PageFilms/>,
        film: <PageFilm/>,
        seance: <PageSeance/>,
        menu: permissions.includes("staff") ? <PageHoreca/> : null,
        "admin/cinema": permissions.includes("staff") ? <PageAdmin/> : null,
        "admin/horeca": permissions.includes("staff") ? <PageAdmin/> : null
    }

    return <Fade in={!!pages[props.current_page]} unmountOnExit><Box>{pages[props.current_page] || null}</Box></Fade>
}

export default AppRoutes
