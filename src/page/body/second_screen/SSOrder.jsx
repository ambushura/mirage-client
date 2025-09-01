import {Box} from "@mui/material"
import {useSelector} from "react-redux"
import {useEffect, useState} from "react"
import dayjs from "dayjs";

const SsOrder = () => {

    const pre_order = useSelector(state => state.second_screen.pre_order)
    const horder = useSelector(state => state.second_screen.horder)

    const [total_sum, set_total_sum] = useState(0)

    useEffect(() => {
        let sum = 0
        if (pre_order) {
            sum += pre_order.sum
        }
        if (horder) {
            sum += horder.sum
        }
        set_total_sum(sum)
    }, [pre_order, horder])

    return (
        <Box sx={{
            width: 'calc(100% - 100px)',
            height: 'calc(100% - 100px)',
            margin: '50px',
            padding: '30px',
            borderRadius: '40px',
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            color: 'white',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
        }}><Box sx={{fontSize: 'clamp(14px, 3vw, 34px)', fontWeight: 'bold', width: '100%', textAlign: 'center'}}>Ваш
            заказ</Box>
            <Box className='divider'/>
            {pre_order !== null ?
                <Box>
                    <Box sx={{fontSize: 'clamp(14px, 2vw, 28px)'}}>Сеанс</Box>
                    <Box>Фильм {pre_order.film_name} · {pre_order.film_copy_type} · {pre_order.film_rate_age}+ </Box>
                    <Box
                        style={{fontWeight: 'bold'}}>{String(dayjs.utc(pre_order.seance_beginning).format("D MMMM"))} {String(dayjs.utc(pre_order.seance_beginning).$H).padStart(2, '0')}:{String(dayjs.utc(pre_order.seance_beginning).$m).padStart(2, '0')}<span></span></Box>
                    <Box className='divider'/>
                    <Box sx={{fontSize: 'clamp(14px, 2vw, 28px)'}}>Билеты</Box>
                    <Box>
                        {pre_order && (pre_order.items.map(item => {
                                return <Box key={item.uid}
                                            sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Box>Ряд {item.place_row} место {item.place_number}</Box>
                                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Box sx={{width: '40px', marginRight: '20px', textAlign: 'right'}}>1</Box>
                                        <Box
                                            sx={{width: '40px', marginRight: '10px', textAlign: 'right'}}>{item.sum} р</Box>
                                    </Box>
                                </Box>
                            }
                        ))}
                    </Box>
                    <Box className='divider'/>
                </Box>
                : null}
            {horder !== null ?
                <Box>
                    <Box sx={{fontSize: 'clamp(14px, 2vw, 28px)'}}>Еда, напитки</Box>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        {horder && (horder.items_grouped.map(item => {
                                return <Box key={item.uid}
                                            sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Box sx={{flex: 1, width: 'calc(100% - 120px)'}}>{item.name}</Box>
                                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Box sx={{
                                            width: '40px',
                                            marginRight: '20px',
                                            textAlign: 'right'
                                        }}>{item.quantity}</Box>
                                        <Box
                                            sx={{width: '50px', marginRight: '10px', textAlign: 'right'}}>{item.sum} р</Box>
                                    </Box>
                                </Box>
                            }
                        ))}
                    </Box>
                    <Box className='divider'/>
                </Box>
                : null}
            <Box sx={{
                bottom: '20px',
                fontSize: 'clamp(14px, 3vw, 34px)',
                fontWeight: 'bold',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Box>ИТОГО</Box>
                <Box>{total_sum} р</Box>
            </Box>
        </Box>
    )
}

export default SsOrder