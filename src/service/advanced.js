import dayjs from "dayjs"
import duration from 'dayjs/plugin/duration'

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

dayjs.extend(duration)

export function duration_title(beginning, ending) {
    if (beginning !== null && ending !== null) {
        const diffMs = dayjs(ending).diff(dayjs(beginning))
        const dur = dayjs.duration(diffMs)
        const hours = dur.hours()
        const minutes = dur.minutes()
        if (hours === 0) {
            return `${minutes} мин`
        }
        return `${hours} ${pluralize(hours, 'час', 'часа', 'часов')}, ${minutes} мин)`
    } else {
        return null
    }
}

// Вспомогательная функция для склонения
function pluralize(n, one, few, many) {
    if (n % 10 === 1 && n % 100 !== 11) return one
    if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return few
    return many
}