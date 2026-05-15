import { useSelector } from 'react-redux'
import { useSetSizeWindow } from './ui/hooks/useSetSizeWindow.js'
import { useReset } from './desktop/frontoffice/hooks/useReset.js'
import { useSetCityAndFilial } from './desktop/frontoffice/hooks/useSetCityAndFilial.js'
import { LicenseInfo } from '@mui/x-license'
import { useInactivityAction } from './ui/hooks/useInactivityAction.js'
import BackRoutes from './desktop/backoffice/BackRoutes.jsx'
import FrontRoutes from './desktop/frontoffice/FrontRoutes.jsx'
import BackMobile from './mobile/backoffice/BackMobile.jsx'
import Auth from './mobile/auth/Auth.jsx'
import AuthInterfaceSwitch from './mobile/auth/AuthInterfaceSwitch.jsx'
import { Box } from '@mui/material'

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

    if (its_mobile) {
        if (uid_user === null) {
            return (
                <Box className="mobile">
                    <Auth />
                </Box>
            )
        } else {
            if (center) {
                return (
                    <Box className="mobile">
                        <BackMobile />
                    </Box>
                )
            } else {
                return (
                    <Box className="mobile">
                        <AuthInterfaceSwitch />
                    </Box>
                )
            }
        }
    } else {
        if (center) {
            return <BackRoutes />
        } else {
            return <FrontRoutes />
        }
    }
}

export default App
