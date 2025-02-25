import dayjs from "dayjs"

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

export const from_dayjs_to_str = (value) => {
    return value.year() + '-' + (value.month() + 1) + '-' + (value.date())
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