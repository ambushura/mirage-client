import React, {useEffect} from 'react'
import {Box, ListItem, ListItemIcon, ListItemText} from "@mui/material"
import {SimpleTreeView, TreeItem} from '@mui/x-tree-view'
import {useDispatch, useSelector} from "react-redux"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {setExpendedTree, setGoods, setUidCurrentFolder} from "../../../redux/centerReducer.js"
import {center_horeca_goods_get} from "../../../service/fetch_service.js"
import List from '@mui/material/List'
import LabelIcon from '@mui/icons-material/Label'

const Goods = () => {

    const dispatch = useDispatch()

    const {tree, expanded_tree, uid_current_folder, goods, uid_current_good} = useSelector(state => state.center)

    const renderTree = (nodes) => nodes.map(node => <TreeItem
        key={node.uid}
        itemId={node.uid}
        label={<Box
            sx={{
                userSelect: 'text',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontWeight: 300,
            }}
            title={node.name}
            onClick={(e) => e.stopPropagation()}
        >
            {node.name}
        </Box>}
    >
        {node.children?.length > 0 && renderTree(node.children)}
    </TreeItem>)

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(center_horeca_goods_get({
                ip: '10.101.3.88', port: '60000'
            }, uid_current_folder, 0))
            if (!fetching_result.loading && fetching_result.data !== null && fetching_result.error === null) {
                const data = fetching_result.data
                dispatch(setGoods(data))
            }
        }
        if (uid_current_folder !== null) {
            fetch()
        }
    }, [dispatch, uid_current_folder])

    return <Box sx={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', maxHeight: 'calc(100vh - var(--center-submenu-height))'
    }}>
        <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', padding: '0 5px'}}>
            <Box sx={{
                paddingRight: '5px',
                width: 400,
                maxWidth: 400,
                height: 'calc(100vh - var(--center-header-height) - var(--center-submenu-height))',
                overflow: 'auto',
                borderRight: '1px solid #e0e0e0'
            }}
                 className='center-scroll'>
                <SimpleTreeView
                    sx={{maxWidth: '400px'}}
                    slots={{collapseIcon: ExpandMoreIcon, expandIcon: ChevronRightIcon}}
                    defaultExpandedItems={[]}
                    expandedItems={expanded_tree}
                    onExpandedItemsChange={(e, ids) => dispatch(setExpendedTree(ids))}
                    onSelectedItemsChange={(e, ids) => {
                        dispatch(setUidCurrentFolder(ids))
                    }}
                >
                    {renderTree(tree)}
                </SimpleTreeView>
            </Box>
        </Box>
        <Box className='center-scroll' sx={{
            flex: 1,
            minWidth: '400px',
            maxHeight: 'calc(100vh - var(--center-header-height) - var(--center-submenu-height))',
            padding: '0 5px',
            overflow: 'auto',
        }}>
            <List dense>
                {goods.map((item, i) => <ListItem>
                    <ListItemIcon>
                        <LabelIcon/>
                    </ListItemIcon>
                    <ListItemText
                        primary={item.name}
                        secondary={item.unit_name}
                    />
                </ListItem>)}
            </List>
        </Box>
        <Box sx={{flex: 1, padding: '0 5px', overflow: 'auto'}}>
            <Box>Калькуляции</Box>
            <Box>
                Содержимое
            </Box>
        </Box>
        <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', padding: '0 5px'}}>
            <Box>Ингредиенты</Box>
            <Box>
                Содержимое
            </Box>
        </Box>
    </Box>
}

export default Goods