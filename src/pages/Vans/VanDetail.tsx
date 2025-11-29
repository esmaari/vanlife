import React from "react"
import { useParams, Link, useLocation } from "react-router-dom";
import type { Van } from "../../types/van";
import { getVans } from "../../api";

export default function VanDetail () {

    const params = useParams();
    const { id } = params;
    const [van, setVan] = React.useState<Van | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const location = useLocation();
    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    React.useEffect(() => {
        if (!id) {
            setError("Van id is required");
            return;
        }

        const vanId = id;

        async function fetchVans() {
            try {
                const vanData = await getVans(vanId);
                setVan(vanData);
            } catch (err) {
                setError((err instanceof Error ? err.message : String(err)));
            }
        }
        fetchVans();
    }, [id]);

    if (error) {
        return <h2 className="error-message">{error}</h2>;
    }   

    if (!van) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
        <Link
                to={`../${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>


        <div className="van-detail-container">
             
            <div className="van-detail">
                <img src={van.imageUrl} className="van-card-image" />
                {van.thanks ? (
                    <p
                        className="van-photo-credit"
                        dangerouslySetInnerHTML={{ __html: van.thanks }}
                    />
                ) : null}
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
                <h2>{van.name}</h2>
                <p className="van-price"><span>${van.price}</span>/day</p>
                <p>{van.description}</p>
                <button className="link-button">Rent this van</button>
            </div>
            
        </div>
        </>
    )
}   
