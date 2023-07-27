// import google from "google-maps";

const api_key = 'AIzaSyAm9ue6sNKh0UOOoiN3l7IP3Tmi4yIQNMM'
const searchParams = {
    latitude: -33.8670522,
    longitude: 151.1957362,
    keyword: 'cruise',
    radius: 1500,
    type: 'restaurant'
}

const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${searchParams.keyword}&location=${searchParams.latitude}%2C${searchParams.longitude}&radius=${searchParams.radius}&type=${searchParams.type}&key=${api_key}`

const res = await fetch(url, { mode: 'no-cors' })
console.log(res)
// console.log(res.json())
console.log(await res.text())

// let map;
// const initMap = async () => {
//     const { Map } = await google.maps.importLibrary("maps");
//     map = new Map(document.getElementById("map"), {
//         center: { lat: -34.397, lng: 150.644 },
//         zoom: 8,
//     });
//     console.log(map);
// }
// initMap();