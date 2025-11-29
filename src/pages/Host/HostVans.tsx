import React from "react";
import type { Van } from "../../types/van";
import { Link } from "react-router-dom";
import { getHostVans } from "../../api";

export default function HostVans() {
  const [vans, setVans] = React.useState<Van[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadVans() {
      try {
        const hostVans = await getHostVans();
        setVans(hostVans);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }

    loadVans();
  }, []);

  return (
    <div>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        {error && <p className="error-message">{error}</p>}
        {!error && loading && <p>Loading vans...</p>}
        {!error && !loading &&
          vans.map((van: Van) => (
            <Link
              key={van.id}
              to={`/host/vans/${van.id}`}
              className="host-van-link-wrapper"
            >
              <div className="host-van-single">
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                  <h3>{van.name}</h3>
                  <p>${van.price}/day</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
