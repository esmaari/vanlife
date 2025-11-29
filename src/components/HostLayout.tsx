import { Outlet, NavLink } from "react-router-dom";

export default function HostLayout() {
  return (
    <>
         <nav className="host-nav">
            <NavLink end className={({isActive}) => isActive ? "active-link" : undefined} to=".">Dashboard</NavLink>
            <NavLink className={({isActive}) => isActive ? "active-link" : undefined} to="income">Income</NavLink>
            <NavLink className={({isActive}) => isActive ? "active-link" : undefined} to="vans">Vans</NavLink>
            <NavLink className={({isActive}) => isActive ? "active-link" : undefined} to="reviews">Reviews</NavLink>
        </nav>
      <Outlet />
    </>
 
  );
} 