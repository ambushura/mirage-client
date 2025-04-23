import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {horeca_add} from "../../../service/fetch_service.js"

const Item = (props) => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const horder = useSelector(state => state.orders.horder)
    const wp = useSelector(state => state.interface.search_params.wp)

    return (
        <Box className="menu-item" onClick={() => dispatch(horeca_add(filial, wp, horder.uid, horder.ver, props.item.uid))}>
            <Box style={{height: '25px'}}>{props.item.name}</Box>
            <Box style={{height: '25px', display: 'flex', justifyContent: 'end', alignItems: 'flex-end'}}>
                <span style={{
                    backgroundColor: '#c9c9c9',
                    padding: '5px',
                    borderRadius: '10px',
                    color: 'black'
                }}>{props.item.price} р</span>
            </Box>
        </Box>
    )
}

export default Item