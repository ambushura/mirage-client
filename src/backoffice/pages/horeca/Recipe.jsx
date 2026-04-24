import {Box, Button, ButtonGroup, DialogTitle, IconButton, Tab} from "@mui/material"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {center_horeca_goods_recipe_get} from "../../../service/fetch_service.js"
import AsyncAutocomplete from "../../../ui/AsyncAutocomplete.jsx"
import CloseIcon from "@mui/icons-material/Close"
import {closeModal, openModal} from "../../../redux/interfaceReducer.js"
import {DataGridPro} from "@mui/x-data-grid-pro"
import {ruRU} from "@mui/x-data-grid/locales"
import {sxTable} from "../../../ui/ThemeContext.jsx"
import {Controller, useFieldArray, useForm} from "react-hook-form"
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
import {useCatalogMaps} from "../../../ui/hooks/useCatalogMaps.js"
import {TabContext, TabList, TabPanel} from "@mui/lab"
import ControlledFieldSwitch from "../../../ui/ControlledFieldSwitch.jsx"
import ControlledTextField from "../../../ui/ControlledTextField.jsx"

const Recipe = ({props}) => {

    // Служебные функции
    const dispatch = useDispatch()

    // Данные из стора
    const {root_filial} = useSelector(state => state.center)

    // Состояние загрузки документа
    const [loading, setLoading] = useState(true)

    // Форма документа
    const {handleSubmit, setValue, control, reset, watch} = useForm({
        defaultValues: {
            ref: v4(), ver: null, code: 'Новый', deleted: false, date_create: null, date_change: null,

            period: null,

            uid_good: null, name_good: '', out_good: '',

            design: '', cooking_method: '', comment: '',

            filials: [], organizations: []
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
                            filials: data.data.filials || [],
                            organizations: data.data.organizations || [],
                        })
                        setIngredients(data.data.ingredients)
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
    const isDeleted = watch('deleted')
    const {fields: filials} = useFieldArray({control, name: "filials"})
    const {fields: organizations} = useFieldArray({control, name: "organizations"})

    const [ingredients, setIngredients] = useState({
        rows: [], columns: [], column_grouping_model: [], column_visibility_model: []
    })

    // Триггер сохранения документа
    const [trigger_submit_receipt, set_trigger_submit_receipt] = useState(0)
    const [trigger_delete_receipt, set_trigger_delete_receipt] = useState(0)

    // Функция сохранения документа
    const onSubmit = (data) => {
        const prepared = {
            ...data, ingredients: ingredients,
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
        if (col.field === 'uid_good') {
            return {
                ...col, editable: !isDeleted,

                // Отображение ячейки
                renderCell: (params) => {
                    const item = goodsMap.get(params.row.uid_good)
                    return item?.name || '...'
                },

                // Редактирование ячейки
                renderEditCell: (params) => {
                    return <AsyncAutocomplete
                        value={params.value}
                        filial={root_filial}
                        type="goods"
                        variant="standard"
                        source="table"
                        sx={{width: '100%', height: '100%'}}
                        onChange={(val) => {
                            params.api.setEditCellValue({
                                id: params.id, field: params.field, value: val ?? null
                            })
                            params.api.stopCellEditMode({
                                id: params.id, field: params.field
                            })
                        }}
                    />
                }
            }
        }
        return {...col, editable: !['uid_good'].includes(col.field) && !isDeleted}
    })

    const goodsMap = useCatalogMaps(ingredients.rows, 'goods')

    const [current_page, set_current_page] = useState('1')

    // Выделенные строки таблиц
    const [selected_items, set_selected_items] = useState({
        type: 'include', ids: new Set()
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
                        disabled={isDeleted}
                    />}
                />
                <ControlledTextField
                    control={control}
                    name="out_good"
                    label="Выход блюда"
                    sx={{flex: 1, mr: '10px'}}
                    readOnly={isDeleted}
                />
                <ControlledDateTimePicker
                    control={control}
                    name="period"
                    label="Применять от"
                    rules={{required: 'Укажите дату применения'}}
                    sx={{flex: 1}}
                    readOnly={isDeleted}
                />
            </Box>

            <Box sx={{width: '100%', mb: '10px', minHeight: 450, maxHeight: 450}}>
                <TabContext value={current_page} sx={{overflowY: 'auto'}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList variant='scrollable' onChange={(e, v) => {
                            set_current_page(v)
                        }}>
                            <Tab label="Рецепт" value='1'/>
                            <Tab label="Филиалы" value='2'/>
                            <Tab label="Организации" value='3'/>
                            <Tab label="Дополнительно" value='4'/>
                        </TabList>
                    </Box>
                    <TabPanel value='1'>
                        <Box sx={{maxHeight: 400, overflowY: 'auto'}}>
                            <DataGridPro
                                showToolbar
                                autoHeight
                                checkboxSelection
                                disableRowSelectionOnClick
                                loading={loading}
                                rows={ingredients.rows}
                                columns={enhancedColumns}
                                columnGroupingModel={ingredients.column_grouping_model}
                                columnVisibilityModel={ingredients.column_visibility_model}
                                getRowId={(row) => row.id}
                                editMode="cell"
                                density="compact"
                                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                                sx={{...sxTable, mb: '10px', maxHeight: '400px'}}
                                slots={{toolbar: RecipeToolbar}}
                                slotProps={{
                                    toolbar: {
                                        onAdd: () => {
                                            const newRow = {
                                                id: v4(), uid_good: null, quantity: 0
                                            }
                                            setIngredients(prev => ({
                                                ...prev, rows: [...prev.rows, newRow]
                                            }))
                                        }, onDelete: () => {
                                            setIngredients(prev => ({
                                                ...prev, rows: prev.rows.filter(row => !selected_items.ids.has(row.id))
                                            }))
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
                                rowSelectionModel={selected_items}
                                onRowSelectionModelChange={(selected) => {
                                    set_selected_items(selected || [])
                                }}
                                processRowUpdate={(newRow) => {
                                    setIngredients(prev => ({
                                        ...prev, rows: prev.rows.map(row => row.id === newRow.id ? newRow : row)
                                    }))
                                    return newRow
                                }}
                            />
                        </Box>
                    </TabPanel>
                    <TabPanel value='2'>
                        <Box className='checkbox-list'>
                            {filials.map((f, index) => <ControlledFieldSwitch
                                key={f.uid_filial}
                                name={`filials.${index}.value`}
                                label={f.name_filial}
                                control={control}
                                disabled={isDeleted}
                            />)}
                        </Box>
                    </TabPanel>
                    <TabPanel value='3'>
                        <Box className='checkbox-list'>
                            {organizations.map((o, index) => <ControlledFieldSwitch
                                key={o.inn}
                                name={`filials.${index}.value`}
                                label={o.name_organization}
                                control={control}
                                disabled={isDeleted}
                            />)}
                        </Box>
                    </TabPanel>
                    <TabPanel value='4'>
                        <Box className='checkbox-list'>
                            {[{f: 'comment', n: 'Комментарий'}, {
                                f: 'cooking_method', n: 'Способ приготовления'
                            }, {f: 'design', n: 'Оформление блюда'}].map((el, i) => <ControlledTextField
                                key={i}
                                control={control}
                                name={el.f}
                                label={el.n}
                                multiline
                                sx={{width: '100%'}}
                                readOnly={isDeleted}
                            />)}
                        </Box>
                    </TabPanel>
                </TabContext>
            </Box>

            <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    {[{f: 'date_create', n: 'Создан'}, {f: 'date_update', n: 'Изменен'}].map((el, i) =>
                        <ControlledDateTimePicker
                            key={i}
                            readOnly={true}
                            control={control}
                            name={el.f}
                            label={el.n}
                            rules={{required: 'Укажите дату создания'}}
                            sx={{width: '190px', mr: '10px'}}
                        />)}
                </Box>

                <ButtonGroup sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant='delete' startIcon={<DeleteForeverIcon/>}>Удалить</Button>
                    <Button variant='copy' startIcon={<ContentCopyIcon/>}>Скопировать</Button>
                    <Button variant='save' startIcon={<SaveIcon/>}>Сохранить</Button>
                </ButtonGroup>

            </Box>

        </Box>
    }
}

const RecipeToolbar = ({onAdd, onDelete}) => {
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
        <Button onClick={onDelete} variant="tb_delete" size="small" startIcon={<RemoveIcon/>}>Удалить</Button>
    </Box>
}

export default Recipe