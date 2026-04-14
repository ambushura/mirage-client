import {useEffect} from 'react'
import {Box} from "@mui/material"
import {SimpleTreeView, TreeItem} from '@mui/x-tree-view'
import {useDispatch, useSelector} from "react-redux"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {center_horeca_goods_get, center_horeca_goods_recipes_get} from "../../../service/fetch_service.js"
import {
    setExpandedRecipesTree,
    setExpandedTree,
    setGoodsRecipes,
    setUidCurrentFolder,
    setUidCurrentGood
} from "../../../redux/center/centerHorecaReducer.js"

const Goods = () => {

    const dispatch = useDispatch()

    const {root_filial} = useSelector(state => state.center)
    const {
        // Папки
        tree, expanded_tree, uid_current_folder,

        // Товары
        goods,

        // Номенклатура
        goods_recipes, goods_recipes_expanded, uid_current_good
    } = useSelector(state => state.center_horeca)

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

    const renderRecipes = (nodes) => nodes.map(node => <TreeItem
        key={node.id}
        itemId={node.id}
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
            {!node.children?.length ? <><span
                style={{
                    marginRight: '4px', fontWeight: 'bold'
                }}>{node.period}</span><span>{node.name}</span></> : node.name}
        </Box>}
    >
        {node.children?.length > 0 && renderRecipes(node.children)}
    </TreeItem>)

    useEffect(() => {
        const fetch = async () => {
            await dispatch(center_horeca_goods_get(root_filial, uid_current_folder, 0))
        }
        if (uid_current_folder !== null) {
            fetch()
        }
    }, [dispatch, root_filial, uid_current_folder])


    useEffect(() => {
        const fetch = async () => {
            await dispatch(center_horeca_goods_recipes_get(root_filial, uid_current_good, 0))
        }
        if (uid_current_folder !== null && uid_current_good !== null) {
            fetch()
        }
    }, [dispatch, root_filial, uid_current_folder, uid_current_good])

    const getAllIds = (nodes) => nodes.flatMap(node => [node.id, ...(node.children?.length > 0 ? getAllIds(node.children) : [])])

    useEffect(() => {
        dispatch(setExpandedRecipesTree(getAllIds(goods_recipes)))
    }, [goods_recipes])

    return <Box className='center-horeca-page' sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        <Box className='center-horeca-page-part'>
            <Box sx={{height: '100%', overflowY: 'auto'}} className='center-scroll'>
                <SimpleTreeView
                    slots={{collapseIcon: ExpandMoreIcon, expandIcon: ChevronRightIcon}}
                    defaultExpandedItems={[]}
                    expandedItems={expanded_tree}
                    onExpandedItemsChange={(e, id) => dispatch(setExpandedTree(id))}
                    onSelectedItemsChange={(e, id) => {
                        dispatch(setGoodsRecipes([]))
                        dispatch(setUidCurrentGood(null))
                        dispatch(setUidCurrentFolder(id))
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
                    onExpandedItemsChange={(e, id) => dispatch(setExpandedTree(id))}
                    onSelectedItemsChange={(e, id) => {
                        dispatch(setGoodsRecipes([]))
                        dispatch(setUidCurrentGood(id))
                    }}
                >
                    {renderGoods(goods)}
                </SimpleTreeView>
            </Box>
        </Box>
        <Box className='center-horeca-page-part'>
            <Box sx={{height: '100%', overflowY: 'auto'}} className='center-scroll'>
                <SimpleTreeView
                    slots={{collapseIcon: ExpandMoreIcon, expandIcon: ChevronRightIcon}}
                    defaultExpandedItems={[]}
                    expandedItems={goods_recipes_expanded}
                    onExpandedItemsChange={(e, id) => dispatch(setExpandedRecipesTree(id))}
                    onSelectedItemsChange={(e, id) => {

                    }}
                >
                    {renderRecipes(goods_recipes)}
                </SimpleTreeView>
            </Box>
        </Box>
        <Box className='center-horeca-page-part'>
        </Box>
    </Box>
}

export default Goods