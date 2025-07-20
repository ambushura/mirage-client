import {Button} from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import {openModal} from "../../../redux/interfaceReducer.js"
import {useDispatch} from "react-redux"

const NewSeance = ({beginning, ending, uid_hall, name_hall}) => {

    const dispatch = useDispatch()

    if ((beginning == null || ending == null || (ending.diff(beginning, 'minute', true) > 1))) {
        return (
            <Button
                startIcon={<AddCircleOutlineIcon/>}
                variant="contained"
                sx={{
                    backgroundColor: '#1EC7D3',
                    color: 'black'
                }}
                onClick={() => {
                    dispatch(openModal({
                        type: 'seance_settings', props: {
                            action: 'new_seance',
                            beginning: beginning,
                            ending: ending,
                            uid_hall: uid_hall,
                            name_hall: name_hall,
                        }
                    }))
                }}>{beginning !== null ? beginning.format('HH:mm') : '07:00'}-{ending !== null ? ending.format('HH:mm') : '07:00'}</Button>

        )
    }
}

export default NewSeance