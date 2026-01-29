import {useSelector} from "react-redux"
import {Box} from "@mui/material"
import ReportSales from "./ReportSales.jsx"
import ReportSchedule from "./ReportSchedule.jsx"
import ReportShift from "./ReportShift.jsx"

const Reports = () => {

    const filial = useSelector(state => state.data.filial)
    const {report_variant} = useSelector(state => state.reports)

    if (filial === undefined) {
        return <Box className='empty-box' sx={{}}>Выберите филиал...</Box>
    } else if (report_variant === 'sales') {
        return <ReportSales/>
    } else if (report_variant === 'shift') {
        return <ReportShift/>
    } else if (report_variant === 'schedule') {
        return <ReportSchedule/>
    }

}

export default Reports
