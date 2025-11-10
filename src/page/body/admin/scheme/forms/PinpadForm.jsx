import {Box, FormGroup, TextField, Typography} from "@mui/material"
import {useForm} from "react-hook-form"
import {useEffect, useState} from "react"
import {common_catalog_get} from "../../../../../service/fetch_service.js"
import {useDispatch, useSelector} from "react-redux"
import {v4} from "uuid"
import ControlledLazySelect from "../../../../../ui/ControlledLazySelect.jsx"
import ControlledTextField from "../../../../../ui/ControlledTextField.jsx"

export default function PinpadForm({props}) {

    const dispatch = useDispatch()

    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const filial = useSelector(state => state.data.filial)

    const [loading, set_loading] = useState(true)

    const {handleSubmit, setValue, control, reset, watch} = useForm({
        defaultValues: {
            ver: props.uid === 'new' ? v4() : '',
            uid: props.uid === 'new' ? v4() : '',
            deleted: false,
            date_create: '',
            date_change: '',
            uid_organization: '',
            number: '',
            port: '',
            mac: '',
            location: '',
            ip: '',
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            set_loading(true)
            try {
                if (props.uid === 'new') {
                    reset()
                } else {
                    const data = await dispatch(common_catalog_get(filial, 'pinpad', props.uid, param_date_admin))
                    if (data?.data) {
                        reset({
                            ...data.data,
                        })
                    }
                }
            } catch (err) {
                console.error('Ошибка загрузки карточки пинпада:', err)
            } finally {
                set_loading(false)
            }
        }
        fetchData()
    }, [props.uid, filial, dispatch, reset])

    const number = watch('number')

    return <Box>
        <Typography variant="h6" color="textSecondary" margin={1}>
            Пинпад {number}
        </Typography>
        <FormGroup sx={{display: 'flex', flexDirection: 'column', width: 'inherit'}}>
            <TextField variant='filled' label='ID' value={props.label}
                       sx={{marginBottom: 1}}/>
            <ControlledLazySelect
                control={control}
                name="uid_organization"
                label="Организация"
                type="organizations"
                filial={filial}
                rules={{required: 'Укажите организацию пинпада'}}
                extraFields={['title']}
                onChange={(uid, extra) => setValue('name_organization', extra.title || '')}
            />
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <ControlledTextField
                    control={control}
                    name="ip"
                    label="IP-адрес"
                    sx={{width: '100%', marginRight: '4px'}}
                />
                <ControlledTextField
                    control={control}
                    name="port"
                    label="PORT"
                    sx={{width: '100%'}}
                />
            </Box>
            <ControlledTextField
                control={control}
                name="mac"
                label="MAC-адрес"
                sx={{width: '100%'}}
            />
        </FormGroup>
    </Box>
}