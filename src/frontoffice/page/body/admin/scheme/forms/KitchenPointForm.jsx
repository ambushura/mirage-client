import {Box, Typography} from "@mui/material"

export function KitchenPointForm({props}) {
    return <Box>
        <Typography variant="h6" color="textSecondary" margin={1}>
            Чековый принтер <strong>{props.label}</strong>
        </Typography>
    </Box>
}