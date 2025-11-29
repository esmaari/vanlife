import React from "react"
import type { Van } from "../../types/van";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";

export default function Vans() {

    const [vans, setVans] = React.useState<Van[]>([])

    const [searchParams, setSearchParams] = useSearchParams();
    const searchType = searchParams.get("type");

    const displayedVans = searchType 
    ? vans.filter((van: Van) => van.type.toLowerCase() === searchType.toLowerCase()) 
    : vans;
  
    React.useEffect(() => {
       async function fetchVans() {
            try {
                const vansData = await getVans();
                setVans(vansData);
            } catch (err: unknown ) {
                if (err instanceof Error) {
                    console.log(err.message);       
                } else {
                    console.log("An unknown error occurred");
                }
            }
        }
        fetchVans();
    }, []);
    
    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>

            <div className="van-list-filter-buttons">
                <button
                    onClick={() => setSearchParams({type: "simple"})}
                    className={
                        `van-type simple ${searchType === "simple" ? "selected" : ""}`}
                        >
                    Simple
                </button>
                <button
                    onClick={() => setSearchParams({type: "luxury"})}
                    className={
                        `van-type luxury ${searchType === "luxury" ? "selected" : ""}`}     
                    >
                    Luxury
                </button>
                <button
                    onClick={() => setSearchParams({type: "rugged"})}
                    className={
                        `van-type rugged ${searchType === "rugged" ? "selected" : ""}`} 
                    >
                    Rugged
                </button>
                {   searchType
                    ?   <button
                        onClick={() => setSearchParams({})}
                        className="van-type clear-filters"
                    >
                        Clear filters
                    </button>   
                    : null
                }
            </div>
          
            <div className="van-list">
                {
                    displayedVans.map((van: Van) => {
                        return (
                           
                            <div key={van.id} className="van-tile">
                                <Link
                                    to={`/vans/${van.id}`}
                                    state={{search: `?${searchParams.toString()}`, type: searchType}}
                                >
                                    <img src={van.imageUrl} className="van-card-image" />
                                    {
                                        van.thanks ? (
                                            <p
                                                className="van-photo-credit"
                                                dangerouslySetInnerHTML={{ __html: van.thanks }}
                                            />
                                        ) : null
                                    }
                                    <div className="van-info">
                                        <h3>{van.name}</h3>
                                        <p>${van.price}<span>/day</span></p>
                                    </div>
                                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                                </Link>                
                            </div>
                        )
                    })
                }
        </div>
        </div>
    )
};
   
