import {useCallback, useEffect} from "react"
import {
    ReactFlow,
    addEdge,
    Controls,
    MiniMap, useNodesState, useEdgesState, Background
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import {useSetPaymentMap} from "./useSetPaymentMap.js"
import {FilialNode} from "./FilialNode.jsx"
import {KKTNode} from "./KKTNode.jsx"
import {PinpadNode} from "./PinpadNode.jsx"
import {WorkplaceNode} from "./WorkplaceNode.jsx"
import {Box} from "@mui/material"
import {KitchenPointNode} from "./KitchenPointNode.jsx"
import {BilletCheckNode} from "./BilletCheckNode.jsx"

const PageEquipment = () => {

    const payment_map = useSetPaymentMap()
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    useEffect(() => {
        if (payment_map !== null) {
            setNodes(payment_map.nodes)
            setEdges(payment_map.edges)
        }
    }, [payment_map])

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
        [edges],
    )

    return <Box style={{width: '100vw', height: '100vh'}}>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            attributionPosition="top-right"
            nodeTypes={nodeTypes}>
            <Controls/>
            <MiniMap/>
            <Background/>
        </ReactFlow>
    </Box>
}

export default PageEquipment