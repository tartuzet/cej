import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import data from '../api/data.json';


const customIcon = new Icon({
  iconUrl: require("../assets/gps.png"),
  iconSize: [38, 38],
});

const MapView = () => {
  
  return (
    <MapContainer
      center={[18.899597492013648, -99.16432595022036]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

        {data.places.map((place, i) => (
          <Marker key={i} position={place.geocode} icon={customIcon}>
            <Popup maxHeight={200} maxWidth={200}> 
            <div align='center'>
              <p><strong>{place.popUp}</strong></p>
              <p>{place.address} <a href={"tel:"+place.phone}>{place.phone}</a></p>

              <img alt="" src={place.logoName} height="100px" width="100px"/>
            </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapView;
