import React, {useEffect} from 'react'
import {Box} from "@mui/material"
import {SimpleTreeView, TreeItem} from '@mui/x-tree-view'
import {useDispatch, useSelector} from "react-redux"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {setExpandedTree, setGoods, setUidCurrentFolder} from "../../../redux/center/centerReducer.js"
import {center_horeca_goods_get} from "../../../service/fetch_service.js"

const Goods = () => {

    const dispatch = useDispatch()

    const {
        root_filial, tree, expanded_tree, uid_current_folder, goods, uid_current_good
    } = useSelector(state => state.center)

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
                fontWeight: 100,
            }}
            title={node.name}
        >
            {node.name}
        </Box>}
    >
        {node.children?.length > 0 && renderTree(node.children)}
    </TreeItem>)

    const renderGoods = (nodes) => nodes.map(node => <TreeItem
        key={node.uid}
        itemId={node.uid}
        label={<Box
            sx={{
                userSelect: 'text',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontWeight: 100,
            }}
            title={node.name}
        >
            {node.name} <span style={{fontSize: '90%', fontWeight: 100}}>{node.unit_name}</span>
        </Box>}
    >
    </TreeItem>)

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(center_horeca_goods_get(root_filial, uid_current_folder, 0))
            if (!fetching_result.loading && fetching_result.data !== null && fetching_result.error === null) {
                const data = fetching_result.data
                dispatch(setGoods(data))
            }
        }
        if (uid_current_folder !== null) {
            fetch()
        }
    }, [dispatch, uid_current_folder])

    return <Box className='center-horeca-page' sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        <Box className='center-horeca-page-part'>
            <Box sx={{height: '100%', overflowY: 'auto'}} className='center-scroll'>
                <SimpleTreeView
                    slots={{collapseIcon: ExpandMoreIcon, expandIcon: ChevronRightIcon}}
                    defaultExpandedItems={[]}
                    expandedItems={expanded_tree}
                    onExpandedItemsChange={(e, ids) => dispatch(setExpandedTree(ids))}
                    onSelectedItemsChange={(e, ids) => {
                        dispatch(setUidCurrentFolder(ids))
                    }}
                >
                    {renderTree(tree)}
                </SimpleTreeView>
            </Box>
        </Box>
        <Box className='center-horeca-page-part'>
            <Box sx={{height: '100%', overflowY: 'auto'}} className='center-scroll'>
                <SimpleTreeView
                    slots={{collapseIcon: ExpandMoreIcon, expandIcon: ChevronRightIcon}}
                    defaultExpandedItems={[]}
                    expandedItems={goods}
                    onExpandedItemsChange={(e, ids) => dispatch(setExpandedTree(ids))}
                    onSelectedItemsChange={(e, ids) => {

                    }}
                >
                    {renderGoods(goods)}
                </SimpleTreeView>
            </Box>
        </Box>
        <Box className='center-horeca-page-part'>
        </Box>
        <Box className='center-horeca-page-part'>
        </Box>
    </Box>
}

export default Goods