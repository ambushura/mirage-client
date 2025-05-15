import {Box, Button, Typography} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {markirovka_cdn_info} from "../../service/fetch_service.js"

const MarkHosts = () => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const wp = useSelector(state => state.interface.wp)
    const hosts = useSelector(state => state.markirovka.hosts || [])

    return (
        <Box component="form"
             noValidate
             autoComplete="off"
             onSubmit={(e) => {
                 e.preventDefault()
             }}>
            <Typography variant="h6" color="textSecondary" margin={1}>
                Настройки системы &#34;Честный знак&#34;
            </Typography>
            <Box>
                {hosts.map(host => {
                    return <Box key={`${host.host}${host.avgTimeMs}`}>{host.host} {host.avgTimeMs}</Box>
                })}
            </Box>
            <Box sx={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
                <Button variant='contained' color='secondary' type="submit" sx={{marginLeft: '4px'}} onClick={() => {
                    dispatch(markirovka_cdn_info(filial, wp))
                }}>Обновить список CDN-площадок</Button>
            </Box>
        </Box>
    )
}

export default MarkHosts