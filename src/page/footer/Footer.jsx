import {useSelector} from "react-redux"

const Footer = () => {

    const wp = useSelector(state => state.interface.search_params.wp)

    return (
        <footer id="footer">
            <div style={{fontSize: '14px', fontWeight: '500', color: '#8B919B', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div>© «МИРАЖ СИНЕМА».</div>
                <div>{wp}</div>
            </div>
        </footer>
    )
}

export default Footer