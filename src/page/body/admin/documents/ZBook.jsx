import {Box, Button, Skeleton, Typography} from "@mui/material"
import {closeModal} from "../../../../redux/interfaceReducer.js"
import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {common_documents_zbook_get, common_documents_zbook_save} from "../../../../service/fetch_service.js"
import CloseIcon from '@mui/icons-material/Close'
import {useForm} from "react-hook-form"
import ControlledDatePicker from "../../../../ui/ControlledDatePicker.jsx"
import ControlledLazySelect from "../../../../ui/ControlledLazySelect.jsx"
import ControlledTextField from "../../../../ui/ControlledTextField.jsx"
import ControlledMoneyField from "../../../../ui/ControlledMoneyField.jsx"
import dayjs from "dayjs"
import {setZBooksUpdate} from "../../../../redux/documentsReducer.js"
import {parceZone} from "../../../../service/advanced.js"

const ZBook = ({props}) => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)

    const [loading, set_loading] = useState(true)

    const {handleSubmit, setValue, control, reset, watch} = useForm({
        defaultValues: {
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
        }
    })

    const date_shift = watch('date_shift')
    const number_kkt = watch('number_kkt')

    useEffect(() => {
        const fetchData = async () => {
            set_loading(true)
            try {
                if (props.uid === 'new') {
                    reset()
                } else {
                    const data = await dispatch(common_documents_zbook_get(filial, props.uid))
                    if (data?.data) {
                        reset({
                            ...data.data,
                            date_shift: data.data.date_shift ? dayjs(parceZone(data.data.date_shift)) : null,
                            moment: data.data.moment ? dayjs(parceZone(data.data.moment)) : null,
                        })
                    }
                }
            } catch (err) {
                console.error('Ошибка загрузки кассовой книги:', err)
            } finally {
                set_loading(false)
            }
        }
        fetchData()
    }, [props.uid, filial, dispatch, reset])

    const onSubmit = (data) => {
        const prepared = {
            ...data,
            date_shift: dayjs(data.date_shift).format('YYYY-MM-DDTHH:mm:ss+00:00'),
            moment: dayjs(data.moment).format('YYYY-MM-DDTHH:mm:ss+00:00'),
            number_shift: Number(data.number_shift) || 0,
            last_fd: Number(data.last_fd) || 0,
            sum_in_cash: parseFloat(data.sum_in_cash) || 0,
            sum_out_cash: parseFloat(data.sum_out_cash) || 0,
            sum_in_electron: parseFloat(data.sum_in_electron) || 0,
            sum_out_electron: parseFloat(data.sum_out_electron) || 0,
            sum_nds: parseFloat(data.sum_nds) || 0,
            sum_collection: parseFloat(data.sum_collection) || 0,
            sum_electron: parseFloat(data.sum_electron) || 0,
            revenue: parseFloat(data.revenue) || 0,
            sum_total_of_income: parseFloat(data.sum_total_of_income) || 0,
            sum_non_zero_total_of_income: parseFloat(data.sum_non_zero_total_of_income) || 0,
            sum_non_zero_total_of_outcome: parseFloat(data.sum_non_zero_total_of_outcome) || 0,
        }
        dispatch(common_documents_zbook_save(filial, prepared))
        dispatch(closeModal())
        dispatch(setZBooksUpdate())
    }

    if (loading) {
        return <Loader/>
    } else {
        return <Box
            sx={{maxHeight: '700px', overflowY: 'auto'}}
            id="modal-z-book"
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px'}}>
                <Typography variant="h6" color="textSecondary">
                    {`КАССОВАЯ КНИГА ${props.uid === 'new' ? ' * ' : 'от ' + dayjs(date_shift).format('DD.MM.YY') + ' ЗН ' + number_kkt}`}
                </Typography>
                <Button variant='text' color='secondary' onClick={() => dispatch(closeModal())}><CloseIcon/></Button>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Box sx={{
                        display: 'flex', flexDirection: 'column', flexWrap: 'wrap', flex: 1, marginRight: '10px'
                    }}>
                        <ControlledDatePicker
                            control={control}
                            name="date_shift"
                            label="Дата смены"
                            rules={{required: 'Укажите дату смены'}}
                            sx={{width: '100%'}}
                        />
                        <ControlledLazySelect
                            control={control}
                            name="uid_kkt"
                            label="ККТ"
                            type="kkt"
                            filial={filial}
                            extraFields={['uid_organization', 'name_organization', 'inn', 'sno', 'title', 'uid_wallet']}
                            rules={{required: 'Укажите ККТ'}}
                            onChange={(uid, extra) => {
                                setValue('uid_organization', extra.uid_organization || '')
                                setValue('name_organization', extra.name_organization || '')
                                setValue('inn', extra.inn || '')
                                setValue('sno', String(extra.sno) ?? null)
                                setValue('number_kkt', extra.title ?? null)
                                setValue('uid_wallet', extra.uid_wallet ?? null)
                            }}
                            sx={{width: '100%'}}
                        />
                        <ControlledTextField
                            control={control}
                            name="name_organization"
                            label="Организация"
                            readOnly={true}
                            rules={{
                                required: 'Укажите организацию (из кассы)'
                            }}
                            sx={{width: '100%'}}
                        />
                        <ControlledTextField
                            control={control}
                            name="inn"
                            label="ИНН"
                            readOnly={true}
                            rules={{
                                required: 'Укажите ИНН организации (из кассы)',
                                pattern: {value: /^[0-9]+$/, message: 'Допустимы только цифры'}
                            }}
                            sx={{width: '100%'}}
                        />
                        <ControlledDatePicker
                            control={control}
                            name="date_ofd"
                            label="Дата ОФД"
                            sx={{width: '100%'}}
                        />
                        <ControlledTextField
                            control={control}
                            name="last_fd"
                            label="Номер последнего ФД"
                            numeric
                            rules={{
                                pattern: {value: /^[0-9]+$/, message: 'Допустимы только цифры'}
                            }}
                            sx={{width: '100%'}}
                        />
                    </Box>
                    <Box
                        sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', flex: 1, marginRight: '10px'}}>
                        <ControlledTextField
                            control={control}
                            name="number_shift"
                            label="Номер смены"
                            numeric
                            rules={{
                                required: 'Укажите номер смены',
                                pattern: {value: /^[0-9]+$/, message: 'Допустимы только цифры'}
                            }}
                            sx={{width: '100%'}}
                        />
                        <ControlledMoneyField
                            control={control}
                            name="sum_in_cash"
                            label="Наличные (приход)"
                            sx={{width: '100%'}}
                        />
                        <ControlledMoneyField
                            control={control}
                            name="sum_out_cash"
                            label="Наличные (расход)"
                            sx={{width: '100%'}}
                        />
                        <ControlledMoneyField
                            control={control}
                            name="sum_in_electron"
                            label="Безналичные (приход)"
                            sx={{width: '100%'}}
                        />
                        <ControlledMoneyField
                            control={control}
                            name="sum_out_electron"
                            label="Безналичные (расход)"
                            sx={{width: '100%'}}
                        />
                        <ControlledMoneyField
                            control={control}
                            name="sum_nds"
                            label="НСД"
                            sx={{width: '100%'}}
                        />
                    </Box>
                    <Box
                        sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', flex: 1}}>
                        <ControlledMoneyField
                            control={control}
                            name="sum_collection"
                            label="Инкассация"
                            sx={{width: '100%'}}
                        />
                        <ControlledMoneyField
                            control={control}
                            name="sum_electron"
                            label="Безналичные (всего)"
                            sx={{width: '100%'}}
                        />
                        <ControlledMoneyField
                            control={control}
                            name="revenue"
                            label="Выручка"
                            sx={{width: '100%'}}
                        />
                        <ControlledMoneyField
                            control={control}
                            name="sum_total_of_income"
                            label="Сменный итог"
                            sx={{width: '100%'}}
                        />
                        <ControlledMoneyField
                            control={control}
                            name="sum_non_zero_total_of_income"
                            label="Необнуляемая сумма прихода"
                            sx={{width: '100%'}}
                        />
                        <ControlledMoneyField
                            control={control}
                            name="sum_non_zero_total_of_outcome"
                            label="Необнуляемая сумма возврата прихода"
                            sx={{width: '100%'}}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{flex: 1}}>
                <ControlledTextField
                    control={control}
                    name="comment"
                    label="Комментарий"
                    sx={{width: '100%'}}
                />
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Button fullWidth variant='contained' color='warning' sx={{marginRight: 1}}>Удалить</Button>
                <Button fullWidth variant='contained' color='secondary' type={'submit'}>Сохранить</Button>
            </Box>
        </Box>
    }
}

export default ZBook

function Loader() {
    return <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <Box sx={{display: 'flex', flexDirection: 'row', marginBottom: '10px'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', flex: 1, marginRight: '5px'}}>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', flex: 1, marginRight: '5px'}}>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', flex: 1}}>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
                <Skeleton variant="text" width={'100%'} height={40}/>
            </Box>
        </Box>
        <Skeleton variant="rectangular" width={'615px'} height={50}/>
    </Box>
}