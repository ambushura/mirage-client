import {Box, Button, TextField, Typography} from "@mui/material"
import {DatePicker} from "@mui/x-date-pickers"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {common_documents_slip_get} from "../../../../service/fetch_service.js";

const Slip = ({props}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const city = useSelector(state => state.data.city)
    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const wp = useSelector(state => state.interface.wp)

    const [loading, set_loading] = useState(true)

    const {handleSubmit, setValue, control, reset, watch} = useForm({
        defaultValues: {
            uid_filial: props.uid === 'new' ? filial.uid : '',
            ver: props.uid === 'new' ? v4() : '',
            id: props.uid === 'new' ? v4() : '',
            deleted: false,
            uid_creator: null,
            name_creator: '',
            copy: false,
            date_create: null,
            date_shift: null,
            sum_discount: 0,
            fn: '',
            fd: '',
            fp: '',
            moment: null,
            number: '',
            number_kkt: '',
            price: 0,
            shift_number: '',
            sum: 0,
            type: null,
            uid_cashier: '',
            name_cashier: '',
            uid_kkt: '',
            uid_order_cinema: '',
            uid_order_food: '',
            uid_organization: '',
            uid_payment_type: '',
            name_payment_type: '',
            uid_channel: '',
            name_channel: '',
            uid_store: '',
            name_organization: '',
            inn_organization: '',
            name_store: '',
            uid_work_place: '',
            sno: null,
            printed: false,
            channel_name: '',
            rn: '',
            date_shift_claim: null,
            comment: '',
            items: [],
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            set_loading(true)
            try {
                if (props.uid === 'new') {
                    reset()
                } else {
                    const data = await dispatch(common_documents_slip_get(filial, props.uid))
                    if (data?.data) {
                        reset({
                            ...data.data, // date_create: data.data.date_create ? dayjs(parceZone(data.data.date_create)) : null,
                            // date_shift: data.data.date_shift ? dayjs(parceZone(data.data.date_shift)) : null,
                            // moment: data.data.moment ? dayjs(parceZone(data.data.moment)) : null,
                            // price: data.data.price ? parseFloat(data.data.price) : 0,
                            // sum_discount: data.data.sum_discount ? parseFloat(data.data.sum_discount) : 0,
                            // sum: data.data.sum ? parseFloat(data.data.sum) : 0,
                            // sno: data.data.sno !== null ? String(data.data.sno) : null,
                        })
                    }
                }
            } catch (err) {
                console.error('Ошибка загрузки слипа:', err)
            } finally {
                set_loading(false)
            }
        }
        fetchData()
    }, [props.uid, filial, dispatch, reset])

    return <Box id="modal-slip"
                component="form"
                noValidate
                autoComplete="off"
                sx={{width: '900px'}}
                onSubmit={handleSubmit}>
        <Typography variant="h6" color="textSecondary" margin={1}>
            БАНКОВСКИЙ СЛИП
        </Typography>
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1}}>
                <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                    Общие
                </Typography>
                <DatePicker
                    label='Дата смены'
                    variant='filled'
                    value={null}
                    sx={{marginBottom: '10px'}}
                    onChange={(newVal) => onChange(newVal ? newVal.toISOString() : null)}
                />
                <DatePicker
                    label='Дата создания'
                    variant='filled'
                    value={null}
                    sx={{marginBottom: '10px'}}
                    onChange={(newVal) => onChange(newVal ? newVal.toISOString() : null)}
                />
                <TextField
                    label='Автор'
                    variant='filled'
                    sx={{marginBottom: '10px'}}
                    slotProps={{input: {readOnly: true}}}
                />
                <TextField
                    label='0 · Сумма операции'
                    variant='filled'
                    sx={{marginBottom: '10px'}}
                />
                <TextField
                    label='39 · Статус проведения транзакции'
                    variant='filled'
                    sx={{marginBottom: '10px'}}
                />
                <TextField
                    label='86 · Дополнительные данные транзакции'
                    variant='filled'
                    sx={{marginBottom: '10px'}}
                />
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1}}>
                <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                    Поля 4 - 11
                </Typography>
                <TextField
                    label='4 · Код валюты операции'
                    variant='filled'
                    sx={{marginBottom: '10px'}}
                />
                <TextField
                    label='6 · Оригинальные даты и время совершения операции на хосте'
                    variant='filled'
                    sx={{marginBottom: '10px'}}
                />
                <TextField
                    label='9 · Способ кодировки PIN-блока'
                    variant='filled'
                    sx={{marginBottom: '10px'}}
                />
                <TextField
                    label='10 · Номер карты'
                    variant='filled'
                    sx={{marginBottom: '10px'}}
                />
                <TextField
                    label='11 · Срок действия карты'
                    variant='filled'
                    sx={{marginBottom: '10px'}}
                />
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1}}>
                <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                    Поля 13 - 21
                </Typography>
                <TextField
                    label='13 · Код авторизации'
                    variant='filled'
                    sx={{marginBottom: '10px'}}
                />
                <TextField
                    label='14 · Номер ссылки'
                    variant='filled'
                    sx={{marginBottom: '10px'}}
                />
                <TextField
                    label='15 · Код ответа'
                    variant='filled'
                    sx={{marginBottom: '10px'}}
                />
                <TextField
                    label='19 · Дополнительные данные ответа'
                    variant='filled'
                    sx={{marginBottom: '10px'}}
                />
                <TextField
                    label='21 · Оригинальные даты и время совершения операции'
                    variant='filled'
                    sx={{marginBottom: '10px'}}
                />
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', m: 1}}>
                <Typography sx={{textAlign: 'center'}} variant="h6" color="textSecondary">
                    Поля 23 - 28
                </Typography>
                <TextField
                    label='23 · Идентификатор транзакции в коммуникационном сервере'
                    variant='filled'
                    sx={{marginBottom: '10px'}}
                />
                <TextField
                    label='25 · Код операции'
                    variant='filled'
                    sx={{marginBottom: '10px'}}
                />
                <TextField
                    label='26 · Уникальный номер транзакции на стороне внешнего  устройства'
                    variant='filled'
                    sx={{marginBottom: '10px'}}
                />
                <TextField
                    label='27 · Идентификатор внешнего устройства'
                    variant='filled'
                    sx={{marginBottom: '10px'}}
                />
                <TextField
                    label='28 · Идентификатор продавца'
                    variant='filled'
                    sx={{marginBottom: '10px'}}
                />
            </Box>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Button fullWidth variant='contained' color='error' sx={{marginRight: 1}}>Удалить</Button>
            <Button fullWidth variant='contained' color='secondary' sx={{marginRight: 1}}>Квитанция</Button>
            <Button fullWidth variant='contained' color='secondary' sx={{marginRight: 1}}>Перейти в заказ</Button>
            <Button fullWidth variant='contained' color='secondary'>Сохранить</Button>
        </Box>
    </Box>
}

export default Slip