import {useEffect} from "react"

export const useTreeExpansionSync = ({
                                         apiRef, rows, expanded, set_expanded
                                     }) => {

    useEffect(() => {
        if (!apiRef?.current) return
        const unsubscribe = apiRef.current.subscribeEvent("rowExpansionChange", ({id, childrenExpanded}) => {
            let next = [...expanded]
            if (childrenExpanded) {
                if (!next.includes(id)) {
                    next.push(id)
                }
            } else {
                next = next.filter(x => x !== id)
            }
            set_expanded(next)
        })
        return () => unsubscribe?.()
    }, [apiRef, expanded])

    useEffect(() => {
        if (rows === undefined || expanded === undefined || !rows.length || !expanded.length) return
        const timer = setTimeout(() => {
            expanded.forEach(id => {
                apiRef.current?.setRowChildrenExpansion(id, true)
            })
        }, 0)
        return () => clearTimeout(timer)
    }, [rows, expanded])
}