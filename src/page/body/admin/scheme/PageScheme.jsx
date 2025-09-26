import {useCallback, useEffect} from "react"
import {addEdge, Background, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import {FilialNode} from "./nodes/FilialNode.jsx"
import {KKTNode} from "./nodes/KKTNode.jsx"
import {PinpadNode} from "./nodes/PinpadNode.jsx"
import {WorkplaceNode} from "./nodes/WorkplaceNode.jsx"
import {Box} from "@mui/material"
import {KitchenPointNode} from "./nodes/KitchenPointNode.jsx"
import {BilletCheckNode} from "./nodes/BilletCheckNode.jsx"
import {useDispatch, useSelector} from "react-redux"
import {common_payment_map_get} from "../../../../service/fetch_service.js"

const PageScheme = () => {

    const dispatch = useDispatch()

    const filial = useSelector(state => state.data.filial)
    const param_date_admin = useSelector(state => state.interface.params.param_date_admin)
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    useEffect(() => {
        const fetch = async () => {
            const fetching_result = await dispatch(common_payment_map_get(filial, param_date_admin))
            if (fetching_result.loading) {
                // TODO Крутилка
            } else if (fetching_result.data !== null) {
                setNodes(fetching_result.data.nodes)
                setEdges(fetching_result.data.edges)
            }
        }
        if (filial !== undefined && param_date_admin) {
            fetch()
        }
    }, [dispatch, filial, param_date_admin, setEdges, setNodes])

    const nodeTypes = {
        kkt: KKTNode,
        pinpad: PinpadNode,
        workplace: WorkplaceNode,
        filial: FilialNode,
        kitchen_point: KitchenPointNode,
        billet_check: BilletCheckNode,
    }

    const onConnect = useCallback((params) => setEdges(addEdge(params, edges)), [edges, setEdges],)

    if (filial === undefined) {
        return <Box className='empty-box'>
            Выберите филиал...
        </Box>
    } else {
        return <Box style={{width: '100%', height: 'calc(var(--page-height) - 10px - 10px)'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                attributionPosition="top-right"
                nodeTypes={nodeTypes}
                minZoom={0.4}
                maxZoom={2}>
                <Controls/>
                <MiniMap/>
                <Background/>
            </ReactFlow>
        </Box>
    }
}

export default PageScheme