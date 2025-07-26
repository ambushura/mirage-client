import {Box, Typography} from "@mui/material"

export default function PinpadForm(props) {
    return (
        <Box>
            <Typography variant="h6" color="textSecondary" margin={1}>
                Пинпад ID {props.props.label}
            </Typography>
        </Box>
    )
}