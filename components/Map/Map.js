import React from "react";
import { MapContainer as LeafletMap, TileLayer, ZoomControl } from "react-leaflet";
import "./Map.scss";
import { showDataOnMap } from "../../constants/util";
import "leaflet/dist/leaflet.css"

const Map = ({ countries, casesType, center, zoom }) => {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom} zoomControl={false} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}

        <ZoomControl position="bottomright" />
      </LeafletMap>
    </div>
  );
}

export default Map;