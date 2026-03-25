import dayjs from "dayjs"
import {NavLink} from "react-router-dom"
import {useSelector} from "react-redux"

const SeanceCard = (props) => {

    const city = props.city
    const filial = props.filial
    const seance = props.seance
    const beginning = dayjs(seance.beginning.replace('Z', ''))
    const {wp, kiosk} = useSelector(state => state.interface)

    const min_tariff = (seance) => {
        let result = undefined
        seance.tariff.forEach(t => {
            if (t.price < result || result === undefined) {
                result = t.price
            }
        })
        return result
    }

    return <NavLink
        to={`/seance/${city.code}/${filial.eais}/${seance.uid}?${wp !== null ? 'wp=' + wp : ''}${kiosk ? '&kiosk' : ''}`}>
        <div className='seances-body-seance'>
            <div
                className={`seances-body-seance-description ${!seance.opened ? 'seances-body-seance-description-closed' : seance.canceled ? 'seances-body-seance-description-canceled' : ''}`}>
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
                от {min_tariff(seance)} р
            </div>
        </div>
    </NavLink>
}

export default SeanceCard