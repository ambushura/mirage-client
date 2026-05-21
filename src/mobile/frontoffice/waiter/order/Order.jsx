import './order.css'

const kitchenStates = {
    NONE: {
        label: '—',
        className: 'none',
    },
    COOKING: {
        label: '🔥',
        className: 'cooking',
    },
    READY: {
        label: '✔',
        className: 'ready',
    },
    CANCELED: {
        label: '✕',
        className: 'canceled',
    },
}

const orders = [
    {
        id: 1,
        name: 'Пицца Пепперони большая с двойным сыром',
        modifiers: ['+ сыр', '+ соус BBQ'],
        price: 1450,
        course: 2,
        kitchen: 'COOKING',
    },
    {
        id: 2,
        name: 'Стейк Рибай medium rare',
        modifiers: ['+ картофель', '+ перечный соус'],
        price: 3200,
        course: 1,
        kitchen: 'READY',
    },
    {
        id: 3,
        name: 'Цезарь с курицей',
        modifiers: [],
        price: 950,
        course: 3,
        kitchen: 'NONE',
    },
    {
        id: 4,
        name: 'Бургер фирменный острый очень длинное название',
        modifiers: ['+ бекон', '+ сыр', '+ халапеньо'],
        price: 1250,
        course: 4,
        kitchen: 'CANCELED',
    },
    {
        id: 5,
        name: 'Бургер фирменный острый очень длинное название',
        modifiers: ['+ бекон', '+ сыр', '+ халапеньо'],
        price: 1250,
        course: 4,
        kitchen: 'CANCELED',
    },
    {
        id: 6,
        name: 'Бургер фирменный острый очень длинное название',
        modifiers: ['+ бекон', '+ сыр', '+ халапеньо'],
        price: 1250,
        course: 4,
        kitchen: 'CANCELED',
    },
    {
        id: 7,
        name: 'Бургер фирменный острый очень длинное название',
        modifiers: ['+ бекон', '+ сыр', '+ халапеньо'],
        price: 1250,
        course: 4,
        kitchen: 'CANCELED',
    },
    {
        id: 8,
        name: 'Бургер фирменный острый очень длинное название',
        modifiers: ['+ бекон', '+ сыр', '+ халапеньо'],
        price: 1250,
        course: 4,
        kitchen: 'CANCELED',
    },
    {
        id: 9,
        name: 'Бургер фирменный острый очень длинное название',
        modifiers: ['+ бекон', '+ сыр', '+ халапеньо'],
        price: 1250,
        course: 4,
        kitchen: 'CANCELED',
    },
    {
        id: 10,
        name: 'Бургер фирменный острый очень длинное название',
        modifiers: ['+ бекон', '+ сыр', '+ халапеньо'],
        price: 1250,
        course: 4,
        kitchen: 'CANCELED',
    },
    {
        id: 11,
        name: 'Бургер фирменный острый очень длинное название',
        modifiers: ['+ бекон', '+ сыр', '+ халапеньо'],
        price: 1250,
        course: 4,
        kitchen: 'CANCELED',
    },
    {
        id: 12,
        name: 'Бургер фирменный острый очень длинное название',
        modifiers: ['+ бекон', '+ сыр', '+ халапеньо'],
        price: 1250,
        course: 4,
        kitchen: 'CANCELED',
    },
    {
        id: 13,
        name: 'Бургер фирменный острый очень длинное название',
        modifiers: ['+ бекон', '+ сыр', '+ халапеньо'],
        price: 1250,
        course: 4,
        kitchen: 'CANCELED',
    },
    {
        id: 14,
        name: 'Бургер фирменный острый очень длинное название',
        modifiers: ['+ бекон', '+ сыр', '+ халапеньо'],
        price: 1250,
        course: 4,
        kitchen: 'CANCELED',
    },
]

export default function Order() {
    return (
        <div className="mobile-order">
            <div className="mobile-order__list">
                {orders.map((item) => {
                    const state = kitchenStates[item.kitchen]

                    return (
                        <div key={item.id} className="order-item">
                            <button className="order-item__number">{item.id}</button>
                            <div className="order-item__info">
                                <div className="order-item__name">{item.name}</div>
                                {!!item.modifiers.length && <div className="order-item__mods">{item.modifiers.join(', ')}</div>}
                            </div>
                            <div className="order-item__price">{item.price} RUB</div>
                            <div className="order-item__course">K{item.course}</div>
                            <div className={`order-item__kitchen ${state.className}`}>{state.label}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
