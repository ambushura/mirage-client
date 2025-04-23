import {Box, Tab, Tabs} from "@mui/material"
import {useEffect, useState} from "react"
import PropTypes from "prop-types"
import Orders from "./orders/Orders.jsx"
import {useDispatch, useSelector} from "react-redux"
import {useSetContentHeight} from "../../../hooks/interface/useSetContentHeight.js"
import {NEW_EMPTY_ORDER, setCurrentPreOrder} from "../../../redux/ordersReducer.js"

const PageAdmin = () => {

    const dispatch = useDispatch()

    const current_page = useSelector(state => state.interface.current_page)
    const [value, setValue] = useState(0)
    const [content_height, show_pre_order] = useSetContentHeight()

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    function CustomTabPanel(props) {
        const {children, value, index, ...other} = props
        return (
            <Box
                sx={{overflow: 'hidden', display: 'flex', flexDirection: 'row', padding: '2px 0 0 0'}}
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <>{children}</>}
            </Box>
        )
    }

    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    }

    function allProps(index) {
        return {id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`}
    }

    useEffect(() => {
        dispatch(setCurrentPreOrder(NEW_EMPTY_ORDER()))
    }, [dispatch])

    return (
        <Box sx={{height: content_height, display: 'flex', flexDirection: 'column'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs variant="scrollable" value={value} onChange={handleChange}>
                    <Tab sx={{color: 'var(--text-color)'}} label="Заказы" {...allProps(0)}/>
                    <Tab sx={{color: 'var(--text-color)'}} label="Итоги" {...allProps(1)}/>
                    <Tab sx={{color: 'var(--text-color)'}} label="Залы" {...allProps(2)}/>
                    <Tab sx={{color: 'var(--text-color)'}} label="Рабочие места" {...allProps(3)}/>
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {current_page === 'admin/cinema' || current_page === 'admin/horeca' ?
                    <Orders/> : null}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Итоги
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Залы
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                Оборудование
            </CustomTabPanel>
        </Box>
    )
}

export default PageAdmin