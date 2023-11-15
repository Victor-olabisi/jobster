import { useSelector } from "react-redux"
// import { useNavigate } from 'react-router-dom'
import {Navigate} from 'react-router-dom'



const ProtectedRouted = ({children}) => {
    const { user } = useSelector((store) => store.user)
    // const navigate = useNavigate()
    if (!user) {
       return <Navigate to='/landing'/>
    }
    return children
}

export default ProtectedRouted