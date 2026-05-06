import {useEffect, useMemo, useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'

export function useCatalogMaps(rows, type) {
    const [catalogMap, setCatalogMap] = useState(() => new Map())
    const {wp, kiosk, version} = useSelector((state) => state.interface)
    const {root_filial, center} = useSelector((state) => state.center)
    const token = localStorage.getItem('token')
    const headers = useMemo(
        () => ({
            Authorization: token,
            uid_filial: root_filial?.uid ?? '',
            wp,
            kiosk: String(kiosk),
            version,
            center: String(center),
        }),
        [token, root_filial, wp, kiosk, version, center]
    )

    useEffect(() => {
        if (!rows?.length) return

        const missingIds = rows.map((r) => r.uid_good).filter((id) => id && !catalogMap.has(id))

        if (!missingIds.length) return

        const load = async () => {
            try {
                const res = await axios.get(
                    `http://${root_filial.ip}:${root_filial.port}/api/catalog/load`,
                    {
                        params: {
                            type: type,
                            value: missingIds,
                        },
                        headers,
                    }
                )

                const data = res.data

                setCatalogMap((prev) => {
                    const next = new Map(prev)
                    for (const item of data) {
                        next.set(item.uid, item)
                    }
                    return next
                })
            } catch (e) {
                console.error(e)
            }
        }

        load()
    }, [rows, root_filial, headers, catalogMap])

    return catalogMap
}
