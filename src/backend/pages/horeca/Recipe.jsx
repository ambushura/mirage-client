import {Box, Button, ButtonGroup, DialogTitle, IconButton} from "@mui/material"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {center_horeca_goods_recipe_get} from "../../../service/fetch_service.js"
import AsyncAutocomplete from "../../../ui/AsyncAutocomplete.jsx"
import CloseIcon from "@mui/icons-material/Close"
import {closeModal, openModal} from "../../../redux/interfaceReducer.js"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"
import {sxTable} from "../../../ui/ThemeContext.jsx"
import {Controller, useForm} from "react-hook-form"
import {v4} from "uuid"
import {setTriggerDeleteReceipt} from "../../../redux/documentsReducer.js"
import Loader from "../../../ui/Loader.jsx"
import dayjs from "dayjs"
import {parceZone} from "../../../service/advanced.js"
import ControlledDateTimePicker from "../../../ui/ControlledDateTimePicker.jsx"
import SaveIcon from '@mui/icons-material/Save'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const Recipe = ({props}) => {

    // Служебные функции
    const dispatch = useDispatch()

    // Данные из стора
    const {root_filial} = useSelector(state => state.center)

    // Состояние загрузки документа
    const [loading, setLoading] = useState(true)

    const {handleSubmit, setValue, control, reset, watch} = useForm({
        defaultValues: {
            ref: v4(), ver: null, code: 'Новый', deleted: false, date_create: null, date_change: null,

            period: null,

            uid_good: null, name_good: '', out_good: '',

            design: '', cooking_method: '', comment: '',

            ingredients: {rows: [], columns: [], column_grouping_model: [], column_visibility_model: []},
        }
    })

    // Загрузка документа в форму при открытии
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                if (props.ref === null) {
                    reset()
                } else {
                    const data = await dispatch(center_horeca_goods_recipe_get(root_filial, props.ref, 0))
                    if (data?.data) {
                        reset({
                            ...data.data,
                            date_create: data.data.date_create ? dayjs(parceZone(data.data.date_create)) : null,
                            date_update: data.data.date_update ? dayjs(parceZone(data.data.date_update)) : null,
                            period: data.data.period ? dayjs(parceZone(data.data.period)) : null,
                        })
                    }
                }
            } catch (err) {
                console.error('Ошибка загрузки калькуляции:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [props.ref, root_filial, dispatch, reset])

    // Наблюдаемые переменные
    const code = watch('code')
    const ingredients = watch('ingredients')

    // Триггер сохранения документа
    const [trigger_submit_receipt, set_trigger_submit_receipt] = useState(0)
    const [trigger_delete_receipt, set_trigger_delete_receipt] = useState(0)

    // Функция сохранения документа
    const onSubmit = (data) => {
        const prepared = {
            ...data,
        }
    }

    // Триггер удаления документа
    useEffect(() => {
        if (trigger_delete_receipt) {
            dispatch(openModal({
                type: 'dialog_delete_receipts', props: {
                    type: 'YesNo',
                    action: 'dialog_delete_recipe',
                    question: 'Вы уверены, что хотите удалить эту калькуляцию?',
                    filial: root_filial,
                    ref: props.ref,
                }
            }))
        }
        return () => dispatch(setTriggerDeleteReceipt(false))
    }, [dispatch, props.ref, root_filial, trigger_delete_receipt])

    const enhancedColumns = ingredients.columns.map(col => {
        if (col.field === 'name_good') {
            return {
                ...col, editable: true, renderCell: (params) => {
                    return params.row.name_good || ''
                }, renderEditCell: (params) => <AsyncAutocomplete
                    value={params.value}
                    onChange={(val, option) => {
                        params.api.updateRows([{
                            id: params.id, uid_good: val, name_good: option?.name ?? ''
                        }])
                        params.api.stopCellEditMode({
                            id: params.id, field: params.field
                        })
                    }}
                    sx={{width: 'calc(100% - 4px)', height: '100%'}}
                    filial={root_filial}
                    type='goods'
                    variant='standard'
                    source='table'
                />
            }
        }
        return col
    })


    if (loading) {

        return <Loader/>

    } else {

        return <Box

            id="modal-recipe"
            component="form"
            noValidate
            autoComplete="off">

            <DialogTitle sx={{m: 0, p: '10px'}}>
                Калькуляция {code}
                <IconButton
                    aria-label="close"
                    onClick={() => {
                        dispatch(closeModal())
                    }}
                    sx={{position: "absolute", right: 8, top: 8}}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>

            <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
                <Controller
                    name="uid_good"
                    control={control}
                    render={({field}) => <AsyncAutocomplete
                        value={field.value}
                        onChange={field.onChange}
                        filial={root_filial}
                        type='goods'
                        label='Блюдо'
                        variant='filled'
                        sx={{flex: 3, mr: '10px'}}
                    />}
                />
                <ControlledDateTimePicker
                    readOnly={true}
                    control={control}
                    name="period"
                    label="Дата применения"
                    rules={{required: 'Укажите дату применения'}}
                    sx={{flex: 1}}
                />
            </Box>

            <DataGridPro
                showToolbar
                autoHeight
                loading={loading}
                rows={ingredients.rows}
                columns={enhancedColumns}
                columnGroupingModel={ingredients.column_grouping_model}
                columnVisibilityModel={ingredients.column_visibility_model}
                getRowId={(row) => row.id}
                editMode="cell"
                checkboxSelection
                disableRowSelectionOnClick
                density="compact"
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                sx={{...sxTable, mb: '10px', maxHeight: '400px'}}
                processRowUpdate={(newRow) => {
                    const updatedRows = ingredients.rows.map(r => r.id === newRow.id ? newRow : r)
                    setValue('ingredients.rows', updatedRows, {shouldDirty: true})
                    return newRow
                }}
                slots={{toolbar: RecipeToolbar}}
                slotProps={{
                    toolbar: {
                        onAdd: () => {
                            const newRow = {
                                id: v4(), name: '', quantity: 0
                            }
                            setValue('ingredients.rows', [...ingredients.rows, newRow], {
                                shouldDirty: true
                            })
                        }
                    }
                }}
                onCellMouseDown={(params, event) => {
                    if (!params.isEditable) return
                    const isEditing = params.api.getCellMode(params.id, params.field) === 'edit'
                    if (!isEditing) {
                        event.preventDefault()
                        params.api.startCellEditMode({
                            id: params.id, field: params.field
                        })
                    }
                }}
            />

            <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>

                <ControlledDateTimePicker
                    readOnly={true}
                    control={control}
                    name="date_create"
                    label="Создан"
                    rules={{required: 'Укажите дату'}}
                    sx={{width: '190px', mr: '10px'}}
                />

                <ControlledDateTimePicker
                    readOnly={true}
                    control={control}
                    name="date_update"
                    label="Изменен"
                    rules={{required: 'Укажите дату'}}
                    sx={{width: '190px', mr: '10px'}}
                />

                <ButtonGroup sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant='delete' startIcon={<DeleteForeverIcon/>}>Удалить</Button>
                    <Button variant='copy' startIcon={<ContentCopyIcon/>}>Скопировать</Button>
                    <Button variant='save' startIcon={<SaveIcon/>}>Сохранить</Button>
                </ButtonGroup>

            </Box>

        </Box>
    }
}

const RecipeToolbar = ({onAdd}) => {
    return <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper'
    }}>
        <Button onClick={onAdd} variant="tb_add" size="small" startIcon={<AddIcon/>}>Добавить</Button>
        <Button onClick={onAdd} variant="tb_delete" size="small" startIcon={<RemoveIcon/>}>Удалить</Button>
    </Box>
}

export default Recipe