import {useEffect} from "react"

export const useTreeExpansionSync = ({
                                         apiRef, rows, expanded, set_expanded, defaultLevel = 2
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
        if (!rows?.length) return
        if (expanded?.length) return
        const initialExpanded = rows
            .filter(row => row.level < defaultLevel)
            .map(row => row.id)
        if (initialExpanded.length) {
            set_expanded(initialExpanded)
        }
    }, [rows])

    useEffect(() => {
        if (!rows?.length || !expanded?.length) return
        const timer = setTimeout(() => {
            expanded.forEach(id => {
                apiRef.current?.setRowChildrenExpansion(id, true)
            })
        }, 0)
        return () => clearTimeout(timer)
    }, [rows, expanded])
}