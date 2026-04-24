import {Button} from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import {openModal} from "../../../../redux/interfaceReducer.js"
import {useDispatch} from "react-redux"
import {duration_title} from "../../../../ui/hooks/common_functions.js"

const NewSeance = ({beginning, ending, uid_hall, name_hall}) => {

    const dispatch = useDispatch()

    if ((beginning == null || ending == null || (ending.diff(beginning, 'minute', true) > 1))) {
        return <Button
            startIcon={<AddCircleOutlineIcon/>}
            variant="contained"
            sx={{
                backgroundColor: '#bdbdbd', color: 'black', fontSize: '12px',
            }}
            onClick={() => {
                dispatch(openModal({
                    type: 'seance_settings', props: {
                        uid: 'new', beginning: beginning, ending: ending, uid_hall: uid_hall, name_hall: name_hall,
                    }
                }))
            }}>{beginning !== null ? beginning.format('HH:mm') : '...'}-{ending !== null ? ending.format('HH:mm') : '...'}
            <span
                style={{fontWeight: '400', paddingLeft: '4px'}}>{duration_title(beginning, ending)}</span></Button>
    }
}

export default NewSeance