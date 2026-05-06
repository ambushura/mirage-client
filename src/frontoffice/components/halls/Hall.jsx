import { Box } from '@mui/material'
import { addEdge, Controls, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'
import { useCallback, useEffect, useState } from 'react'
import { Place } from './nodes/Place.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { cinema_place_block, cinema_position_add, horeca_table_add } from '../../../service/fetch_service.js'
import RowLabel from './nodes/RowLabel.jsx'
import Screen from './nodes/Screen.jsx'

const HallMap = (props) => {
    const dispatch = useDispatch()
    const uid_user = useSelector((state) => state.auth.uid)
    const current_page = useSelector((state) => state.interface.current_page)
    const mode = useSelector((state) => state.halls.mode)

    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [ready, setReady] = useState(false)

    const onConnect = useCallback((params) => setEdges(addEdge(params, edges)), [edges])

    const { its_second_screen, kiosk } = useSelector((state) => state.interface)

    const { fitView } = useReactFlow()

    useEffect(() => {
        if (!props.hall) return
        setNodes(props.hall.nodes)
        setEdges(props.hall.edges)
        requestAnimationFrame(() => {
            fitView({ padding: 0.2 })
            setReady(true)
        })
    }, [props.hall])

    useEffect(() => {
        if (!props.booking || !props.hall) return
        setNodes((nds) =>
            nds.map((node) => {
                const bookingForNode = props.booking.find((b) => b.uid_place === node.id)
                if (bookingForNode) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            state: bookingForNode.state,
                            source: bookingForNode.source,
                            city: props.city,
                            filial: props.filial,
                        },
                    }
                }
                const old_place = props.hall.nodes.find((n) => n.id === node.id)
                if (old_place) {
                    return {
                        ...node,
                        data: {
                            ...old_place.data,
                            city: props.city,
                            filial: props.filial,
                        },
                    }
                }
                return node
            })
        )
    }, [props.booking, props.hall, props.city, props.filial])

    const nodeTypes = {
        place: Place,
        row_label: RowLabel,
        screen: Screen,
        table: Place,
    }

    const handleNodeClick = (node) => {
        if (its_second_screen) return
        if (node.type === 'place') {
            if (current_page === 'seance') {
                if (props.set_time_remaining !== undefined) {
                    props.set_time_remaining(100)
                }
                dispatch(cinema_position_add(props.city, props.filial, props.seance.uid, props.pre_order.uid, node.id, props.pre_order.ver))
            } else {
                if (mode === 'block') {
                    dispatch(cinema_place_block(props.filial, props.hall, node.id))
                }
            }
        } else if (node.type === 'table') {
            dispatch(horeca_table_add(props.filial, props.horder.uid, props.hall.uid, node.id, props.horder.ver))
        }
    }

    return (
        <Box
            style={{
                width: '100%',
                height: '100%',
                opacity: ready ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
            }}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                attributionPosition="top-left"
                nodeTypes={nodeTypes}
                proOptions={{ hideAttribution: true }}
                nodesDraggable={false}
                onNodeClick={(event, node) => handleNodeClick(node)}
                panOnDrag={uid_user !== null}
                panOnScroll={uid_user !== null}
                zoomOnScroll={uid_user !== null}
                zoomOnPinch={uid_user !== null}
                zoomOnDoubleClick={uid_user !== null}
                style={{ background: 'transparent' }}
            >
                {uid_user !== null && current_page !== 'second_screen' ? <Controls /> : null}
            </ReactFlow>
        </Box>
    )
}

const HallWithProvider = (props) => (
    <ReactFlowProvider>
        <HallMap {...props} />
    </ReactFlowProvider>
)

export default HallWithProvider
