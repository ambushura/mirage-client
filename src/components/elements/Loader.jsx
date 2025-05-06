import {Box, CircularProgress} from "@mui/material"

const Loader = () => {
    return (
        <Box sx={{
            display: 'flex',
            minWidth: '100px',
            minHeight: '100px',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <CircularProgress
                sx={{scale: '2'}}/>
        </Box>
    )
}

export default Loader