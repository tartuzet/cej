import React, {useState,useEffect}  from "react";
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
            <Popup> 
            <div align='center'>
              <p><strong>{place.popUp}</strong></p>
              <img src={place.logoName} height="150px" width="150px"/>
              <p>{place.address}</p>
            </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapView;
