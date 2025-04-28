import {useSelector} from "react-redux"

const Footer = () => {

    const wp = useSelector(state => state.interface.wp)

    return (
        <footer id="footer">
            <div>© «МИРАЖ СИНЕМА».</div>
            <div>{wp}</div>
        </footer>
    )
}

export default Footer