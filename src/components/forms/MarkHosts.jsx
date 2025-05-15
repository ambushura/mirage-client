import {Box, Button, Typography} from "@mui/material"
import {closeModal} from "../../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"

const MarkHosts = () => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)

    return (
        <Box component="form"
             noValidate
             autoComplete="off"
             onSubmit={(e) => {
                 e.preventDefault()

                 dispatch(closeModal())
             }}>
            <Typography variant="h6" color="textSecondary" margin={1}>
                Настройки системы &#34;Честный знак&#34;
            </Typography>
            <Box>

            </Box>
            <Box sx={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
                <Button variant='contained' color='secondary' type="submit" sx={{marginLeft: '4px'}}>Обновить список CDN-площадок</Button>
            </Box>
        </Box>
    )
}

export default MarkHosts