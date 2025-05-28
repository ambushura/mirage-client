import {Box, Pagination} from "@mui/material"
import {useSetOrdersHoreca} from "../../../../hooks/pages/useSetOrdersHoreca.js"
import {useDispatch, useSelector} from "react-redux"
import OrderHoreca from "./OrderHoreca.jsx"
import {setOrdersHorecaPage} from "../../../../redux/ordersReducer.js"
import {useEffect} from "react"

const OrdersHoreca = () => {

    const dispatch = useDispatch()

    useSetOrdersHoreca()

    const orders = useSelector(state => state.orders.orders_horeca || [])
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const page = useSelector(state => state.orders.orders_horeca_page)

    useEffect(() => {
        return () => dispatch(setOrdersHorecaPage(1))
    }, [dispatch, param_date_admin])

    return (
        <Box className='admin-orders-horeca'>
            <Box className='admin-orders-horeca-orders'>
                <Box className='admin-orders-horeca-orders-content'>
                    {orders.length > 0 ? orders.map(filial_data => {
                            const pages = filial_data.data !== null ? Math.ceil(filial_data.data.total_count / 20) : 0
                            return (
                                <>{filial_data.data !== null ?
                                    <Box className='admin-orders-horeca-filial-content' key={filial_data.filial.uid}>
                                        <Box className='admin-orders-horeca-filial-box'>
                                            <Box
                                                className='admin-orders-horeca-filial-orders'>{filial_data.data.orders.map(order => {
                                                return (
                                                    <OrderHoreca key={`${order.uid}${order.ver}`} order={order}/>
                                                )
                                            })}
                                            </Box>
                                            {pages > 1 ? <Pagination sx={{
                                                    position: 'sticky',
                                                    left: 0,
                                                    height: '60px',
                                                    backgroundColor: 'var(--bgr-color)',
                                                    padding: '10px 0',
                                                    width: '100%',
                                                }}
                                                                     page={page}
                                                                     onChange={(event, value) => dispatch(setOrdersHorecaPage(value))}
                                                                     size={'large'}
                                                                     count={pages}
                                                                     showFirstButton showLastButton/>
                                                : null}
                                        </Box>
                                    </Box> : null}
                                </>
                            )
                        })
                        : null}
                </Box>
            </Box>
        </Box>
    )
}

export default OrdersHoreca