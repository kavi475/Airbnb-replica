const map = new mapboxgl.Map({
  accessToken: mapToken,
  container: "map", // container ID
  center: JSON.parse(coordinates), // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9, // starting zoom
});

const marker = new mapboxgl.Marker()
  .setLngLat(JSON.parse(coordinates)) //Listing.geometry.coordinates
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<p>Exact Location will be provided after booking</p>`,
    ),
  )
  .addTo(map);
