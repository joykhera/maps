import google from "google-maps";

const api_key = 'AIzaSyAm9ue6sNKh0UOOoiN3l7IP3Tmi4yIQNMM'
const searchParams = {
    latitude: -33.8670522,
    longitude: 151.1957362,
    keyword: 'cruise',
    radius: 1500,
    type: 'restaurant'
}

const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${searchParams.keyword}&location=${searchParams.latitude}%2C${searchParams.longitude}&radius=${searchParams}&type=${searchParams.type}&key=${api_key}`

const res = await fetch(url)
console.log(res.json())

const { Map } = await google.maps.importLibrary("maps");

// let map: google.maps.Map;
// async function initMap(): Promise<void> {
//     const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
//     map = new Map(document.getElementById("map") as HTMLElement, {
//         center: { lat: -34.397, lng: 150.644 },
//         zoom: 8,
//     });
// }

// initMap();