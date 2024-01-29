import React, { useState, useEffect, useRef } from "react";
import { get, post } from "../../utilities";

import "./Map.css";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoidHlqaWFuZyIsImEiOiJjbHJwYXRnbnowM3J3MmxvZGkxMnVtOXcyIn0.0SV7DXnN3Kpg9iZ2MwYxkg";

const Map = (props) => {
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

  // load all existing pins to map
  useEffect(() => {
    document.title = "Map";
    get("/api/pins").then((pinObjs) => {
      let reversedPinObjs = pinObjs.reverse();
      props.setPins(reversedPinObjs);
      reversedPinObjs.map((feature) =>
        new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map.current)
      );
    });
  }, []);

  // This is for having button as a component and trying to have on top of map
  // const addNewEntry = (entryObj) => {
  //   setEntries([entryObj].concat(entries));
  // };
  return (
    <div className="overlap-container">
      <div ref={mapContainer} className="map-container" />
      {/* <NewEntry addNewEntry={addNewEntry} /> */}
    </div>
  );
};

export default Map;
