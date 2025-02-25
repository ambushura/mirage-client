import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import {setCurrentPage, setParams, setSearchParams} from "./redux/interfaceReducer.js"
import {useParams, useSearchParams} from "react-router-dom"
import {Box, Fade} from "@mui/material"
import PageFilms from "./page/pages/films/PageFilms.jsx"
import PageFilm from "./page/pages/film/PageFilm.jsx"
import PageSeance from "./page/pages/seance/PageSeance.jsx"
import PageAdmin from "./page/pages/admin/PageAdmin.jsx"
import PageSchedule from "./page/pages/schedule/PageSchedule.jsx"
import PageHoreca from "./page/pages/horeca/PageHoreca.jsx"

const AppRoutes = (props) => {

    // Служебные функции
    const dispatch = useDispatch()

    // Данные из хранилища
    const permissions = useSelector(state => state.auth.permissions)

    // Параметры
    const params = useParams()
    const [search_params] = useSearchParams()
    useEffect(() => {
        dispatch(setCurrentPage(props.current_page))
        dispatch(setParams(params))
        dispatch(setSearchParams(JSON.stringify(Object.fromEntries(search_params.entries()))))
    }, [dispatch, props.current_page, params, search_params])

    return (
        <>
            <Fade in={props.current_page === 'schedule'} unmountOnExit>
                <Box>
                    {props.current_page === 'schedule' ? <PageSchedule/> : <></>}
                </Box>
            </Fade>
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
            {permissions.includes('staff') ?
                <>
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
                </> : <></>}
        </>
    )
}

export default AppRoutes