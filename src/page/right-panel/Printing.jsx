import {Box, Button} from "@mui/material"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import {useEffect, useState} from "react"
import {common_printers_get, equipment_action} from "../../service/fetch_service.js"
import {useDispatch, useSelector} from "react-redux"
import BookingItem from "./BookingItem.jsx"
import {ROUTE_EQUIPMENT_KKT_BILL_PRINT, ROUTE_EQUIPMENT_KKT_TICKETS_PRINT} from "../../service/fetch_routes.js"
import {selectUidCinema} from "../../redux/ordersReducer.js"

const Printing = (props) => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const [printers, set_printers] = useState({kkt: [], kitchen_points: []})
    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_printers_get(filial))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.error === null && fetching_result.data !== null) {
                set_printers(fetching_result.data)
            }
        }
        if (filial !== undefined) {
            fetch()
        }
    }, [dispatch, filial])

    useEffect(() => {
        dispatch(selectUidCinema([]))
    }, [])

    const sortedKKT = [...printers.kkt].sort((a, b) => {
        if (a.local !== b.local) return a.local ? -1 : 1
        return a.kkt.number.localeCompare(b.kkt.number, 'ru', {numeric: true})
    })

    const sortedKP = [...printers.kitchen_points].sort((a, b) => {
        if (a.local !== b.local) return a.local ? -1 : 1
        return a.kitchen_point.name.localeCompare(b.kitchen_point.name, 'ru')
    })

    return <Box style={{backgroundColor: '#f8f8f8'}}>
        <Box className='payment-total'>
            <Box className='payment-total-div'>
                <Box sx={{display: 'flex', alignItems: 'none', cursor: 'pointer'}}
                     onClick={() => props.set_printing(false)}><ArrowBackIosNewIcon/></Box>
            </Box>
        </Box>
        <Box
            className='printing'
            sx={{
                padding: '4px 0 0 4px',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                maxHeight: props.type === 'cinema' ? '130px' : null,
                overflowY: 'scroll'
            }}>
            {sortedKKT.map(printer => <Button
                variant={printer.local ? 'contained' : 'outlined'}
                color='secondary'
                key={printer.kkt.uid}
                className='payment-path'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '0 4px 4px 0',
                    maxWidth: '130px'
                }}
                onClick={() => {
                    if (props.type === 'horeca') {
                        dispatch(equipment_action(filial, ROUTE_EQUIPMENT_KKT_BILL_PRINT, {
                            uid: printer.kkt.uid, uid_order: props.order.uid
                        }))
                    } else {
                        dispatch(equipment_action(filial, ROUTE_EQUIPMENT_KKT_TICKETS_PRINT, {
                            uid: printer.kkt.uid, uid_order: props.order.uid, uid_positions: props.uid_selected
                        }))
                    }
                }}
            >
                <span>{printer.kkt.number}</span>
                <span style={{fontSize: '70%'}}>
            <div>ККТ ...{printer.kkt.number.slice(-4)}</div>
        </span>
            </Button>)}
            {sortedKP.map(printer => <Button
                variant={printer.local ? 'contained' : 'outlined'}
                color='secondary'
                key={printer.kitchen_point.uid}
                className='payment-path'
                sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 4px 4px 0'}}>
                <span>{printer.kitchen_point.name}</span>
                <span style={{fontSize: '70%'}}>
            <Box sx={{overflow: 'hidden'}}>Принтер {printer.kitchen_point.name}</Box>
        </span>
            </Button>)}
        </Box>
        {props.type === 'cinema' && <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {props.order.items.filter(el => (el.in_receipt_state > 0 && el.out_receipt_state === 0) || (el.in_slip_state > 0 && el.out_slip_state === 0)).map(booking =>
                <BookingItem key={booking.uid}
                             {...booking}
                             uid_order={props.order.uid}
                             uid_selected={props.uid_selected}
                             set_uid_selected={props.set_uid_selected}/>)}
            {props.order.items.filter(el => (el.in_receipt_state > 0 && el.out_receipt_state === 0) || (el.in_slip_state > 0 && el.out_slip_state === 0)).length === 0 ?
                <Box className='empty-box' sx={{fontSize: '300%'}}>Нет билетов для печати</Box> : null}
        </Box>}
    </Box>
}

export default Printing