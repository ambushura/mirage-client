import dayjs from "dayjs"
export const to_str_day = (input_date) => {
    return input_date.toLocaleDateString('ru-RU', {
        day: '2-digit',
    })
}
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