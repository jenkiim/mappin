import React, { useState, useEffect, useRef } from "react";
import { NewEntry } from "../modules/NewEntryInput.js";

import "../../utilities.css";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoidHlqaWFuZyIsImEiOiJjbHJwYXRnbnowM3J3MmxvZGkxMnVtOXcyIn0.0SV7DXnN3Kpg9iZ2MwYxkg";

const Map = () => {
  const [entries, setEntries] = useState([]);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  const addNewEntry = (entryObj) => {
    setEntries([entryObj].concat(entries));
  };
  return (
    <div>
      {/* <NewEntry addNewEntry={addNewEntry} /> */}
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
