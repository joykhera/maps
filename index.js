// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

let map, infoWindow, pos, placesService, getNextPage, curPosMarker

const initMap = async () => {
    infoWindow = new google.maps.InfoWindow();
    const moreButton = document.getElementById("more");
    console.log('navigator.geolocation', navigator.geolocation)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent("Location found.");
                infoWindow.open(map);
                
                map = new google.maps.Map(document.getElementById("map"), {
                    center: pos,
                    zoom: 17,
                    mapId: "8d193001f940fde3",
                });

                curPosMarker = new google.maps.Marker({
                    position: pos,
                    map,
                    title: "Hello World!",
                });

                // Create the places service.
                placesService = new google.maps.places.PlacesService(map);
                
                // Perform a nearby search.
                placesService.nearbySearch(
                    { location: pos, radius: 1000, type: "store" },
                    (results, status, pagination) => {
                        if (status !== "OK" || !results) {
                            console.error(status);
                            return;
                        }

                        addPlaces(results, map);
                        moreButton.disabled = !pagination || !pagination.hasNextPage;
                        if (pagination && pagination.hasNextPage) {
                            getNextPage = () => {
                                // Note: nextPage will call the same handler function as the initial call
                                pagination.nextPage();
                            };
                        }
                    }
                );
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            },
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    moreButton.onclick = () => {
        console.log(moreButton.onclick)
        moreButton.disabled = true;
        if (getNextPage) {
            getNextPage();
        }
    };
}

function addPlaces(places, map) {
    const placesList = document.getElementById("places");

    for (const place of places) {
        if (place.geometry && place.geometry.location) {
            const image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };

            new google.maps.Marker({
                map,
                icon: image,
                title: place.name,
                position: place.geometry.location,
            });

            const li = document.createElement("li");

            li.textContent = place.name;
            placesList.appendChild(li);
            li.addEventListener("click", () => {
                map.setCenter(place.geometry.location);
            });
        }
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation.",
    );
    infoWindow.open(map);
}

window.initMap = initMap;

let id;
let target;
let options;

function success(pos) {
    curPosMarker.setPosition(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
}

function error(err) {
    console.error(`ERROR(${err.code}): ${err.message}`);
}

target = {
    latitude: 0,
    longitude: 0,
};

options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
};

id = navigator.geolocation.watchPosition(success, error, options);