import {Box, Typography} from "@mui/material"

export function BilletCheckForm({props}) {
    return <Box>
        <Typography variant="h6" color="textSecondary" margin={1}>
            Билетный контролер <strong>{props.label}</strong>
        </Typography>
    </Box>
}