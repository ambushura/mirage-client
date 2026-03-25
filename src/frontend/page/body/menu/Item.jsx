import {Box} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {horeca_position_add} from "../../../../service/fetch_service.js"

const Item = (props) => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const horder = useSelector(state => state.orders.horder)

    return <Box className="menu-item"
                onClick={() => dispatch(horeca_position_add(filial, horder.uid, horder.ver, props.item.uid))}>
        <Box>{props.item.name}</Box>
        <Box style={{display: 'flex', justifyContent: 'end', alignItems: 'flex-end'}}>
                <span style={{
                    backgroundColor: '#c9c9c9', padding: '5px', borderRadius: '10px', color: 'black'
                }}>{props.item.price} р</span>
        </Box>
    </Box>
}

export default Item