import {Box, Button, Tab} from '@mui/material'
import {TabContext, TabList, TabPanel} from '@mui/lab'
import {useState} from 'react'

const ItemsMovement = ({props}) => {
    const [value, setValue] = useState('1')

    return (
        <Box>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList
                        onChange={(e, newValue) => setValue(newValue)}
                        aria-label="Редактирование товаров"
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            '& .MuiTab-root': {
                                color: '#666',
                                textTransform: 'none',
                                fontSize: '16px',
                            },
                            '& .Mui-selected': {
                                color: '#000 !important',
                                fontWeight: 'bold',
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#000',
                            },
                        }}
                    >
                        <Tab label="Факт" value="1"/>
                        <Tab label="Заменить номенклатуру" value="2"/>
                        <Tab label="Заменить склад" value="3"/>
                        <Tab label="Перемещение" value="4"/>
                        <Tab label="Оприходование" value="5"/>
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{color: '#000'}}>
                    <Button variant="outlined" color="secondary">
                        Сохранить
                    </Button>
                </TabPanel>
                <TabPanel value="2" sx={{color: '#000'}}>
                    <Button variant="outlined" color="secondary">
                        Сохранить
                    </Button>
                </TabPanel>
                <TabPanel value="3" sx={{color: '#000'}}>
                    <Button variant="outlined" color="secondary">
                        Сохранить
                    </Button>
                </TabPanel>
                <TabPanel value="4" sx={{color: '#000'}}>
                    <Button variant="_1c" color="secondary">
                        Переместить
                    </Button>
                </TabPanel>
                <TabPanel value="5" sx={{color: '#000'}}>
                    <Button variant="_1c" color="secondary">
                        Оприходовать
                    </Button>
                </TabPanel>
            </TabContext>
    </Box>
    )
}

export default ItemsMovement
