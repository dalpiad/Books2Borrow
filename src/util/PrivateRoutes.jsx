import { Navigate, Outlet } from 'react-router-dom'


const PrivateRoutes = () => {
    let auth = localStorage.getItem('jwt')
        return (
        auth  ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default PrivateRoutes
