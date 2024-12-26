import React from 'react'
import {NavLink} from "react-router-dom"
import {useSelector} from "react-redux"
import dayjs from "dayjs"
const SeanceCard = (props) => {
    const city = props.city
    const filial = props.filial
    const seance = props.seance
    const date_param = useSelector(state => state.schedule.date_param)
    const beginning = dayjs(seance.beginning.replace('Z',''))
    return (
        <NavLink to={`/seance/${city.code}/${filial.eais}/?date=${date_param}&seance=${seance.uid}`}>
            <div className='seances-body-seance'>
                <div className='seances-body-seance-description'>
                    <div
                        className='seances-body-seance-description-time'>
                        {String(beginning.$H).padStart(2, '0')}:{String(beginning.$m).padStart(2, '0')}
                    </div>
                    <div
                        className='seances-body-seance-description-copy-type'>
                        {seance.copy_type}
                    </div>
                </div>
                <div className='seances-body-seance-price'>
                    от 190 p
                </div>
            </div>
        </NavLink>
    )
}
export default SeanceCard