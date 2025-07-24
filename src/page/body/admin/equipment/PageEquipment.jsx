import {useCallback, useEffect, useState} from "react"
import {
    ReactFlow,
    addEdge,
    Controls,
    MiniMap, useNodesState, getIncomers, getOutgoers, getConnectedEdges, useEdgesState, Background
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import {useSetPaymentMap} from "./useSetPaymentMap.js"
import {FilialNode} from "./FilialNode.jsx"
import {KKTNode} from "./KKTNode.jsx"
import {PinpadNode} from "./PinpadNode.jsx"
import {WorkplaceNode} from "./WorkplaceNode.jsx"

const PageEquipment = () => {

    const payment_map = useSetPaymentMap()
    const [initial_nodes, set_initial_nodes] = useState([])
    const [initial_edges, set_initial_edges] = useState([])

    useEffect(() => {
        if (payment_map !== null) {
            set_initial_nodes(payment_map.nodes)
            set_initial_edges(payment_map.edges)
        }
    }, [payment_map])

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
    }

    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    const onConnect = useCallback(
        (params) => setEdges(addEdge(params, edges)),
        [edges],
    )

    const onNodesDelete = useCallback(
        (deleted) => {
            setEdges(
                deleted.reduce((acc, node) => {

                    const incomers = getIncomers(node, nodes, edges);
                    const outgoers = getOutgoers(node, nodes, edges);
                    const connectedEdges = getConnectedEdges([node], edges);

                    const remainingEdges = acc.filter(
                        (edge) => !connectedEdges.includes(edge),
                    )

                    const createdEdges = incomers.flatMap(({id: source}) =>
                        outgoers.map(({id: target}) => ({
                            id: `${source}->${target}`,
                            source,
                            target,
                        })),
                    )

                    return [...remainingEdges, ...createdEdges];
                }, edges),
            )
        },
        [nodes, edges],
    )

    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onNodesDelete={onNodesDelete}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                attributionPosition="top-right"
                nodeTypes={nodeTypes}
            >
                <Controls/>
                <MiniMap/>
                <Background/>
            </ReactFlow>
        </div>
    )
}

export default PageEquipment