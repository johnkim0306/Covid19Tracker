import React from "react";
import { MapContainer as LeafletMap, TileLayer, GeoJSON, ZoomControl } from "react-leaflet";
import "./Map.scss";
import { showDataOnMap } from "../../constants/util";

const Map = ({ countries, casesType, center, zoom }) => {
  return (
    <div className="map">
      <LeafletMap
        center={center}
        zoom={zoom}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON
          data={showDataOnMap(countries, casesType)}
        />
        <ZoomControl position="bottomright" />
      </LeafletMap>
    </div>
  );
}

export default Map;