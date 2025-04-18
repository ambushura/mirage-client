import {Box, Fade} from "@mui/material"
import ScheduleMenu from "../../../components/cinema/ScheduleMenu.jsx"
import Order from "../../../components/orders/Order.jsx"
import {useSetContentHeight} from "../../../hooks/interface/useSetContentHeight.js"
import cover from "../../../images/cover.jpg"
import SeanceCard from "./SeanceCard.jsx"
import {useSetFilm} from "../../../hooks/pages/useSetFilm.js"
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import {setFilm} from "../../../redux/scheduleReducer.js"
import Loader from "../../../components/modal/Loader.jsx"
import {TIMEOUT} from "../../../redux/interfaceReducer.js"

const PageFilm = () => {

    // Служебные функции
    const dispatch = useDispatch()

    // Данные из хранилища
    const city = useSelector(state => state.data.city)
    const film = useSelector(state => state.schedule.film_seances.film)
    const filials_seances = useSelector(state => state.schedule.film_seances.data)

    // Хуки
    const [fetch_film, fetch_data] = useSetFilm()
    const [content_height, show_pre_order] = useSetContentHeight()

    // Монтаж/демонтаж
    useEffect(() => {
        dispatch(setFilm({film: fetch_film, data: fetch_data}))
        return () => {
            dispatch(setFilm({film: undefined, data: []}))
        }
    }, [dispatch, fetch_data, fetch_film])

    return (
        <>
            <ScheduleMenu/>
            <Box sx={{
                display: 'flex',
                height: content_height,
            }}>
                <Box id="content-wrap" style={{display: 'flex'}}>
                    <Box id="content-wrap"
                         sx={{height: content_height}}>
                        <div className="gradient-block-bottom"></div>
                        <Box id="content"
                             sx={{height: content_height}}
                             style={{overflowX: 'hidden'}}>
                            <Box className='seances-body-poster'>
                                {film !== undefined ?
                                    <Box className='seances-cover'>
                                        <img className='seances-cover-img'
                                             src={film.cover_link === '' ? cover : "http://msk-rst-media.cinema.mirage.ru" + film.cover_link}
                                             alt={film.name}/>
                                    </Box> : <></>}
                                <Box className='seances-body'>
                                    {film !== undefined ? <Box className='seances-body-description'>
                                        <Box className='seances-body-description-name'>{film.name}</Box>
                                        <Box className='seances-body-description-genre'>ужасы, триллеры</Box>
                                        <Box>{film.description}</Box>
                                    </Box> : <></>}
                                    {filials_seances.map(filial_seances => {
                                        if (filial_seances.error !== null) {
                                            return (<></>)
                                        } else if (filial_seances.loading) {
                                            return (
                                                <Box className='seances-body-filial'
                                                     key={filial_seances.filial.uid}>
                                                    <Box
                                                        className='seances-body-filial-name'>{filial_seances.filial.name}</Box>
                                                    <Box className='seances-body-seances'>
                                                        <Loader key={filial_seances.filial.uid}/>
                                                    </Box>
                                                </Box>)
                                        } else {
                                            return (
                                                <Fade key={filial_seances.filial.uid}
                                                      in={filial_seances.data.seances.length > 0} timeout={TIMEOUT}
                                                      unmountOnExit>
                                                    <Box className='seances-body-filial'>
                                                        <Box
                                                            className='seances-body-filial-name'>{filial_seances.filial.name}</Box>
                                                        <Box className='seances-body-seances'>
                                                            {filial_seances.data.seances.map(seance => {
                                                                return (<SeanceCard
                                                                    key={`${filial_seances.filial.uid}${seance.uid}`}
                                                                    seance={seance}
                                                                    city={city}
                                                                    filial={filial_seances.filial}
                                                                />)
                                                            })}
                                                        </Box>
                                                    </Box>
                                                </Fade>
                                            )
                                        }
                                    })}
                                </Box>
                                <Box className='seances-rate'>IMDB 4.7</Box>
                            </Box>
                        </Box>
                    </Box>
                    {show_pre_order ? <Order/> : <></>}
                </Box>
            </Box>
        </>
    )
}

export default PageFilm