import {useSelector} from "react-redux"

const Footer = () => {

    const wp = useSelector(state => state.interface.wp)

    return <footer id="footer" className='glass-effect'>
        <div>© «МИРАЖ СИНЕМА» {new Date().getFullYear()}</div>
        <div>{wp}</div>
    </footer>
}

export default Footer