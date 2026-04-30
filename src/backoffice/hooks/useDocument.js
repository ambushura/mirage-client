import {useDispatch} from "react-redux"
import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {transformData} from "../../ui/hooks/common_functions.js"
import {center_catalog_load} from "../../service/fetch_service.js"

export function useDocument(filial, link, defaultValues, defaultTables, load, setCatalogMap) {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    // Документ
    const {handleSubmit, setValue, control, reset, watch} = useForm({
        defaultValues: defaultValues
    })

    // Табличные части
    const [tables, setTables] = useState([])

    // Загрузка документа
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                if (link === null) {
                    reset()
                } else {
                    const data = await load()
                    if (data?.data) {
                        reset(transformData(data.data))
                        const tablesArray = []
                        defaultTables.forEach(t => {
                            tablesArray.push({id: t.id, label: t.label, data: data.data[t.id]})
                        })
                        setTables(tablesArray)
                    }
                }
            } catch (err) {
                console.error('Ошибка загрузки документа:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [link])

    // Первоначальные значения в таблице
    useEffect(() => {
        const loadCatalog = async () => {
            const map = new Map()
            tables.forEach(table => {
                table.data.rows.forEach(row => {
                    Object.entries(row).forEach(([key, value]) => {
                        switch (key) {
                            case 'uid_good':
                                if (value) {
                                    map.set(`goods-${value}`, {
                                        type: 'goods', value
                                    })
                                }
                                break
                            case 'uid_payment_type':
                                if (value) {
                                    map.set(`payment_types-${value}`, {
                                        type: 'payment_types', value
                                    })
                                }
                                break
                            case 'uid_discount':
                                if (value) {
                                    map.set(`discounts-${value}`, {
                                        type: 'discounts', value
                                    })
                                }
                                break
                            default:
                                break
                        }
                    })
                })
            })
            const ids = [...map.values()]
            if (!ids.length) return
            const res = await dispatch(center_catalog_load(filial, ids))
            setCatalogMap(prevState => [...prevState, ...res.data])
        }
        loadCatalog()
    }, [dispatch, filial, setCatalogMap, tables])

    // Состояние загрузки
    // Контролируемые элементы
    // Табличные части
    return {loading, control, watch, reset, tables}
}