import dayjs from "dayjs"
import {NavLink} from "react-router-dom"

const SeanceCard = (props) => {

    const city = props.city
    const filial = props.filial
    const seance = props.seance
    const beginning = dayjs(seance.beginning.replace('Z', ''))

    const min_tariff = (seance) => {
        let result = 1000000000
        seance.tariff.forEach(t => {
            if (t.price < result) {
                result = t.price
            }
        })
        return result
    }

    return (
        <NavLink to={`/seance/${city.code}/${filial.eais}/${seance.uid}/`}>
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
                    от {min_tariff(seance)} р
                </div>
            </div>
        </NavLink>
    )
}

export default SeanceCard