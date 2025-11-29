import React from "react";
import { useParams } from "react-router-dom";
import type { Van } from "../../types/van";
import { Link, NavLink, Outlet } from "react-router-dom";
import { getHostVans } from "../../api";

export default function HostVanDetail() {

  const params = useParams();
  const { id } = params;

  const [currentVan, setCurrentVan] = React.useState<Van | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

    const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
}

  React.useEffect(() => {
    if (!id) {
      setError("Van id is required");
      setCurrentVan(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const vanId = id;

    async function loadVan() {
      try {
        const van = await getHostVans(vanId);
        setCurrentVan(van);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        setCurrentVan(null);
      } finally {
        setLoading(false);
      }
    }

    loadVan();
  }, [id]);

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error || !currentVan) {
        return <h1 className="error-message">{error ?? "Van not found"}</h1>
    }

    return (
  
        <section>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>

            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={currentVan.imageUrl} />
                    <div className="host-van-detail-info-text">
                        <i
                            className={`van-type van-type-${currentVan.type}`}
                        >
                            {currentVan.type}
                        </i>
                        <h3>{currentVan.name}</h3>
                        <h4>${currentVan.price}/day</h4>
                    </div>
                </div>
            

            <nav className="host-van-detail-nav">
                <NavLink
                    to="."
                    end
                    style={({isActive}) => isActive ? activeStyles : undefined}
                >
                    Details
                </NavLink>
                <NavLink
                    to="pricing"
                    style={({isActive}) => isActive ? activeStyles : undefined}
                >
                    Pricing
                </NavLink>
                <NavLink
                    to="photos"
                    style={({isActive}) => isActive ? activeStyles : undefined}
                >
                    Photos
                </NavLink>
            </nav>

            <Outlet context={{currentVan}} />
</div>

        </section>
  
    )
}
