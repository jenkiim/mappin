function convertToGeoJSON(input) {
  const { latitude, longitude, ...properties } = input;
  const object = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
    properties: properties,
  };
  return object;
}

export { convertToGeoJSON };
