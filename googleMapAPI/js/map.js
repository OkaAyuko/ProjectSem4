var map = null;
var lat = 0;
var long = 0;
var infowindow = null;
var arrMarkers = [];

function FindPlaces(type) {
    if (!type || type == "") return;
    var req = {
        location: { lat: lat, lng: long }, // center location
        radius: '10000', // radius (m)
        type: type // type
    }
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(req, function(result, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK && result && result.length > 0) {
            for (var i in arrMarkers)
                arrMarkers[i].setMap(null);
            arrMarkers = [];
            for (var i in result) {
                var place = result[i];
                console.log(place);
                var ico = {
                    url: "img/parking-marker.svg",
                    size: new google.maps.Size(70, 70),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(0, 32)
                }
                var marker = new google.maps.Marker({
                    map: map,
                    icon: ico,
                    title: place.name,
                    content: '<div id="content">' +
                        '<strong>' + place.name + '</strong>' + '<br/>' + '<span>' + place.vicinity + '</span>' + '<br/>' +
                        '<a href="" id="click-places">Chỉ Đường</a>' +
                        '</div>',
                    position: place.geometry.location,
                    data: place
                });
                google.maps.event.addListener(marker, 'click', function() {
                    inforwindow.setContent(this.content);
                    inforwindow.open(map, this);
                    //Direction(this.data);
                });
                arrMarkers.push(marker);
            }
        } else {}
    });
}
var ddisplay = null;

function Direction(place) {
    var dservie = new google.maps.DirectionsService();
    if (ddisplay) ddisplay.setMap(null);
    ddisplay = new google.maps.DirectionsRenderer();
    ddisplay.setMap(map);
    var req = {
        origin: { lat: lat, lng: long },
        destination: place.geometry.location,
        travelMode: "DRIVING",
        provideRouteAlternatives: true
    };
    dservie.route(req, function(result, status) {
        if (status == "OK") ddisplay.setDirections(result);
    });
}

function showMap() {
    inforwindow = new google.maps.InfoWindow();
    window.navigator.geolocation.getCurrentPosition(function(pos) {
        lat = pos.coords.latitude;
        long = pos.coords.longitude;
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: lat, lng: long },
            zoom: 14,
            fullscreenControl: false
        });
        var cp = new google.maps.Marker({
            position: { lat: lat, lng: long },
            map: map
        })
    })
}