import {Box} from "@mui/material"
const Item = (props) => {
    return (
        <Box className="menu-item" onClick={() => {}}>
            <Box>{props.item.name}</Box>
        </Box>
    )
}
export default Item