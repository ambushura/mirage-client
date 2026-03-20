import React, {useEffect} from 'react'
import {Box, Button, ButtonGroup} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate, useParams, useSearchParams} from "react-router-dom"
import {center_menu_icons} from "../ui/ThemeContext.jsx"
import {setFilials, setParams, setSearchParams, setTree} from "../redux/centerReducer.js"
import {
    center_horeca_goods_tree_get,
    center_horeca_orders_get,
    center_horeca_store_state_get
} from "../service/fetch_service.js"

const CenterHeader = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {root_filial, filial, main_menu, current_page, date_shift} = useSelector(state => state.center)
    const cities = useSelector(state => state.data.cities)

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
        dispatch(center_horeca_orders_get(filial, date_shift, 0))
    }, [dispatch, filial, date_shift])

    // Итоги смены (распределение + остатки)
    useEffect(() => {
        if (!filial) return
        dispatch(center_horeca_store_state_get(filial, date_shift, 0))
    }, [dispatch, filial, date_shift])

    return <Box id='center-header'>
        <CMenu>
            {main_menu.find(el => el.id === current_page[0])?.submenu.map(item => {
                return <CButtonMenu
                    onClick={() => {
                        navigate(`center/${current_page[0]}/${item.id}`)
                    }}
                    color='secondary'
                    variant={current_page[1] === item.id ? "contained" : "text"}
                    key={item.id}
                    startIcon={center_menu_icons[item.icon]}>{item.title}</CButtonMenu>
            })}
        </CMenu>
    </Box>
}

export default CenterHeader

export function CButtonMenu(props) {
    return <Button
        {...props}
        sx={{
            height: '55px', borderRadius: '0px', boxShadow: 'none', padding: '0 15px 0 15px', ...props.sx,
        }}
    />
}

export function CMenu(props) {
    return <ButtonGroup
        {...props}
        sx={{height: '55px', boxShadow: 'none', ...props.sx,}}
    />
}

export function useSetCenterParams() {

    const params = useParams()
    const [search_params] = useSearchParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setParams(params))
    }, [dispatch, params])

    useEffect(() => {
        const obj = Object.fromEntries(search_params.entries())
        dispatch(setSearchParams(obj))
    }, [dispatch, search_params])

}