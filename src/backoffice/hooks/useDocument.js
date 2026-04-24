import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import dayjs from "dayjs"
import {parceZone} from "../../service/advanced.js"

export function useDocument(link, defaultValues, defaultTables, load) {

    const dispatch = useDispatch()
    const {root_filial, filial} = useSelector(state => state.center)
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

    // Состояние загрузки
    // Контролируемые элементы
    // Табличные части
    return {loading, control, watch, reset, tables}
}

const transformData = (data) => {
    return Object.fromEntries(Object.entries(data).map(([key, value]) => {
        if (key === 'date_create' || key === 'date_update') {
            return [key, value ? dayjs(parceZone(value)) : null]
        }
        return [key, value]
    }))
}