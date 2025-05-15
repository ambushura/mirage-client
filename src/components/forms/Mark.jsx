import {Box, Typography} from "@mui/material"

const Mark = (props) => {



    return (
        <Box component="form"
             noValidate
             autoComplete="off">
            <Typography variant="h6" color="textSecondary" margin={1}>
                Честный знак
            </Typography>
        </Box>
    )
}

export default Mark