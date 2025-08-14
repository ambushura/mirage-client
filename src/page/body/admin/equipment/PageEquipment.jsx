import {useCallback, useEffect} from "react"
import {
    ReactFlow,
    addEdge,
    Controls,
    MiniMap, useNodesState, useEdgesState, Background
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import {useSetPaymentMap} from "./useSetPaymentMap.js"
import {FilialNode} from "./nodes/FilialNode.jsx"
import {KKTNode} from "./nodes/KKTNode.jsx"
import {PinpadNode} from "./nodes/PinpadNode.jsx"
import {WorkplaceNode} from "./nodes/WorkplaceNode.jsx"
import {Box} from "@mui/material"
import {KitchenPointNode} from "./nodes/KitchenPointNode.jsx"
import {BilletCheckNode} from "./nodes/BilletCheckNode.jsx"
import {useSelector} from "react-redux"

const PageEquipment = () => {

    const filial = useSelector(state => state.data.filial)
    const payment_map = useSetPaymentMap()
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    useEffect(() => {
        if (payment_map !== null) {
            setNodes(payment_map.nodes)
            setEdges(payment_map.edges)
        }
    }, [payment_map, setEdges, setNodes])

    const nodeTypes = {
        kkt: KKTNode,
        pinpad: PinpadNode,
        workplace: WorkplaceNode,
        filial: FilialNode,
        kitchen_point: KitchenPointNode,
        billet_check: BilletCheckNode,
    }

    const onConnect = useCallback(
        (params) => setEdges(addEdge(params, edges)),
        [edges, setEdges],
    )

    if (filial === undefined) {
        return <Box className='empty-box'>
            Выберите филиал...
        </Box>
    } else {
        return <Box style={{width: '100vw', height: '100vh'}}>
            {payment_map !== null ?
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
                : null
            }
        </Box>
    }
}

export default PageEquipment