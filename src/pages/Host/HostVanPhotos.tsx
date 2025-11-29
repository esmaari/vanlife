import { useOutletContext } from "react-router-dom"
import type { Van } from "../../types/van"

export default function HostVanPhotos() {
    const { currentVan } = useOutletContext<{ currentVan: Van }>()
    return (
        <img src={currentVan.imageUrl} className="host-van-detail-image" />
    )
}