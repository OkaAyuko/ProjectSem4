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
                    // url: "img/parking-marker.svg",
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                }
                var marker = new google.maps.Marker({
                    map: map,
                    icon: ico,
                    title: place.name,
                    content: '<div id="content">' +
                        '<strong>' + place.name + '</strong>' + '<br/>' + '<span>' + place.vicinity + '</span>' + '<br/>' +
                        '<div class="p-1"></div><button class="" type="button" id="direction" name="direction">Chỉ Đường <i class="fas fa-directions"></i></button>' +
                        '</div>',
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
        } else {}
    });
}
var ddisplay = null;


function Direction(place) {
    if (place == "") return;
    var dservie = new google.maps.DirectionsService();
    if (ddisplay) ddisplay.setMap(null);
    ddisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
    ddisplay.setMap(map);
    var req = {
        origin: { lat: lat, lng: long },
        destination: place.geometry.location,
        travelMode: 'DRIVING',
        provideRouteAlternatives: true,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        durationInTraffic: true,
        avoidHighways: false,
        avoidTolls: false
    };
    dservie.route(req, function(result, status) {
        if (status == "OK") {
            $("button").click(function() {
                var checkButton = $(this).attr("id");
                if (checkButton == "direction") {
                    const output = document.querySelector("#output");
                    output.innerHTML = "<div class='content-output'>Tên Đường: " + place.name +
                        "<div class=''></div>Khoảng Cách: " + result.routes[0].legs[0].distance.text +
                        "<div class=''></div>Thời Gian: " + result.routes[0].legs[0].duration.text + '</div>';
                    ddisplay.setDirections(result);
                } else {
                    ddisplay.setDirections({ routes: [] });
                }
            });

        }
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