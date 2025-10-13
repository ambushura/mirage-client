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
                КАССОВАЯ КНИГА
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
                                onChange={(newVal) => set_z_book(prev => ({
                                    ...prev, date_shift: newVal ? newVal.toISOString() : null
                                }))}
                            />
                            <DatePicker
                                label='Дата ОФД'
                                variant='filled'
                                value={z_book.date_ofd ? dayjs(z_book.date_ofd) : null}
                                sx={{marginBottom: '10px', width: '100%'}}
                                onChange={(newVal) => set_z_book(prev => ({
                                    ...prev, date_ofd: newVal ? newVal.toISOString() : null
                                }))}
                            />
                            <LazySelect
                                variant='filled'
                                sx={{marginBottom: '10px'}}
                                label="Касса"
                                value={z_book.uid_kkt}
                                type="kkt"
                                filial={filial}
                                onChange={(uid, extra) => set_z_book(prev => ({
                                    ...prev, uid_kkt: uid, name_organization: extra.name_organization, inn: extra.inn
                                }))}
                                getLabel={item => `ЗН ${item.title}`}
                                extraFields={['uid_organization', 'name_organization', 'inn']}
                            />
                            <TextField
                                label='Организация'
                                value={z_book.name_organization || ''}
                                variant='filled'
                                fullWidth
                                sx={{marginBottom: '10px'}}
                                slotProps={{input: {readOnly: true}}}
                            />
                            <TextField
                                label='ИНН'
                                value={z_book.inn || ''}
                                variant='filled'
                                fullWidth
                                sx={{marginBottom: '10px'}}
                                slotProps={{input: {readOnly: true}}}
                            />
                            <TextField
                                label='Номер последнего ФД'
                                value={z_book.last_fd || 0}
                                variant='filled'
                                fullWidth
                                sx={{marginBottom: '10px'}}
                                onChange={e => {
                                    const val = e.target.value
                                    if (/^\d*$/.test(val)) {
                                        set_z_book(prev => ({...prev, last_fd: val}))
                                    }
                                }}
                            />
                        </Box>
                        <Box sx={{maxWidth: '300px', marginRight: '10px'}}>
                            <TextField
                                label='Номер смены'
                                variant='filled'
                                value={z_book.number_shift || 0}
                                fullWidth
                                sx={{marginBottom: '10px'}}
                                slotProps={{input: {min: 0, step: 0.01}}}
                                onChange={e => {
                                    const val = e.target.value
                                    if (/^\d*$/.test(val)) {
                                        set_z_book(prev => ({...prev, number_shift: val}))
                                    }
                                }}
                            />
                            <TextField
                                label='Наличные'
                                variant='filled'
                                fullWidth
                                value={z_book.sum_in_cash || 0}
                                sx={{marginBottom: '10px'}}
                                slotProps={{
                                    input: {
                                        min: 0,
                                        step: 0.01,
                                        sx: {'& input': {textAlign: 'right'}},
                                        startAdornment: <InputAdornment position="start">
                                            <AddIcon/>
                                        </InputAdornment>,
                                    }
                                }}

                            />
                            <TextField
                                label='Наличные'
                                variant='filled'
                                fullWidth
                                value={z_book.sum_out_cash || 0}
                                sx={{marginBottom: '10px'}}
                                slotProps={{
                                    input: {
                                        min: 0,
                                        step: 0.01,
                                        sx: {'& input': {textAlign: 'right'}},
                                        startAdornment: <InputAdornment position="start">
                                            <RemoveIcon/>
                                        </InputAdornment>,
                                    }
                                }}
                            />
                            <TextField
                                label='Безналичные'
                                variant='filled'
                                fullWidth
                                value={z_book.sum_in_electron || 0}
                                sx={{marginBottom: '10px'}}
                                slotProps={{
                                    input: {
                                        min: 0,
                                        step: 0.01,
                                        sx: {'& input': {textAlign: 'right'}},
                                        startAdornment: <InputAdornment position="start">
                                            <AddIcon/>
                                        </InputAdornment>
                                    }
                                }}
                            />
                            <TextField
                                label='Безналичные'
                                variant='filled'
                                fullWidth
                                value={z_book.sum_out_electron || 0}
                                sx={{marginBottom: '10px'}}
                                slotProps={{
                                    input: {
                                        min: 0,
                                        step: 0.01,
                                        sx: {'& input': {textAlign: 'right'}},
                                        startAdornment: <InputAdornment position="start">
                                            <RemoveIcon/>
                                        </InputAdornment>
                                    }
                                }}
                            />
                            <TextField
                                label='НДС'
                                variant='filled'
                                fullWidth
                                value={z_book.sum_nds || 0}
                                sx={{marginBottom: '10px'}}
                                slotProps={{input: {min: 0, step: 0.01, sx: {'& input': {textAlign: 'right'}},}}}
                            />
                        </Box>
                    </Box>
                    <Box sx={{maxWidth: '610px', marginRight: '10px'}}>
                        <TextField
                            sx={{marginBottom: '10px'}}
                            label='Комментарий'
                            value={z_book.comment || ''}
                            variant='filled'
                            fullWidth
                            multiline
                            rows={4}
                        />
                    </Box>
                </Box>
                <Box sx={{maxWidth: '300px'}}>
                    <TextField
                        label='Инкассация'
                        variant='filled'
                        fullWidth
                        value={z_book.sum_total_of_income || 0}
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {min: 0, step: 0.01, sx: {'& input': {textAlign: 'right'}},}}}
                    />
                    <TextField
                        label='Наличные'
                        variant='filled'
                        fullWidth
                        value={z_book.sum_collection || 0}
                        sx={{marginBottom: '10px'}}
                        slotProps={{
                            input: {
                                min: 0,
                                step: 0.01,
                                sx: {'& input': {textAlign: 'right'}},
                                startAdornment: <InputAdornment position="start">
                                    <FunctionsIcon/>
                                </InputAdornment>
                            }
                        }}
                    />
                    <TextField
                        label='Безналичные'
                        variant='filled'
                        fullWidth
                        value={z_book.sum_electron || 0}
                        sx={{marginBottom: '10px'}}
                        slotProps={{
                            input: {
                                min: 0,
                                step: 0.01,
                                sx: {'& input': {textAlign: 'right'}},
                                startAdornment: <InputAdornment position="start">
                                    <FunctionsIcon/>
                                </InputAdornment>
                            }
                        }}
                    />
                    <TextField
                        label='Выручка'
                        variant='filled'
                        fullWidth
                        value={z_book.revenue || 0}
                        sx={{marginBottom: '10px'}}
                        slotProps={{input: {min: 0, step: 0.01, sx: {'& input': {textAlign: 'right'}},}}}
                    />
                    <TextField
                        label='Сменный итог'
                        variant='filled'
                        fullWidth
                        value={z_book.sum_total_of_income || 0}
                        sx={{marginBottom: '10px'}}
                        slotProps={{
                            input: {
                                min: 0,
                                step: 0.01,
                                sx: {'& input': {textAlign: 'right'}},
                                startAdornment: <InputAdornment position="start">
                                    <AddIcon/>
                                </InputAdornment>
                            }
                        }}
                    />
                    <TextField
                        label='Необнуляемая сумма'
                        variant='filled'
                        fullWidth
                        value={z_book.sum_non_zero_total_of_income || 0}
                        sx={{marginBottom: '10px'}}
                        slotProps={{
                            input: {
                                min: 0,
                                step: 0.01,
                                sx: {'& input': {textAlign: 'right'}},
                                startAdornment: <InputAdornment position="start">
                                    <AddIcon/>
                                </InputAdornment>
                            }
                        }}
                    />
                    <TextField
                        label='Необнуляемая сумма'
                        variant='filled'
                        fullWidth
                        value={z_book.sum_non_zero_total_of_outcome || 0}
                        sx={{marginBottom: '10px'}}
                        slotProps={{
                            input: {
                                min: 0,
                                step: 0.01,
                                sx: {'& input': {textAlign: 'right'}},
                                startAdornment: <InputAdornment position="start">
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