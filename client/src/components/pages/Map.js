import React, { useState, useEffect, useRef } from "react";
import { get, post } from "../../utilities";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
    console.log("yo");
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  // Need to use the navigate function
  const navigate = useNavigate();

  // load all existing pins to map
  useEffect(() => {
    document.title = "Map";
    // console.log("helloeheloo");
    get("/api/pins").then((pinObjs) => {
      let reversedPinObjs = pinObjs.reverse();
      props.setPins(reversedPinObjs);
      reversedPinObjs.map((marker) => {
        const el = document.createElement("div");
        el.className = "marker";
        console.log("first");
        new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map.current);
        console.log("added marker at:");
        console.log(marker.geometry.coordinates);
        console.log(el);
        //Add click event to each marker
        el.addEventListener("click", () => {
          // Create a popup on marker click
          console.log("clicked");
          // const popup = new mapboxgl.Popup({ offset: [0, -15] })
          // .setLngLat(marker.geometry.coordinates)
          // .setHTML(
          //   `<h3>${marker.properties.name}</h3><p>${marker.properties.description}</p>`
          // )
          // .addTo(map.current);
          console.log(marker);
          props.setClickedPin(marker);
          navigate("/viewPin");
        });
      });
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
