import React from 'react'
import FilmCard from "./FilmCard"
import {useSelector} from "react-redux"
const Films = () => {
    const films = useSelector(state => state.schedule.films)
    return (
        <>
            {films.map(film => {
                return (
                    <FilmCard
                        key={film.uid + film.ver}
                        film={film}/>
                )
            })}
        </>
    )
}
export default Films