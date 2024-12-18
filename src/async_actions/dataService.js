import axios from "axios"
import {getBooking, setFilm, setFilms, setScheduleCity, setScheduleFilial, setSeance} from "../redux/scheduleReducer"
import {getHall} from "../redux/hallsReducer"
import {setCurrentOrder, setCurrentPreOrder} from "../redux/ordersReducer"
import {v4} from "uuid"
export const fetchFilms = (filials, date_shift_schedule_param) => {
    return async (dispatch) => {
        if (Array.isArray(filials)) {
            let final_array = []
            for (const filial of filials) {
                try {
                    const response = await axios.get(`http://${filial.ip}:${filial.port}/api/get_films?uid_filial=${filial.uid}&date_shift=${date_shift_schedule_param}`)
                    response.data.forEach(film => {
                        if (final_array.filter(el => el.uid === film.uid).length === 0) {
                            final_array.push(film)
                        }
                    })
                } catch (e) {
                    console.log(e.code)
                } finally {

                }
            }
            final_array.sort((a, b) => {
                const nameA = a.name.toUpperCase()
                const nameB = b.name.toUpperCase()
                if (nameA < nameB) {
                    return -1
                }
                if (nameA > nameB) {
                    return 1
                }
                return 0
            })
            dispatch(setFilms(final_array))
        } else {
            try {
                const response = await axios.get(`http://${filials.ip}:${filials.port}/api/get_films?uid_filial=${filials.uid}&date_shift=${date_shift_schedule_param}`)
                dispatch(setFilms(response.data))
            } catch (e) {
                console.log(e.code)
            } finally {

            }
        }
    }
}
export const fetchSchedule = (filials, date_shift_schedule_param) => {
    return async (dispatch) => {
        if (Array.isArray(filials)) {
            let final_array = []
            for (const filial of filials) {
                try {
                    const response= await axios.get(`http://${filial.ip}:${filial.port}/api/get_schedule?uid_filial=${filial.uid}&date_shift=${date_shift_schedule_param}`)
                    response.data.forEach(seance => {
                        final_array.push(seance)
                    })
                } catch (e) {
                    console.log(e.code)
                } finally {

                }
            }
            dispatch(setScheduleCity(final_array))
        } else {
            try {
                const response = await axios.get(`http://${filials.ip}:${filials.port}/api/get_schedule?uid_filial=${filials.uid}&date_shift=${date_shift_schedule_param}`)
                dispatch(setScheduleFilial(response.data))
            } catch (e) {
                console.log(e.code)
            } finally {

            }
        }
    }
}
export const fetchFilmSeances = (filials, date_shift_schedule_param, uid_film) => {
    return async (dispatch) => {
        if (Array.isArray(filials)) {
            let final_film = undefined
            for (const filial of filials) {
                try {
                    const response = await axios.get(`http://${filial.ip}:${filial.port}/api/get_film_seances?uid_filial=${filial.uid}&date_shift=${date_shift_schedule_param}&uid_film=${uid_film}`)
                        if (final_film === undefined) {
                            final_film = response.data
                        } else {
                            final_film.seances = final_film.seances.concat(response.data.seances)
                        }
                } catch (e) {

                }
            }
            dispatch(setFilm(final_film))
        } else {
            try {
                const response = await axios.get(`http://${filials.ip}:${filials.port}/api/get_film_seances?uid_filial=${filials.uid}&date_shift=${date_shift_schedule_param}&uid_film=${uid_film}`)
                dispatch(setFilm(response.data))
            } catch (e) {

            }
        }
    }
}
export const fetchSeance = (filial, uid_seance) => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://' + filial.ip + ':' + filial.port + '/api/get_seance?uid_seance=' + uid_seance)
            dispatch(setSeance(response.data))
        } catch (e) {
            return e
        }
    }
}
export const fetchHall = (filial, uid_hall) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://${filial.ip}:${filial.port}/api/get_hall?uid_hall=${uid_hall}`)
            dispatch(getHall(response.data))
        } catch (e) {

        }
    }
}
export const fetchBooking = (filial, uid_seance, uid_order) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://${filial.ip}:${filial.port}/api/get_booking?uid_seance=${uid_seance}&uid_order=${uid_order}`)
            dispatch(getBooking(response.data))
        } catch (e) {

        }
    }
}
export const fetchPreOrder = (filial, uid_order) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://${filial.ip}:${filial.port}/api/get_preorder?uid_order=${uid_order}`)
            dispatch(setCurrentPreOrder(response.data))
        } catch (e) {

        }
    }
}
export const deletePreOrder = (filial, uid_order) => {
    return async (dispatch) => {
        try {
            await axios.get(`http://${filial.ip}:${filial.port}/api/delete_preorder?uid_order=${uid_order}`).then(
                () => {
                    dispatch(setCurrentOrder({uid: v4(), price: 0, count: 0, books: []}))
                    dispatch(setCurrentPreOrder({uid: v4(), price: 0, count: 0, books: []}))
                }
            )
        } catch (e) {

        }
    }
}
export const takeSeat = (filial, uid_seance, uid_order, uid_place) => {
    return async () => {
        try {
            const response = await axios.get(`http://${filial.ip}:${filial.port}/api/take_seat?uid_seance=${uid_seance}&uid_order=${uid_order}&uid_place=${uid_place}`)
            return response.data
        } catch (e) {

        }
     }
}