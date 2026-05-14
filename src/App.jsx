import { useSelector } from 'react-redux'
import { useSetSizeWindow } from './ui/hooks/useSetSizeWindow.js'
import { useReset } from './frontoffice/hooks/useReset.js'
import { useSetCityAndFilial } from './frontoffice/hooks/useSetCityAndFilial.js'
import { LicenseInfo } from '@mui/x-license'
import { useInactivityAction } from './ui/hooks/useInactivityAction.js'
import BackOffice from './backoffice/BackOffice.jsx'
import FrontOffice from './frontoffice/FrontOffice.jsx'
import FrontMobile from './frontmobile/FrontMobile.jsx'
import BackMobile from './backmobile/BackMobile.jsx'

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

    if (its_mobile) {
        if (center) {
            return <BackMobile />
        } else {
            return <FrontMobile />
        }
    } else {
        if (center) {
            return <BackOffice />
        } else {
            return <FrontOffice />
        }
    }
}

export default App
