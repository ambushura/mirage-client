import {Box, Typography} from "@mui/material"

export function FilialForm({props}) {

    return <Box>
        <Typography variant="h6" color="textSecondary" margin={1}>
            Филиал <strong>{props.label}</strong>
        </Typography>
    </Box>
}