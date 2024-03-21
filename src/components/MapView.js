import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

const markers = [
  {
    geocode: [18.90279531578539, -99.16414629985601],
    popUp: "Centro Cristiano Rey de Gloria",
  },
  {
    geocode: [18.9141881, -99.2114985],
    popUp: "La Hermosa",
  },
  {
    geocode: [18.90263, -99.17367],
    popUp: "Iglesia Gracia y Verdad",
  },
  {
    geocode: [18.902236357891827 , -99.1657631542367],
    popUp: "La Casa del Padre",
  },  
  {
    geocode: [18.916725313234714 , -99.15992382687163],
    popUp: "Iglesia Puerta del Cielo",
  }, 
  {
    geocode: [18.886947750721493 , -99.16031406616642],
    popUp: "Iglesia Altar de Restauración",
  }, 
  {
    geocode: [18.89196 , -99.15720],
    popUp: "Comunidad Betel",
  }, 
  {
    geocode: [18.886356646138562, -99.17467661920546],
    popUp: "Iglesia Cristiana Amor y Vida",
  },   
  {
    geocode: [18.89589, -99.16090],
    popUp: "Armonía  Familiar Cristiana",
  },           
];

const customIcon = new Icon({
  iconUrl: require("../assets/gps3.png"),
  iconSize: [38, 38],
});

const MapView = () => {
  return (
    <MapContainer
      center={[18.89600428000013, -99.18103264971516]}
      zoom={14}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup>
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapView;
