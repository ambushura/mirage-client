import React from 'react'
import {Box} from "@mui/material"
import {SimpleTreeView, TreeItem} from '@mui/x-tree-view'
import {useDispatch, useSelector} from "react-redux"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {setExpendedTree} from "../../../redux/centerReducer.js"

const Goods = () => {

    const dispatch = useDispatch()

    const {tree, expanded_tree} = useSelector(state => state.center)

    const renderTree = (nodes) => nodes.map(node => <TreeItem
        key={node.uid}
        itemId={node.uid}
        label={<Box
            sx={{
                userSelect: 'text', cursor: 'text', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}
            title={node.name}
            onClick={(e) => e.stopPropagation()}
        >
            {node.name}
        </Box>}
    >
        {node.children?.length > 0 && renderTree(node.children)}
    </TreeItem>)

    return <Box sx={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', maxHeight: 'calc(100vh - var(--center-submenu-height))'
    }}>
        <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', padding: '0 5px'}}>
            <Box sx={{
                paddingRight: '5px',
                width: 400,
                maxWidth: 400,
                height: 'calc(100vh - var(--center-submenu-height))',
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
                >
                    {renderTree(tree)}
                </SimpleTreeView>
            </Box>
        </Box>
        <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', padding: '0 5px'}}>
            <Box>Номенклатура</Box>
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