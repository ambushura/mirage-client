import {Box} from "@mui/material"

const NotFound = () => {
    return (
        <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '200%'}}>
            Упс... Такой страницы не найдено.
        </Box>
    )
}
export default NotFound