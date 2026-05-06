import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view'
import { useDispatch, useSelector } from 'react-redux'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { center_horeca_goods_get, center_horeca_goods_recipes_get } from '../../../../service/fetch_service.js'
import {
    setExpandedRecipesTree,
    setExpandedTree,
    setGoodsRecipes,
    setUidCurrentFolder,
    setUidCurrentGood,
} from '../../../../redux/center/centerHorecaReducer.js'

const treeSlots = { collapseIcon: ExpandMoreIcon, expandIcon: ChevronRightIcon }

const TreeLabel = ({ title, children }) => (
    <Box
        sx={{
            userSelect: 'text',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: 100,
        }}
        title={title}
    >
        {children}
    </Box>
)

const getAllIds = (nodes) => nodes.flatMap(({ id, children }) => [id, ...(children?.length ? getAllIds(children) : [])])

const Goods = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { root_filial } = useSelector((state) => state.center)
    const { tree, expanded_tree, uid_current_folder, goods, goods_recipes, goods_recipes_expanded, uid_current_good } = useSelector(
        (state) => state.center_horeca
    )

    const renderTree = (nodes) =>
        nodes.map(({ uid, name, children }) => (
            <TreeItem key={uid} itemId={uid} label={<TreeLabel title={name}>{name}</TreeLabel>}>
                {children?.length > 0 && renderTree(children)}
            </TreeItem>
        ))

    const renderGoods = (nodes) =>
        nodes.map(({ uid, name, unit_name }) => (
            <TreeItem
                key={uid}
                itemId={uid}
                label={
                    <TreeLabel title={name}>
                        {unit_name && (
                            <span
                                style={{
                                    fontSize: '90%',
                                    backgroundColor: '#c1c1c1',
                                    padding: ' 0 4px',
                                    marginRight: '4px',
                                }}
                            >
                                {unit_name}
                            </span>
                        )}
                        {name}
                    </TreeLabel>
                }
            />
        ))

    const renderRecipes = (nodes) =>
        nodes.map(({ id, name, period, children }) => (
            <TreeItem
                key={id}
                itemId={id}
                label={
                    <TreeLabel title={name}>
                        {children?.length ? (
                            name
                        ) : (
                            <>
                                <span
                                    style={{
                                        backgroundColor: '#c1c1c1',
                                        padding: ' 0 4px',
                                        marginRight: '4px',
                                    }}
                                >
                                    {period}
                                </span>
                                <span>{name}</span>
                            </>
                        )}
                    </TreeLabel>
                }
            >
                {children?.length > 0 && renderRecipes(children)}
            </TreeItem>
        ))

    useEffect(() => {
        if (uid_current_folder !== null) {
            dispatch(center_horeca_goods_get(root_filial, uid_current_folder, 0))
        }
    }, [dispatch, root_filial, uid_current_folder])

    useEffect(() => {
        if (uid_current_folder !== null && uid_current_good !== null) {
            dispatch(center_horeca_goods_recipes_get(root_filial, uid_current_good, 0))
        }
    }, [dispatch, root_filial, uid_current_folder, uid_current_good])

    useEffect(() => {
        dispatch(setExpandedRecipesTree(getAllIds(goods_recipes)))
    }, [dispatch, goods_recipes])

    const findNode = (nodes, id) =>
        nodes.reduce((found, node) => found || (node.id === id ? node : findNode(node.children || [], id)), null)

    return (
        <Box className="center-horeca-page" sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {[
                {
                    title: 'Папки',
                    expandedItems: expanded_tree,
                    onExpandedItemsChange: (e, id) => dispatch(setExpandedTree(id)),
                    onSelectedItemsChange: (e, id) => {
                        dispatch(setGoodsRecipes([]))
                        dispatch(setUidCurrentGood(null))
                        dispatch(setUidCurrentFolder(id))
                    },
                    render: renderTree(tree),
                },
                {
                    title: 'Номенклатура',
                    expandedItems: goods,
                    onExpandedItemsChange: (e, id) => dispatch(setExpandedTree(id)),
                    onSelectedItemsChange: (e, id) => {
                        dispatch(setGoodsRecipes([]))
                        dispatch(setUidCurrentGood(id))
                    },
                    render: renderGoods(goods),
                },
                {
                    title: 'Калькуляции',
                    expandedItems: goods_recipes_expanded,
                    onExpandedItemsChange: (e, id) => dispatch(setExpandedRecipesTree(id)),
                    onSelectedItemsChange: (e, id) => {
                        const node = findNode(goods_recipes, id)
                        if (!node?.children) {
                            navigate(`/center/horeca/goods/recipes/${node?.ref}`)
                        }
                    },
                    render: renderRecipes(goods_recipes),
                },
            ].map(({ title, render, ...treeProps }) => (
                <Box key={title} className="center-horeca-page-part">
                    <Box className="center-horeca-page-part-title">{title}</Box>
                    <Box sx={{ height: 'calc(100% - 30px)', overflowY: 'auto' }} className="center-scroll">
                        <SimpleTreeView slots={treeSlots} defaultExpandedItems={[]} {...treeProps}>
                            {render}
                        </SimpleTreeView>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default Goods
