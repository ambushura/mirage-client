import {Box, CircularProgress} from "@mui/material"

const Loader = (props) => {
    return <Box sx={{
        display: 'flex',
        minWidth: '50px',
        minHeight: '50px',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <CircularProgress
            sx={{scale: props.size}}/>
    </Box>
}

export default Loader