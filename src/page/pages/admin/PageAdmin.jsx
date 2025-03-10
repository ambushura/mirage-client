import {Box, Tab, Tabs} from "@mui/material"
import {useState} from "react"
import PropTypes from "prop-types"

const PageAdmin = () => {

    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    function CustomTabPanel(props) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{p: 3}}>{children}</Box>}
            </div>
        );
    }

    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    }

    function allProps(index) {
        return {id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`}
    }

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs variant="scrollable" value={value} onChange={handleChange}>
                    <Tab label="Заказы" {...allProps(0)}/>
                    <Tab label="Итоги" {...allProps(1)}/>
                    <Tab label="Залы" {...allProps(2)}/>
                    <Tab label="Оборудование" {...allProps(3)}/>
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                Заказы
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Итоги
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Залы
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                Оборудование
            </CustomTabPanel>
        </Box>
    )
}

export default PageAdmin