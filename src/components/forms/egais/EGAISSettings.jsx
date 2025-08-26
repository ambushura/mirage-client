import {Box, Button, Typography} from "@mui/material"

const EgaisSettings = () => {
    return (
        <Box component="form"
             noValidate
             autoComplete="off"
             onSubmit={(e) => {
                 e.preventDefault()
             }}>
            <Typography variant="h6" color="textSecondary" margin={1}>УТМ ЕГАИС</Typography>
            <Box>
            </Box>
            <Box sx={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
                <Button variant='contained' color='secondary' type="submit" sx={{marginLeft: '4px'}} onClick={() => {

                }}></Button>
            </Box>
        </Box>
    )
}

export default EgaisSettings