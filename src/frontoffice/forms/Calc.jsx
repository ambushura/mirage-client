import { Box, Button, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setCash, setTotal } from '../../redux/frontoffice/ordersReducer.js'
import { useEffect, useState } from 'react'
import { closeModal } from '../../redux/frontoffice/interfaceReducer.js'

const Calc = () => {
    const dispatch = useDispatch()

    const pre_order = useSelector((state) => state.orders.pre_order)
    const horder = useSelector((state) => state.orders.horder)
    const cash = useSelector((state) => state.orders.cash)
    const [total, set_total] = useState(0)

    useEffect(() => {
        let total_new = 0
        pre_order.items
            .filter((item) => !item.in_payment_completed && !item.out_payment_completed)
            .forEach((item) => {
                total_new += item.sum
            })
        horder.items
            .filter((item) => !item.in_payment_completed && !item.out_payment_completed && !item.canceled)
            .forEach((item) => {
                total_new += item.price.sum
            })
        set_total(total_new)
        dispatch(setTotal(total_new))
        dispatch(setCash(['clean', total_new]))
    }, [dispatch, pre_order.ver, horder.ver])

    return (
        <Box sx={{ width: 220, mx: 'auto', textAlign: 'center', color: 'white', overflow: 'hidden' }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'black' }}>{`${cash + ' Р' || '0'}`}</Typography>
            <Stack spacing={1}>
                {[
                    [7, 8, 9],
                    [4, 5, 6],
                    [1, 2, 3],
                    [0, '00', '000'],
                ].map((row, index) => (
                    <Stack key={index} direction="row" justifyContent="center">
                        {row.map((value) => (
                            <Button
                                key={value}
                                variant="contained"
                                color="secondary"
                                sx={{
                                    marginRight: value !== 9 && value !== 6 && value !== 3 && value !== '000' ? '8px' : 0,
                                    flex: 1,
                                    fontSize: value !== '000' && value !== '00' ? '150%' : '100%',
                                }}
                                onClick={() => {
                                    dispatch(setCash([value.toString(), total]))
                                }}
                            >
                                {value}
                            </Button>
                        ))}
                    </Stack>
                ))}
                <Stack direction="row" justifyContent="center">
                    <Button
                        fullWidth
                        sx={{ flex: 1, marginRight: '8px' }}
                        variant="contained"
                        color="secondary"
                        onClick={() => dispatch(closeModal())}
                    >
                        Получил
                    </Button>
                    <Button
                        fullWidth
                        sx={{ flex: 1 }}
                        variant="contained"
                        color="error"
                        onClick={() => dispatch(setCash(['clean', total]))}
                    >
                        Очистить
                    </Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Calc
