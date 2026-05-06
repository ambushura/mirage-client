import {Box, Typography} from '@mui/material'

const EgaisSettings = () => {
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
                e.preventDefault()
            }}
        >
            <Typography variant="h6" color="textSecondary" margin={1}>
                УТМ ЕГАИС
            </Typography>
            <Box></Box>
            <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>В разработке...</Box>
    </Box>
    )
}

export default EgaisSettings
