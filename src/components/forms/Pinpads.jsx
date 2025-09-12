import {Box, Button, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import {common_payment_methods_get} from "../../service/fetch_service.js"
import {useDispatch, useSelector} from "react-redux"
import EditDocumentIcon from "@mui/icons-material/EditDocument"
import PaymentIcon from "@mui/icons-material/Payment"
import {closeModal, openModal} from "../../redux/interfaceReducer.js"
import Loader from "../../ui/Loader.jsx"

const Pinpads = ({props}) => {

    const dispatch = useDispatch()
    const filial = useSelector(state => state.data.filial)
    const [payment_methods, set_payment_methods] = useState({loading: false, error: null, data: null})

    useEffect(() => {
        const fetch = async () => {
            let fetching_result = await dispatch(common_payment_methods_get(filial, props.order.uid, props.type, true))
            if (!fetching_result.loading && fetching_result.error === null && fetching_result.data !== null) {
                set_payment_methods(fetching_result)
            }
        }
        if (filial !== undefined && props.order.uid !== undefined && props.type !== undefined) {
            fetch()
        }
    }, [dispatch, filial, props.order.uid, props.type])

    if (payment_methods.error !== null) {
        return <Box className='empty-box'>Ошибка загрузки маршрутов оплаты {payment_methods.error}</Box>
    } else if (payment_methods.loading) {
        return <Loader/>
    } else if (payment_methods.data !== null) {
        if (payment_methods.data.list.length === 0) {
            return <Box className='empty-box' sx={{fontSize: '100%', maxWidth: '300px'}}>Не найдено беспроводных
                способов оплаты для этого рабочего места, обратитесь в казначейство. </Box>
        } else {
            return <Box>
                <Typography variant="h6" color="textSecondary" margin={1}>
                    Беспроводные способы оплаты
                </Typography>
                <Box sx={{display: "flex", flexWrap: 'wrap', flexDirection: "row", justifyContent: "space-between"}}>
                    {payment_methods.data.list.map(pm => {
                        return <Button
                            startIcon={pm.uid === 'Заявление' ? <EditDocumentIcon/> : pm.uid === 'Б/Т' ?
                                <PaymentIcon/> : null}
                            variant={pm.uid === 'Заявление' || pm.uid === 'Б/Т' ? 'contained' : 'outlined'}
                            color={pm.uid === 'Заявление' ? 'primary' : 'secondary'}
                            key={`${pm.uid}${pm.uid_kkt}${pm.uid_pinpad}`}
                            className='payment-path'
                            sx={{
                                display: 'flex',
                                flexDirection: pm.uid === 'Заявление' || pm.uid === 'Б/Т' ? 'row' : 'column',
                                alignItems: 'center',
                                m: 1,
                            }}
                            onClick={() => {
                                if (pm.uid === 'Заявление') {

                                } else if (pm.uid === 'Б/Т') {
                                    dispatch(openModal({
                                        type: 'pinpads', props: {type: props.type, order: props.order}
                                    }))
                                } else {
                                    props.pay(pm)
                                    dispatch(closeModal())
                                }
                            }}>
                            <span>{pm.name}</span>
                            {pm.uid !== 'Заявление' && pm.uid !== 'Б/Т' ? <span
                                style={{fontSize: '70%'}}><div>ККТ ...{pm.kkt.number.slice(-4)}</div>
                                {pm.pinpad !== null ? <div>Пинпад ...{pm.pinpad.number.slice(-4)}</div> : null}
                                </span> : null}
                        </Button>
                    })}
                </Box>
            </Box>
        }
    }
}

export default Pinpads