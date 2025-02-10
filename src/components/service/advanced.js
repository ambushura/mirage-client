import dayjs from "dayjs"
import {v4} from "uuid"
export const NEW_EMPTY_ORDER = () => { return {uid: v4(), price: 0, quantity: 0, booking: [], new: true} }
export const ORDER_TIME_OUT = 1000
export function to_str_DAY(date) {
    let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
    return days[date.getDay()]
}
export const date_dayjs = (value) => {
    const yyyy = value.toLocaleDateString('ru-RU', {year: 'numeric'})
    const mm = value.toLocaleDateString('ru-RU', {month: '2-digit'})
    const dd = value.toLocaleDateString('ru-RU', {day: '2-digit'})
    return dayjs(yyyy + '-' + mm + '-' + dd)
}
 export const ticket_count = (count) => {
     if (count === 1) {
         return (`${count} билет`)
     } else if (count === 2 || count === 3 || count === 4) {
         return (`${count} билета`)
     } else {
         return (`${count} билетов`)
     }
 }