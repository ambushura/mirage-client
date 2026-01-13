import {useSelector} from "react-redux"
import {useState} from "react"
import {Box} from "@mui/material"
import ReportSales from "./ReportSales.jsx"
import ReportSchedule from "./ReportSchedule.jsx"

const Reports = () => {

    const filial = useSelector(state => state.data.filial)

    const {report_variant} = useSelector(state => state.reports)

    const [fetching, set_fetching] = useState({loading: false, error: null, data: null})

    if (filial === undefined) {
        return <Box className='empty-box' sx={{}}>Выберите филиал...</Box>
    } else if (report_variant === 'sales') {
        return <ReportSales/>
    } else if (report_variant === 'schedule') {
        return <ReportSchedule/>
    }

}

export default Reports
