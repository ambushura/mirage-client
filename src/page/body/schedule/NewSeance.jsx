import {Button} from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const NewSeance = ({beginning, ending}) => {

    if ((beginning == null || ending == null || (ending.diff(beginning, 'minute', true) > 1))) {
        return (
            <Button
                startIcon={<AddCircleOutlineIcon/>}
                variant="contained"
                sx={{
                    backgroundColor: 'var(--bgr-seance-card)',
                    color: 'black'
                }}>{beginning !== null ? beginning.format('HH:mm') : '07:00'}-{ending !== null ? ending.format('HH:mm') : '07:00'}</Button>

        )
    }
}

export default NewSeance