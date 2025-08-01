import {Box, Typography} from "@mui/material"
import {useState} from "react"

export function FilialForm({props}) {

    const [page, set_page] = useState(0)

    return <Box>
        <Typography variant="h6" color="textSecondary" margin={1}>
            Филиал <strong>{props.label}</strong>
        </Typography>
    </Box>
}