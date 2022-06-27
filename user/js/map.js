var map = null;
var lat = 0;
var long = 0;
var infowindow = null;
var ddisplay = null;
var parkingLocations = [{
        "name": "Bãi giữ xe",
        "address": "Cách Mạng Tháng Tám, Phường 15, Quận 10, Thành phố Hồ Chí Minh, Việt Name",
        "lat": "10.786140368621982",
        "long": "106.66553523925666"
    },
    {
        "name": "Bãi giữ xe",
        "address": "Trường Sơn, Phường 15, Quận 10, Thành phố Hồ Chí Minh, Việt Nam",
        "lat": "10.783623768095028",
        "long": "106.66602110517302"
    },
    {
        "name": "Bãi giữ xe ôtô",
        "address": "550 Đ. Cách Mạng Tháng 8, Phường 11, Quận 3, Thành phố Hồ Chí Minh, Việt Nam",
        "lat": "10.785919366395701",
        "long": "106.66687897069089"
    },
    {
        "name": "Bãi giữ xe bệnh viện Thống Nhất",
        "address": "669 Đ. Cách Mạng Tháng 8, Phường 6, Tân Bình, Thành phố Hồ Chí Minh, Việt Nam",
        "lat": "10.792474542422955",
        "long": "106.65389890720036"
    },
    {
        "name": "Bãi giữ xe 24h",
        "address": "332 Đ. Cao Thắng, Phường 12, Quận 10, Thành phố Hồ Chí Minh, Việt Nam",
        "lat": "10.775856472760822",
        "long": "106.66872907259513"
    },
    {
        "name": "Bãi đậu xe Cao Thắng",
        "address": "177 Đ. Cao Thắng, Phường 12, Quận 10, Thành phố Hồ Chí Minh, Việt Nam",
        "lat": "10.77460735384704",
        "long": "106.67606615637462"
    },
    {
        "name": "Bãi đậu xe Cao Thắng",
        "address": "177 Đ. Cao Thắng, Phường 12, Quận 10, Thành phố Hồ Chí Minh, Việt Nam",
        "lat": "10.774602038976802",
        "long": "106.67606315432558"
    }
]


function showDirection(place) {
    var dservice = new google.maps.DirectionsService();
    ddisplay = new google.maps.DirectionsRenderer();
    if (ddisplay) {
        ddisplay.setMap(null);
    }
    ddisplay.setMap(map);
    var req = {
        origin: { lat: lat, lng: long },
        destination: place.geometry.location, // ???
        travelMode: 'DRIVING',
        provideRouteAlternatives: true
    }
    dservice.route(req, function(result, status) {
        if (status == "OK") {
            ddisplay.setDirections(result);
        }
    });
}

function showMap() {
    inforwindow = new google.maps.InfoWindow();
    window.navigator.geolocation.getCurrentPosition(function(pos) {
        lat = pos.coords.latitude;
        long = pos.coords.longitude;
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: lat, lng: long },
            zoom: 14,
            fullscreenControl: false
        });
        var markerLocation = new google.maps.Marker({
            position: { lat: lat, lng: long },
            map: map
        })
        var markerParking, i
        for (var i in parkingLocations) {
            console.log(parkingLocations[i]);
            var iconParking = {
                url: "img/marker.png",
                scaledSize: new google.maps.Size(45, 45), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            }
            markerParking = new google.maps.Marker({
                position: new google.maps.LatLng(parkingLocations[i]['lat'], parkingLocations[i]['long']),
                map: map,
                icon: iconParking,
                data: parkingLocations[i]
            });
            google.maps.event.addListener(markerParking, "click", (function(markerParking, i) {
                return function() {
                    inforwindow.setContent(
                        '<div id="content">' +
                        '<strong style="font-weight:600;">' + parkingLocations[i]['name'] + '</strong>' +
                        '<br/>' + parkingLocations[i]['address'] +
                        '<div class="p-1"></div>' +
                        '<button id="direction" name="direction">Chỉ Đường <i class="fas fa-directions"></i></button>'
                    );
                    inforwindow.open(map, markerParking);
                    // showDirection(this.data);
                }
            })(markerParking, i));
        }
    })

}