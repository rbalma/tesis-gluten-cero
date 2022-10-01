import { Marker, Popup } from "react-leaflet";
import { IconLocation } from "./IconLocation";
import Foto from "@/assets/img/patio-olmos.jpg";

import "./map.css";


export const Markers = () => {
  return (
    <Marker
    position={{ lat: "-31.41967923486574", lng: "-64.18821438928289" }}
    icon={IconLocation}
  >
    <Popup className="request-popup">
      <div style={popupContent}>
        <img
          src={Foto}
          width="100%"
          alt="Patio Olmos"
        />
        <div style={popupHead}>Patio Olmos Shopping</div>
        <div style={popupText}>Av. Vélez Sarsfield 361</div>
        <div style={popupText}>(0351) 4315478</div>
      </div>
    </Popup>
  </Marker>
  )
}

const popupContent = {
  textAlign: "center",
  height: "auto",
};
const popupHead = {
  fontWeight: "bold",
  fontSize: "18px",
  textAlign: "left",
};

const popupText = {
  fontSize: "14px",
  textAlign: "left",
};
