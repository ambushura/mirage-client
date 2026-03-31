import React, {useEffect} from 'react'
import {Box, Button, ButtonGroup} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {center_menu_icons} from "../ui/ThemeContext.jsx"
import {setFilials} from "../redux/center/centerReducer.js"
import {
    center_horeca_goods_tree_get,
    center_horeca_orders_get,
    center_horeca_production_state_get,
    center_horeca_shift_state_get,
    center_horeca_store_state_get
} from "../service/fetch_service.js"
import {logout} from "../redux/authReducer.js"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import {setTree} from "../redux/center/centerHorecaReducer.js"

const CenterHeaderTop = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const param_date = useSelector(state => state.interface.params.param_date)

    const cities = useSelector(state => state.data.cities)
    const {root_filial, filial, main_menu, current_page, date_shift} = useSelector(state => state.center)
    const {orders_horeca_page, orders_horeca_page_size} = useSelector(state => state.center)

    // Филиалы
    useEffect(() => {
        const filials_list = []
        if (cities !== undefined) {
            cities.forEach((city) => {
                city.filials.forEach((filial) => {
                    filials_list.push({uid: filial.uid, title: filial.name})
                })
            })
            dispatch(setFilials(filials_list))
        }
    }, [cities])

    // Папки
    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(center_horeca_goods_tree_get(root_filial, 0))
            if (!fetching_result.loading && fetching_result.data !== null && fetching_result.error === null) {
                const data = fetching_result.data
                dispatch(setTree(data))
            }
        }
        fetch()
    }, [dispatch])

    // Заказы
    useEffect(() => {
        if (!filial) return
        dispatch(center_horeca_orders_get(filial, date_shift, 0, orders_horeca_page, orders_horeca_page_size))
    }, [dispatch, filial, date_shift, orders_horeca_page, orders_horeca_page_size])

    // Наличие на складах
    useEffect(() => {
        if (!filial) return
        dispatch(center_horeca_store_state_get(filial, date_shift, 0))
    }, [dispatch, filial, date_shift])

    // Производство
    useEffect(() => {
        if (!filial) return
        dispatch(center_horeca_production_state_get(filial, date_shift, 0))
    }, [dispatch, filial, date_shift])

    // Производство
    useEffect(() => {
        if (!filial) return
        dispatch(center_horeca_shift_state_get(filial, date_shift, 0))
    }, [dispatch, filial, date_shift])

    return <Box id='center-header'>
        <ButtonGroup sx={{height: '40px', boxShadow: 'none'}}>
            {main_menu.find(el => el.id === current_page[0])?.submenu.map(item => {
                return <Button
                    sx={{
                        height: '40px',
                        fontWeight: 400,
                        borderRadius: '0px',
                        boxShadow: 'none',
                        padding: '0 15px 0 15px'
                    }}
                    onClick={() => {
                        navigate(`center/${current_page[0]}/${item.id}`)
                    }}
                    color='secondary'
                    variant={current_page[1] === item.id ? "contained" : "text"}
                    key={item.id}
                    startIcon={center_menu_icons[item.icon]}>{item.title}</Button>
            })}
        </ButtonGroup>
        <Button
            variant='text' color='secondary'
            sx={{maxWidth: '40px', minWidth: '40px', maxHeight: '40px', borderRadius: 0}}
            onClick={() => {
                navigate(cities.length ? `/films/${cities[0].code}/all/${param_date}/` : "/")
                dispatch(logout())
            }}><ExitToAppIcon/></Button>
    </Box>
}

export default CenterHeaderTop