import { Outlet, Navigate, useLocation} from "react-router-dom";    

export default function AuthRequired() {
   // const isAuthenticated = Boolean(localStorage.getItem("authToken"));

    const location = useLocation()

    const authenticated = localStorage.getItem("loggedin")
    const isAuthenticated = Boolean(authenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{message: "You must login first", from: location.pathname}} replace />;
    }

    return <Outlet />;
}