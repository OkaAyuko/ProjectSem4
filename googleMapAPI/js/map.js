var map = null;
var lat = 0;
var long = 0;
var infowindow = null;
var arrMarkers = []

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
                    url: place.icon,
                    size: new google.maps.Size(30, 30),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaleSize: new google.maps.Size(20, 20)
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
                });
                arrMarkers.push(marker);
            }
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
            zoom: 15
        });
        var cp = new google.maps.Marker({
            position: { lat: lat, lng: long },
            map: map
        })
    })
}