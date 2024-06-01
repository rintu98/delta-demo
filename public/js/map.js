    // let mapKey = mapToken;
    // console.log(mapKey);
    // const map = tt.map({
    //     key: mapKey,
    //     container: 'map',
    //     center: [77.209, 28.6139],
    //     zoom: 9,
    // });

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: listing.geometry.coordinates,
    zoom: 9,
});


const marker = new mapboxgl.Marker({color: "red"})
.setLngLat(listing.geometry.coordinates)
.setPopup(new mapboxgl.Popup({offset: 25})
.setHTML(
    `<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`
))
.addTo(map);