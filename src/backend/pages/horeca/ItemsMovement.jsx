import {Box, Tab} from "@mui/material"
import {TabContext, TabList, TabPanel} from "@mui/lab"

const ItemsMovement = () => {
    return <Box>
        <TabContext value={0}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <TabList onChange={() => {
                }} aria-label="lab API tabs example">
                    <Tab label="Item One" value="1"/>
                    <Tab label="Item Two" value="2"/>
                    <Tab label="Item Three" value="3"/>
                </TabList>
            </Box>
            <TabPanel value="1">Item One</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
    </Box>
}

export default ItemsMovement