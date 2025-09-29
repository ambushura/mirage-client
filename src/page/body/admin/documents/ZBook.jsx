import {Box, Button, Typography} from "@mui/material"
import {closeModal} from "../../../../redux/interfaceReducer.js"
import {useDispatch} from "react-redux"
import {useState} from "react"
import OrganizationsList from "./elements/OrganizationsList.jsx"
import KKTList from "./elements/KKTList.jsx"
import {DateTimeField, NumberField} from "./elements/Fields.jsx"

const ZBook = ({props}) => {

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(closeModal())
    }

    const [uid_kkt, set_uid_kkt] = useState('')
    const [uid_organization, set_uid_organization] = useState('')
    const [ofd, set_ofd] = useState('')

    return <Box
        id="modal-quantity"
        component="form"
        noValidate
        autoComplete="off"
        sx={{p: 1, width: 300}}
        onSubmit={handleSubmit}>
        <Typography variant="h6" color="textSecondary" margin={1}>
            Кассовая книга
        </Typography>
        <Box>
            <OrganizationsList variant='filled' sx={{m: 1}} uid_organization={uid_organization}
                               set_uid_organization={set_uid_organization}/>
            <KKTList variant='filled' sx={{m: 1}} uid_kkt={uid_kkt} set_uid_kkt={set_uid_kkt}/>
            <DateTimeField variant='filled' sx={{m: 1, width: '100%'}} label='Дата/время ОФД' value={ofd}
                           onChange={''}/>
            <NumberField label='ФД' sx={{m: 1}}/>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Button fullWidth variant='contained' color='secondary'>Сохранить</Button>
            <Button fullWidth variant='contained' color='error' sx={{marginLeft: 1}}>Удалить</Button>
        </Box>
    </Box>
}

export default ZBook