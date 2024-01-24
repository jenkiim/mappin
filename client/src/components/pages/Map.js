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
      //TODO: add user id as a thing to pass in so we can filter pins by user logged in
      let reversedPinObjs = pinObjs.reverse();
      console.log("pinobjs")
      console.log(reversedPinObjs);
      props.setPins(reversedPinObjs);
      console.log("actual pins");
      console.log(props.pins);
      const ab=([{creator_id:"65b02046cbed999f0ebb9b7c",
      creatorname:"Tiana Jiang",content:{type:"Feature",
      geometry:{type:"Point",coordinates:[0,0]},properties:{creator_id:"65b02046cbed999f0ebb9b7c",name:"2",description:"2",date:"2"}},__v:{$numberInt:"0"}},{creator_id:"65b02046cbed999f0ebb9b7c",
      creatorname:"Tiana Jiang",content:{type:"Feature",
      geometry:{type:"Point",coordinates:[0,10]},properties:{creator_id:"65b02046cbed999f0ebb9b7c",name:"2",description:"2",date:"2"}},__v:{$numberInt:"0"}}])



      reversedPinObjs.map((feature) =>
        new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map.current)
      );
    });
  }, []);

  ///// TODO: Add GeoJSON feature to map
  // // Add GeoJSON feature to the map
  // map.addSource("user-input-source", {
  //   type: "geojson",
  //   data: props.pins,
  // });

  // map.addLayer({
  //   id: "user-input-layer",
  //   type: "circle",
  //   source: "user-input-source",
  //   paint: {
  //     "circle-radius": 10,
  //     "circle-color": "#FF0000",
  //   },
  // });

  // // Fly to the added point
  // map.flyTo({
  //   center: [longitude, latitude],
  //   zoom: 12,
  //   essential: true,
  // });

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
