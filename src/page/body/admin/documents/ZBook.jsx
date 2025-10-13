import {Box, Button, InputAdornment, TextField, Typography} from "@mui/material"
import {closeModal} from "../../../../redux/interfaceReducer.js"
import {useDispatch} from "react-redux"
import {useState} from "react"
import KKTList from "./elements/KKTList.jsx"
import dayjs from "dayjs"
import {DatePicker} from "@mui/x-date-pickers"
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FunctionsIcon from '@mui/icons-material/Functions'

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
        id="modal-zbook"
        component="form"
        noValidate
        autoComplete="off"
        sx={{width: '920px'}}
        onSubmit={handleSubmit}>
        <Typography variant="h6" color="textSecondary" margin={1}>
            Кассовая книга
        </Typography>
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
                <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Box sx={{maxWidth: '300px', marginRight: '10px'}}>
                        <DatePicker
                            label='Дата смены'
                            variant='filled'
                            value={ofd ? dayjs(ofd) : null}
                            sx={{marginBottom: '10px', width: '100%'}}
                            onChange={(newVal) => onChange(newVal ? newVal.toISOString() : null)}
                        />
                        <DatePicker
                            label='Дата ОФД'
                            variant='filled'
                            value={ofd ? dayjs(ofd) : null}
                            sx={{marginBottom: '10px', width: '100%'}}
                            onChange={(newVal) => onChange(newVal ? newVal.toISOString() : null)}
                        />
                        <KKTList
                            variant='filled'
                            sx={{marginBottom: '10px'}}
                            uid_kkt={uid_kkt}
                            set_uid_kkt={set_uid_kkt}
                        />
                        <TextField
                            label='Организация'
                            variant='filled'
                            fullWidth
                            sx={{marginBottom: '10px'}}
                            slotProps={{input: {readOnly: true}}}
                        />
                        <TextField
                            label='ИНН'
                            variant='filled'
                            fullWidth
                            sx={{marginBottom: '10px'}}
                            slotProps={{input: {readOnly: true}}}
                        />
                        <TextField
                            label='ФД'
                            variant='filled'
                            fullWidth
                            sx={{marginBottom: '10px'}}
                            slotProps={{input: {readOnly: true}}}
                        />
                    </Box>
                    <Box sx={{maxWidth: '300px', marginRight: '10px'}}>
                        <TextField
                            label='Последний ФД'
                            variant='filled'
                            fullWidth
                            type='number'
                            sx={{marginBottom: '10px'}}
                            slotProps={{input: {min: 0, step: 0.01}}}
                        />
                        <TextField
                            label='Наличные'
                            variant='filled'
                            fullWidth
                            type='number'
                            sx={{marginBottom: '10px'}}
                            slotProps={{
                                input: {
                                    min: 0, step: 0.01, startAdornment: <InputAdornment position="start">
                                        <AddIcon/>
                                    </InputAdornment>,
                                }
                            }}

                        />
                        <TextField
                            label='Наличные'
                            variant='filled'
                            fullWidth
                            type='number'
                            sx={{marginBottom: '10px'}}
                            slotProps={{
                                input: {
                                    min: 0, step: 0.01, startAdornment: <InputAdornment position="start">
                                        <RemoveIcon/>
                                    </InputAdornment>,
                                }
                            }}
                        />
                        <TextField
                            label='Безналичные'
                            variant='filled'
                            fullWidth
                            type='number'
                            sx={{marginBottom: '10px'}}
                            slotProps={{
                                input: {
                                    min: 0, step: 0.01, startAdornment: <InputAdornment position="start">
                                        <AddIcon/>
                                    </InputAdornment>
                                }
                            }}
                        />
                        <TextField
                            label='Безналичные'
                            variant='filled'
                            fullWidth
                            type='number'
                            sx={{marginBottom: '10px'}}
                            slotProps={{
                                input: {
                                    min: 0, step: 0.01, startAdornment: <InputAdornment position="start">
                                        <RemoveIcon/>
                                    </InputAdornment>
                                }
                            }}
                        />
                        <TextField
                            label='НДС'
                            variant='filled'
                            fullWidth
                            type='number'
                            sx={{marginBottom: '10px'}}
                            slotProps={{input: {min: 0, step: 0.01}}}
                        />
                    </Box>
                </Box>
                <Box sx={{maxWidth: '610px', marginRight: '10px'}}>
                    <TextField
                        label='Комментарий'
                        variant='filled'
                        fullWidth
                        multiline
                        rows={4}
                    />
                </Box>
            </Box>
            <Box sx={{maxWidth: '300px'}}>
                <TextField
                    label='Номер смены'
                    variant='filled'
                    fullWidth
                    type='number'
                    sx={{marginBottom: '10px'}}
                    slotProps={{input: {min: 0, step: 0.01}}}
                />
                <TextField
                    label='Инкассация'
                    variant='filled'
                    fullWidth
                    type='number'
                    sx={{marginBottom: '10px'}}
                    slotProps={{input: {min: 0, step: 0.01}}}
                />
                <TextField
                    label='Наличные'
                    variant='filled'
                    fullWidth
                    type='number'
                    sx={{marginBottom: '10px'}}
                    slotProps={{
                        input: {
                            min: 0, step: 0.01, startAdornment: <InputAdornment position="start">
                                <FunctionsIcon/>
                            </InputAdornment>
                        }
                    }}
                />
                <TextField
                    label='Безналичные'
                    variant='filled'
                    fullWidth
                    type='number'
                    sx={{marginBottom: '10px'}}
                    slotProps={{
                        input: {
                            min: 0, step: 0.01, startAdornment: <InputAdornment position="start">
                                <FunctionsIcon/>
                            </InputAdornment>
                        }
                    }}
                />
                <TextField
                    label='Выручка'
                    variant='filled'
                    fullWidth
                    type='number'
                    sx={{marginBottom: '10px'}}
                    slotProps={{input: {min: 0, step: 0.01}}}
                />
                <TextField
                    label='Сменный итог'
                    variant='filled'
                    fullWidth
                    type='number'
                    sx={{marginBottom: '10px'}}
                    slotProps={{
                        input: {
                            min: 0, step: 0.01, startAdornment: <InputAdornment position="start">
                                <AddIcon/>
                            </InputAdornment>
                        }
                    }}
                />
                <TextField
                    label='Необнуляемая сумма'
                    variant='filled'
                    fullWidth
                    type='number'
                    sx={{marginBottom: '10px'}}
                    slotProps={{
                        input: {
                            min: 0, step: 0.01, startAdornment: <InputAdornment position="start">
                                <AddIcon/>
                            </InputAdornment>
                        }
                    }}
                />
                <TextField
                    label='Необнуляемая сумма'
                    variant='filled'
                    fullWidth
                    type='number'
                    sx={{marginBottom: '10px'}}
                    slotProps={{
                        input: {
                            min: 0, step: 0.01, startAdornment: <InputAdornment position="start">
                                <RemoveIcon/>
                            </InputAdornment>
                        }
                    }}
                />
            </Box>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Button fullWidth variant='contained' color='error' sx={{marginRight: 1}}>Удалить</Button>
            <Button fullWidth variant='contained' color='success'>Сохранить</Button>
        </Box>
    </Box>
}

export default ZBook