import React from "react";
import { MapContainer as LeafletMap, TileLayer, ZoomControl } from "react-leaflet";
import "./Map.scss";
import { showDataOnMap } from "../../constants/util";

const Map = ({ countries, casesType, center, zoom }) => {
  return (
    <div className="map">
      <LeafletMap
        whenCreated={(map) => {
          map.setView(center, zoom);
          map.addLayer(showDataOnMap(countries, casesType));
          map.addControl(new ZoomControl({ position: "bottomright" }));
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </LeafletMap>
    </div>
  );
}

export default Map;

