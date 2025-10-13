import {Box, Button, InputAdornment, TextField, Typography} from "@mui/material"
import {closeModal} from "../../../../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import dayjs from "dayjs"
import {DatePicker} from "@mui/x-date-pickers"
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FunctionsIcon from '@mui/icons-material/Functions'
import {common_documents_zbook_get} from "../../../../service/fetch_service.js"
import LazySelect from "../../../../ui/LazySelect.jsx"

const ZBook = ({props}) => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const [z_book, set_z_book] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(closeModal())
    }

    const [form, setForm] = useState({
        uid_kkt: '', uid_employee: '',
    })

    useEffect(() => {
        if (!props.uid) return
        const fetch = async () => {
            try {
                const data = await dispatch(common_documents_zbook_get(filial, props.uid))
                set_z_book(data.data)
            } catch (err) {
                console.error('Ошибка загрузки ZBook:', err)
            }
        }
        fetch()
    }, [filial, props.uid, dispatch])

    if (z_book !== null) {
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
                                value={z_book.date_shift ? dayjs(z_book.date_shift) : null}
                                sx={{marginBottom: '10px', width: '100%'}}
                                onChange={(newVal) => onChange(newVal ? newVal.toISOString() : null)}
                            />
                            <DatePicker
                                label='Дата ОФД'
                                variant='filled'
                                value={z_book.date_ofd ? dayjs(z_book.date_ofd) : null}
                                sx={{marginBottom: '10px', width: '100%'}}
                                onChange={(newVal) => onChange(newVal ? newVal.toISOString() : null)}
                            />
                            <LazySelect
                                variant='filled'
                                sx={{marginBottom: '10px'}}
                                label="Касса"
                                value={z_book.uid_kkt}
                                type="kkt"
                                filial={filial}
                                onChange={(uid, extra) => set_z_book(prev => ({...prev, uid_kkt: uid}))}
                                getLabel={item => `ЗН ${item.title}`}
                                extraFields={['uid_organization', 'name_organization', 'inn_organization']}
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
}

export default ZBook