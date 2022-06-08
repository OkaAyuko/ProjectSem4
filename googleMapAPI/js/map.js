var map = null;
var lat = 0;
var long = 0;
var infowindow = null;
var arrMarkers = [];

function FindPlaces(type) {
    if (!type || type == "") return;
    var req = {
        location: { lat: lat, lng: long }, // trung tam vung tim kiem
        radius: '10000', // ban kinh tim kiem (m)
        type: type // loai dia diem can tim
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
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }
                var marker = new google.maps.Marker({
                    map: map,
                    icon: ico,
                    title: place.name,
                    content: '<strong>' + place.name + '</strong>' + '<br/>' + place.vicinity,
                    position: place.geometry.location,
                    data: place
                });
                google.maps.event.addListener(marker, 'click', function() {
                    inforwindow.setContent(this.content);
                    inforwindow.open(map, this);
                    Direction(this.data);
                });
                arrMarkers.push(marker);
            }
        }
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
        travelMode: "WALKING",
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
            zoom: 15
        });
        var cp = new google.maps.Marker({
            position: { lat: lat, lng: long },
            map: map
        })
    })
}