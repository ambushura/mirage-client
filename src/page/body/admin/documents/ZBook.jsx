import {Box, Button, InputAdornment, TextField, Typography} from "@mui/material"
import {closeModal} from "../../../../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import dayjs from "dayjs"
import {DatePicker} from "@mui/x-date-pickers"
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FunctionsIcon from '@mui/icons-material/Functions'
import {common_documents_zbook_get, common_documents_zbook_save} from "../../../../service/fetch_service.js"
import LazySelect from "../../../../ui/LazySelect.jsx"
import {v4 as uuidv4} from 'uuid'
import {setZBooksUpdate} from "../../../../redux/documentsReducer.js"
import CloseIcon from '@mui/icons-material/Close'

const ZBook = ({props}) => {

    const dispatch = useDispatch()

    const handle_save = () => {
        const prepared = {
            ...z_book,
            number_shift: Number(z_book.number_shift) || 0,
            last_fd: Number(z_book.last_fd) || 0,
            sum_in_cash: parseFloat(z_book.sum_in_cash) || 0,
            sum_out_cash: parseFloat(z_book.sum_out_cash) || 0,
            sum_in_electron: parseFloat(z_book.sum_in_electron) || 0,
            sum_out_electron: parseFloat(z_book.sum_out_electron) || 0,
            sum_nds: parseFloat(z_book.sum_nds) || 0,
            sum_collection: parseFloat(z_book.sum_collection) || 0,
            sum_electron: parseFloat(z_book.sum_electron) || 0,
            revenue: parseFloat(z_book.revenue) || 0,
            sum_total_of_income: parseFloat(z_book.sum_total_of_income) || 0,
            sum_non_zero_total_of_income: parseFloat(z_book.sum_non_zero_total_of_income) || 0,
            sum_non_zero_total_of_outcome: parseFloat(z_book.sum_non_zero_total_of_outcome) || 0,
        }
        dispatch(common_documents_zbook_save(filial, prepared))
        dispatch(closeModal())
        dispatch(setZBooksUpdate())
    }

    const filial = useSelector(state => state.data.filial)
    const [z_book, set_z_book] = useState({
        id: '',
        automatic: false,
        name_organization: '',
        inn: '',
        number_kkt: '',
        number_shift: 0,
        date_shift: '',
        date_ofd: '',
        sum_in_cash: 0,
        sum_out_cash: 0,
        sum_in_electron: 0,
        sum_out_electron: 0,
        sum_non_zero_total_of_income: 0,
        sum_non_zero_total_of_outcome: 0,
        sum_total_of_income: 0,
        sum_nds: 0,
        sum_collection: 0,
        revenue: 0,
        comment: '',
        uid_filial: '',
        uid_kkt: '',
        uid_wallet: '',
        ver: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(closeModal())
    }

    useEffect(() => {
        if (props.id === 'new') {
            set_z_book({
                id: uuidv4(),
                automatic: false,
                name_organization: '',
                inn: '',
                number_kkt: '',
                number_shift: 0,
                date_shift: '',
                date_ofd: '',
                sum_in_cash: 0,
                sum_out_cash: 0,
                sum_in_electron: 0,
                sum_out_electron: 0,
                sum_non_zero_total_of_income: 0,
                sum_non_zero_total_of_outcome: 0,
                sum_total_of_income: 0,
                sum_nds: 0,
                sum_collection: 0,
                revenue: 0,
                comment: '',
                uid_filial: filial.uid,
                uid_kkt: '',
                uid_wallet: '',
                ver: uuidv4(),
            })
        } else {
            const fetch = async () => {
                try {
                    const data = await dispatch(common_documents_zbook_get(filial, props.uid))
                    set_z_book(data.data)
                } catch (err) {
                    console.error('Ошибка загрузки кассовой книги:', err)
                }
            }
            fetch()
        }
    }, [filial, props.id, dispatch])

    const handleMoneyChange = (key) => (e) => {
        let val = e.target.value.replace(',', '.')
        // Разрешаем только цифры и одну точку, максимум 2 знака после
        if (!/^\d*\.?\d{0,2}$/.test(val)) return
        // Убираем ведущие нули, кроме "0." (например, "012" -> "12")
        if (val.startsWith('0') && val.length > 1 && val[1] !== '.') {
            val = val.replace(/^0+/, '')
        }
        // Если пользователь ввёл ".", превращаем в "0."
        if (val === '.') val = '0.'
        set_z_book(prev => ({...prev, [key]: val}))
    }

    return <Box
        id="modal-zbook"
        component="form"
        noValidate
        autoComplete="off"
        sx={{width: '920px'}}
        onSubmit={handleSubmit}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px'}}>
            <Typography variant="h6" color="textSecondary">
                {`${props.id === 'new' ? 'НОВАЯ' : ''} КАССОВАЯ КНИГА`}
            </Typography>
            <Button variant='text' color='secondary' onClick={() => dispatch(closeModal())}><CloseIcon/></Button>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
                <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Box sx={{maxWidth: '300px', marginRight: '10px'}}>
                        <DatePicker
                            label='Дата смены'
                            variant='filled'
                            value={z_book.date_shift ? dayjs(z_book.date_shift) : null}
                            sx={{marginBottom: '10px', width: '100%'}}
                            onChange={(newVal) => {
                                if (z_book.automatic) return
                                const date = newVal && newVal.isValid() ? dayjs(newVal).startOf('day').format('YYYY-MM-DDTHH:mm:ssZ') : null
                                set_z_book(prev => ({...prev, date_shift: date}))
                            }}
                        />
                        <DatePicker
                            label='Дата ОФД'
                            variant='filled'
                            value={z_book.date_ofd ? dayjs(z_book.date_ofd) : null}
                            sx={{marginBottom: '10px', width: '100%'}}
                            onChange={(newVal) => {
                                if (z_book.automatic) return
                                const date = newVal && newVal.isValid() ? dayjs(newVal).startOf('day').format('YYYY-MM-DDTHH:mm:ssZ') : null
                                set_z_book(prev => ({...prev, date_ofd: date}))
                            }}
                        />
                        <LazySelect
                            variant='filled'
                            sx={{marginBottom: '10px'}}
                            label="Касса"
                            value={z_book.uid_kkt}
                            type="kkt"
                            filial={filial}
                            onChange={(uid, extra) => {
                                if (z_book.automatic) return
                                set_z_book(prev => ({
                                    ...prev,
                                    uid_kkt: uid,
                                    number_kkt: extra.number_kkt,
                                    name_organization: extra.name_organization,
                                    inn: extra.inn,
                                    uid_wallet: extra.uid_wallet
                                }))
                            }}
                            getLabel={item => `ЗН ${item.title}`}
                            extraFields={['uid_organization', 'name_organization', 'inn', 'uid_wallet', 'number_kkt']}
                        />
                        <TextField
                            label='Организация'
                            value={z_book.name_organization || ''}
                            variant='filled'
                            fullWidth
                            sx={{marginBottom: '10px'}}
                            slotProps={{input: {readonly: true}}}
                        />
                        <TextField
                            label='ИНН'
                            value={z_book.inn || ''}
                            variant='filled'
                            fullWidth
                            sx={{marginBottom: '10px'}}
                            slotProps={{input: {readonly: true}}}
                        />
                        <TextField
                            label='Номер последнего ФД'
                            value={z_book.last_fd || '0'}
                            variant='filled'
                            fullWidth
                            sx={{marginBottom: '10px'}}
                            onChange={e => {
                                if (z_book.automatic) return
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
                            value={z_book.number_shift || '0'}
                            fullWidth
                            sx={{marginBottom: '10px'}}
                            slotProps={{input: {min: 0, step: 0.01}}}
                            onChange={e => {
                                if (z_book.automatic) return
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
                            value={z_book.sum_in_cash || '0'}
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
                            onChange={e => {
                                if (z_book.automatic) return
                                handleMoneyChange('sum_in_cash')(e)
                            }}
                        />
                        <TextField
                            label='Наличные'
                            variant='filled'
                            fullWidth
                            value={z_book.sum_out_cash || '0'}
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
                            onChange={e => {
                                if (z_book.automatic) return
                                handleMoneyChange('sum_out_cash')(e)
                            }}
                        />
                        <TextField
                            label='Безналичные'
                            variant='filled'
                            fullWidth
                            value={z_book.sum_in_electron || '0'}
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
                            onChange={e => {
                                if (z_book.automatic) return
                                handleMoneyChange('sum_in_electron')(e)
                            }}
                        />
                        <TextField
                            label='Безналичные'
                            variant='filled'
                            fullWidth
                            value={z_book.sum_out_electron || '0'}
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
                            onChange={e => {
                                if (z_book.automatic) return
                                handleMoneyChange('sum_out_electron')(e)
                            }}
                        />
                        <TextField
                            label='НДС'
                            variant='filled'
                            fullWidth
                            value={z_book.sum_nds || '0'}
                            sx={{marginBottom: '10px'}}
                            slotProps={{input: {min: 0, step: 0.01, sx: {'& input': {textAlign: 'right'}}}}}
                            onChange={e => {
                                if (z_book.automatic) return
                                handleMoneyChange('sum_nds')(e)
                            }}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{maxWidth: '300px'}}>
                <TextField
                    label='Инкассация'
                    variant='filled'
                    fullWidth
                    value={z_book.sum_collection || '0'}
                    sx={{marginBottom: '10px'}}
                    slotProps={{input: {min: 0, step: 0.01, sx: {'& input': {textAlign: 'right'}}}}}
                    onChange={e => {
                        if (z_book.automatic) return
                        handleMoneyChange('sum_collection')(e)
                    }}
                />
                <TextField
                    label='Безналичные'
                    variant='filled'
                    fullWidth
                    value={z_book.sum_electron || '0'}
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
                    onChange={e => {
                        if (z_book.automatic) return
                        handleMoneyChange('sum_electron')(e)
                    }}
                />
                <TextField
                    label='Выручка'
                    variant='filled'
                    fullWidth
                    value={z_book.revenue || '0'}
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
                    onChange={e => {
                        if (z_book.automatic) return
                        handleMoneyChange('revenue')(e)
                    }}
                />
                <TextField
                    label='Сменный итог'
                    variant='filled'
                    fullWidth
                    value={z_book.sum_total_of_income || '0'}
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
                    onChange={e => {
                        if (z_book.automatic) return
                        handleMoneyChange('sum_total_of_income')(e)
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
                    onChange={e => {
                        if (z_book.automatic) return
                        handleMoneyChange('sum_non_zero_total_of_income')(e)
                    }}
                />
                <TextField
                    label='Необнуляемая сумма'
                    variant='filled'
                    fullWidth
                    value={z_book.sum_non_zero_total_of_outcome || '0'}
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
                    onChange={e => {
                        if (z_book.automatic) return
                        handleMoneyChange('sum_non_zero_total_of_outcome')(e)
                    }}
                />
            </Box>
            <Box sx={{width: '100%', marginBottom: '10px'}}>
                <TextField
                    label='Комментарий'
                    value={z_book.comment || ''}
                    variant='filled'
                    fullWidth
                    multiline
                    rows={2}
                    onChange={e => {
                        if (z_book.automatic) return
                        set_z_book(prev => ({
                            ...prev, comment: e.target.value
                        }))
                    }}
                />
            </Box>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            {!z_book.automatic && props.id !== 'new' &&
                <Button fullWidth variant='contained' color='warning' sx={{marginRight: 1}}>Удалить</Button>}
            <Button fullWidth variant='contained' color='secondary' onClick={() => {
                handle_save()
            }}>Сохранить</Button>
        </Box>
    </Box>
}

export default ZBook