import {Box, Typography} from "@mui/material"

export function WorkplaceForm({props}) {
    return <Box>
        <Typography variant="h6" color="textSecondary" margin={1}>
            Рабочее место <strong>{props.label}</strong>
        </Typography>
    </Box>
}