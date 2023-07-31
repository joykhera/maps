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

                var input = /** @type {!HTMLInputElement} */ (document.getElementById('pac-input'));

                map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

                var autocomplete = new google.maps.places.Autocomplete(input);
                autocomplete.bindTo('bounds', map);

                var infowindow = new google.maps.InfoWindow();
                var marker = new google.maps.Marker({
                    map: map,
                    anchorPoint: new google.maps.Point(0, -29)
                });

                autocomplete.addListener('place_changed', function () {
                    infowindow.close();
                    marker.setVisible(false);
                    var place = autocomplete.getPlace();
                    if (!place.geometry) {
                        window.alert("Autocomplete's returned place contains no geometry");
                        return;
                    }

                    // If the place has a geometry, then present it on a map.
                    if (place.geometry.viewport) {
                        map.fitBounds(place.geometry.viewport);
                    } else {
                        map.setCenter(place.geometry.location);
                        map.setZoom(17); // Why 17? Because it looks good.
                    }
                    marker.setIcon( /** @type {google.maps.Icon} */({
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(35, 35)
                    }));
                    marker.setPosition(place.geometry.location);
                    marker.setVisible(true);

                    var address = '';
                    if (place.address_components) {
                        address = [
                            (place.address_components[0] && place.address_components[0].short_name || ''),
                            (place.address_components[1] && place.address_components[1].short_name || ''),
                            (place.address_components[2] && place.address_components[2].short_name || '')
                        ].join(' ');
                    }

                    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
                    infowindow.open(map, marker);
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