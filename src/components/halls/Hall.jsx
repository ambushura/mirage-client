import {Box} from "@mui/material"
import {addEdge, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState} from "@xyflow/react"
import {useCallback, useEffect} from "react"
import {Place} from "./nodes/Place.jsx"
import {useDispatch, useSelector} from "react-redux"
import {cinema_place_block, cinema_position_add} from "../../service/fetch_service.js"

const Hall = (props) => {

    const dispatch = useDispatch()
    const uid_user = useSelector(state => state.auth.uid)
    const wp = useSelector(state => state.interface.wp)
    const current_page = useSelector(state => state.interface.current_page)
    const mode = useSelector(state => state.halls.mode)

    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    const onConnect = useCallback(
        (params) => setEdges(addEdge(params, edges)),
        [edges],
    )

    useEffect(() => {
        if (props.hall !== null) {
            const nodesWithBooking = props.hall.nodes.map(node => {
                const bookingForNode = props.booking.find(b => b.uid_place === node.id) || null
                const updated_data = {
                    ...node.data,
                    state: bookingForNode?.state ?? node.data.state,
                    city: props.city,
                    filial: props.filial,
                }
                return {
                    ...node,
                    data: updated_data,
                }
            })
            setNodes(nodesWithBooking)
            setEdges(props.hall.edges)
        }
    }, [props.hall, props.booking, setEdges, setNodes, props.city, props.filial])

    const nodeTypes = {
        "place": Place,
    }

    const handleNodeClick = (node) => {
        if (current_page === 'seance') {
            if (props.set_time_remaining !== undefined) {
                props.set_time_remaining(100)
            }
            dispatch(cinema_position_add(props.city, props.filial, wp, props.seance.uid, props.pre_order.uid, node.id, props.pre_order.ver))
        } else {
            if (mode === 'block') {
                dispatch(cinema_place_block(props.filial, wp, props.hall, node.id))
            }
        }
    }

    return (
        <Box style={{width: `${props.width}px`, height: `100%`}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                attributionPosition="top-left"
                nodeTypes={nodeTypes}
                proOptions={{hideAttribution: true}}
                nodesDraggable={false}
                onNodeClick={(event, node) => {
                    handleNodeClick(node)
                }}
                panOnDrag={uid_user !== null}
                panOnScroll={uid_user !== null}
                zoomOnScroll={uid_user !== null}
                zoomOnPinch={uid_user !== null}
                zoomOnDoubleClick={uid_user !== null}>
                {uid_user !== null ? <Controls/> : null}
            </ReactFlow>
        </Box>
    )
}

export default Hall