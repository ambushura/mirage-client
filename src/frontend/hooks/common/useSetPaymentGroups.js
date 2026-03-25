import {useEffect, useState} from "react"

export function useSetPaymentGroups(order) {

    const [payment_group, set_payment_group] = useState({
        for_payment: {
            waiting: {
                mark_egais_items: {count: 0, selected: true, items: []},
                horeca_items: {count: 0, selected: true, items: []},
                cinema_items: {count: 0, selected: true, items: []},
                count: 0,
            }, slip_without_receipt: {
                mark_egais_items: {count: 0, selected: true, items: []},
                horeca_items: {count: 0, selected: true, items: []},
                cinema_items: {count: 0, selected: true, items: []},
                count: 0,
            }, success: {
                mark_egais_items: {count: 0, selected: false, items: []},
                horeca_items: {count: 0, selected: false, items: []},
                cinema_items: {count: 0, selected: false, items: []},
                count: 0,
            },
        }, for_returning: {
            waiting: {
                mark_egais_items: {count: 0, selected: false, items: []},
                horeca_items: {count: 0, selected: false, items: []},
                cinema_items: {count: 0, selected: false, items: []},
                count: 0,
            }, slip_without_receipt: {
                mark_egais_items: {count: 0, selected: false, items: []},
                horeca_items: {count: 0, selected: false, items: []},
                cinema_items: {count: 0, selected: false, items: []},
                count: 0,
            }, success: {
                mark_egais_items: {count: 0, selected: false, items: []},
                horeca_items: {count: 0, selected: false, items: []},
                cinema_items: {count: 0, selected: false, items: []},
                count: 0,
            },
        }
    })

    useEffect(() => {

        if (order !== null && order.for_payment !== null && order.for_returning !== null) {

            const payment_group_new = structuredClone(payment_group)

            Object.values(payment_group_new.for_payment).forEach(group => {
                Object.values(group).forEach(type => {
                    if (type && typeof type === 'object' && Array.isArray(type.items)) {
                        type.items = []
                    }
                })
            })
            Object.values(payment_group_new.for_returning).forEach(group => {
                Object.values(group).forEach(type => {
                    if (type && typeof type === 'object' && Array.isArray(type.items)) {
                        type.items = []
                    }
                })
            })

            payment_group_new.for_payment.waiting.mark_egais_items.count = order.for_payment.waiting.mark_egais_items.length
            payment_group_new.for_payment.waiting.horeca_items.count = order.for_payment.waiting.horeca_items.length
            payment_group_new.for_payment.waiting.cinema_items.count = order.for_payment.waiting.cinema_items.length
            payment_group_new.for_payment.waiting.count = payment_group_new.for_payment.waiting.mark_egais_items.count + payment_group_new.for_payment.waiting.horeca_items.count + payment_group_new.for_payment.waiting.cinema_items.count

            order.for_payment.waiting.mark_egais_items.forEach(item => {
                payment_group_new.for_payment.waiting.mark_egais_items.items.push(item.uid)
            })
            order.for_payment.waiting.horeca_items.forEach(item => {
                payment_group_new.for_payment.waiting.horeca_items.items.push(item.uid)
            })
            order.for_payment.waiting.cinema_items.forEach(item => {
                payment_group_new.for_payment.waiting.cinema_items.items.push(item.uid)
            })

            payment_group_new.for_payment.waiting.mark_egais_items.selected = true
            payment_group_new.for_payment.waiting.horeca_items.selected = true
            payment_group_new.for_payment.waiting.cinema_items.selected = true

            payment_group_new.for_payment.slip_without_receipt.mark_egais_items.count = order.for_payment.slip_without_receipt.mark_egais_items.length
            payment_group_new.for_payment.slip_without_receipt.horeca_items.count = order.for_payment.slip_without_receipt.horeca_items.length
            payment_group_new.for_payment.slip_without_receipt.cinema_items.count = order.for_payment.slip_without_receipt.cinema_items.length
            payment_group_new.for_payment.slip_without_receipt.count = payment_group_new.for_payment.slip_without_receipt.mark_egais_items.count + payment_group_new.for_payment.slip_without_receipt.horeca_items.count + payment_group_new.for_payment.slip_without_receipt.cinema_items.count

            order.for_payment.slip_without_receipt.mark_egais_items.forEach(item => {
                payment_group_new.for_payment.slip_without_receipt.mark_egais_items.items.push(item.uid)
            })
            order.for_payment.slip_without_receipt.horeca_items.forEach(item => {
                payment_group_new.for_payment.slip_without_receipt.horeca_items.items.push(item.uid)
            })
            order.for_payment.slip_without_receipt.cinema_items.forEach(item => {
                payment_group_new.for_payment.slip_without_receipt.cinema_items.items.push(item.uid)
            })

            payment_group_new.for_payment.slip_without_receipt.mark_egais_items.selected = true
            payment_group_new.for_payment.slip_without_receipt.horeca_items.selected = true
            payment_group_new.for_payment.slip_without_receipt.cinema_items.selected = true

            payment_group_new.for_returning.waiting.mark_egais_items.count = order.for_returning.waiting.mark_egais_items.length
            payment_group_new.for_returning.waiting.horeca_items.count = order.for_returning.waiting.horeca_items.length
            payment_group_new.for_returning.waiting.cinema_items.count = order.for_returning.waiting.cinema_items.length
            payment_group_new.for_returning.waiting.count = payment_group_new.for_returning.waiting.mark_egais_items.count + payment_group_new.for_returning.waiting.horeca_items.count + payment_group_new.for_returning.waiting.cinema_items.count

            payment_group_new.for_returning.slip_without_receipt.mark_egais_items.count = order.for_returning.slip_without_receipt.mark_egais_items.length
            payment_group_new.for_returning.slip_without_receipt.horeca_items.count = order.for_returning.slip_without_receipt.horeca_items.length
            payment_group_new.for_returning.slip_without_receipt.cinema_items.count = order.for_returning.slip_without_receipt.cinema_items.length
            payment_group_new.for_returning.slip_without_receipt.count = payment_group_new.for_returning.slip_without_receipt.mark_egais_items.count + payment_group_new.for_returning.slip_without_receipt.horeca_items.count + payment_group_new.for_returning.slip_without_receipt.cinema_items.count

            payment_group_new.for_returning.success.mark_egais_items.count = order.for_returning.success.mark_egais_items.length
            payment_group_new.for_returning.success.horeca_items.count = order.for_returning.success.horeca_items.length
            payment_group_new.for_returning.success.cinema_items.count = order.for_returning.success.cinema_items.length
            payment_group_new.for_returning.success.count = payment_group_new.for_returning.success.mark_egais_items.count + payment_group_new.for_returning.success.horeca_items.count + payment_group_new.for_returning.success.cinema_items.count

            set_payment_group(payment_group_new)

        }

    }, [order])

    return [payment_group, set_payment_group]

}