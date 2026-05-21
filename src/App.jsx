import { useSelector } from 'react-redux'
import { useSetSizeWindow } from './ui/hooks/useSetSizeWindow.js'
import { useReset } from './desktop/frontoffice/hooks/useReset.js'
import { useSetCityAndFilial } from './desktop/frontoffice/hooks/useSetCityAndFilial.js'
import { LicenseInfo } from '@mui/x-license'
import { useInactivityAction } from './ui/hooks/useInactivityAction.js'
import DesktopBackRoutes from './desktop/backoffice/BackRoutes.jsx'
import DesktopFrontRoutes from './desktop/frontoffice/FrontRoutes.jsx'
import MobileBackRoutes from './mobile/backoffice/BackRoutes.jsx'
import MobileFrontRoutes from './mobile/frontoffice/FrontRoutes.jsx'
import AuthRoutes from './mobile/auth/AuthRoutes.jsx'
import { useEffect } from 'react'

LicenseInfo.setLicenseKey(
    '9f3cf429ff65365e1e59d830a6e7c994Tz0xMTgyODQsRT0xNzg3OTYxNTk5MDAwLFM9cHJvLExNPXN1YnNjcmlwdGlvbixQVj1RMy0yMDI0LEtWPTI='
)

function App() {
    useSetCityAndFilial()
    useSetSizeWindow()
    useReset()
    useInactivityAction()

    const center = useSelector((state) => state.auth.center)
    const its_mobile = useSelector((state) => state.interface.its_mobile)
    const uid_user = useSelector((state) => state.auth.uid)

    const goFullscreen = () => {
        const elem = document.documentElement
        if (elem.requestFullscreen) {
            elem.requestFullscreen()
        } else if (elem.webkitRequestFullscreen) {
            // iOS Safari
            elem.webkitRequestFullscreen()
        }
    }

    useEffect(() => {
        goFullscreen()
    }, [])

    if (its_mobile) {
        if (uid_user === null) {
            return <AuthRoutes />
        } else {
            if (center) {
                return <MobileBackRoutes />
            } else {
                return <MobileFrontRoutes />
            }
        }
    } else {
        if (center) {
            return <DesktopBackRoutes />
        } else {
            return <DesktopFrontRoutes />
        }
    }
}

export default App
