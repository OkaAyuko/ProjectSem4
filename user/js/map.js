var map = null;
var lat = 0;
var long = 0;
var infowindow = null;
//var arrMarkers = [];
var ddisplay = null;
var listMarkers = [];

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