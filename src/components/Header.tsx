import { NavLink, Link, useNavigate } from "react-router-dom";
// import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'

export default function Header() {

  const authenticated = localStorage.getItem("loggedin")
  const isAuthenticated = Boolean(authenticated);

  const navigate = useNavigate();


  return (
    <header>
        <Link className="site-logo" to="/">#VanLife</Link>
        <nav>
          <NavLink className={({isActive}) => isActive ? "active-link" : undefined} to="/host">Host</NavLink>
          <NavLink className={({isActive}) => isActive ? "active-link" : undefined} to="/about">About</NavLink>
          <NavLink className={({isActive}) => isActive ? "active-link" : undefined} to="/vans">Vans</NavLink>
          
          {isAuthenticated ? (
            <button
              className="link-button logout-button"
              onClick={() => {
                localStorage.removeItem("loggedin");
                navigate("/");
              }}
            >
              Logout
            </button>
          ) : (
            <NavLink className={({isActive}) => isActive ? "active-link" : undefined} to="/login">Login</NavLink>
          )}
          
        </nav>
    </header>
  );
}


