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

export function duration_title(beginning, ending) {
    if (beginning !== null && ending !== null) {
        const diffMs = dayjs(ending).diff(dayjs(beginning))
        const dur = dayjs.duration(diffMs)
        const hours = dur.hours()
        const minutes = dur.minutes()
        if (hours === 0) {
            return `${minutes} мин`
        }
        return `${hours} ${pluralize(hours, 'час', 'часа', 'часов')}, ${minutes} мин`
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

export const ruToEnLayout = (text) => {
    const layoutMap = {
        'й': 'q',
        'ц': 'w',
        'у': 'e',
        'к': 'r',
        'е': 't',
        'н': 'y',
        'г': 'u',
        'ш': 'i',
        'щ': 'o',
        'з': 'p',
        'х': '[',
        'ъ': ']',
        'ф': 'a',
        'ы': 's',
        'в': 'd',
        'а': 'f',
        'п': 'g',
        'р': 'h',
        'о': 'j',
        'л': 'k',
        'д': 'l',
        'ж': ';',
        'э': '\'',
        'я': 'z',
        'ч': 'x',
        'с': 'c',
        'м': 'v',
        'и': 'b',
        'т': 'n',
        'ь': 'm',
        'б': ',',
        'ю': '.',
        'Ё': '~',
        'ё': '`',
        '"': '@',
        '№': '#',
        ';': '$',
        '%': '^',
        ':': '&',
        '?': '?'
    }
    return text.split('').map(char => {
        const lower = char.toLowerCase()
        const isUpper = char !== lower
        const replaced = layoutMap[lower] || char
        return isUpper ? replaced.toUpperCase() : replaced
    }).join('')
}

export function parceZone(local_date) {
    return local_date.replace(/([+-]\d{2}:\d{2}|Z)$/, '')
}

export function get_date_shift(now) {
    const hours = now.getHours()
    const date = new Date(now)
    if (hours < 7) {
        date.setDate(date.getDate() - 1)
    }
    date.setHours(0, 0, 0, 0)
    return date
}

export function buttonColor(inn) {
    switch (inn) {

        // Общепит
        case '816337562':
        case '7805682119':
        case '7814839207':
        case '7805682398':
        case '7842118084':
        case '7840057005':
        case '7840113490':
        case '7802827214':
        case '7840057051':
        case '7802823636':
        case '7802823629':
        case '7802803326':
        case '7802805669':
        case '7802809261':
        case '7802747907':
        case '7813685917':
        case '7802492374':
        case '7816337731':
            return '#45B97C'

        // Токино
        case '7840110308':
        case '7802868130':
        case '7802938073':
        case '7801728838':
        case '7802938098':
        case '7802967476':
            return '#ff7700'

        // МП
        case '4703146762':
            return '#E3000B'

        default:
            return 'ref'
    }

}


export const transformData = (data) => {
    return Object.fromEntries(Object.entries(data).map(([key, value]) => {
        if (['date_create', 'date_change', 'date_shift'].includes(key)) {
            return [key, value ? dayjs(parceZone(value)) : null]
        }
        return [key, value]
    }))
}

export const fillNameMap = (tables) => {
    const map = new Map()
    let ids = []
    tables.forEach(table => {
        table.rows.forEach(row => {
            Object.entries(row).forEach(([key, value]) => {
                switch (key) {
                    case 'uid_good':
                        if (value) {
                            map.set(`goods-${value}`, {
                                type: 'goods', value
                            })
                        }
                        break
                    case 'uid_payment_type':
                        if (value) {
                            map.set(`payment_types-${value}`, {
                                type: 'payment_types', value
                            })
                        }
                        break
                    case 'uid_discount':
                        if (value) {
                            map.set(`discounts-${value}`, {
                                type: 'discounts', value
                            })
                        }
                        break
                    case 'uid_store':
                        if (value) {
                            map.set(`stores-${value}`, {
                                type: 'stores', value
                            })
                        }
                        break
                    default:
                        break
                }
            })
        })
    })
    ids = [...map.values()]
    return ids
}

dayjs.extend(duration)