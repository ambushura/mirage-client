import {Box} from "@mui/material"

const Folder = (props) => {
    return (
        <Box className={props.type} onClick={() => props.set_uid_folder(props.item.uid)}>
            <Box>{props.item.name}</Box>
        </Box>
    )
}
export default Folder