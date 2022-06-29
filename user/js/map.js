var map = null;
var lat = 0;
var long = 0;
var infowindow = null;
var ddisplay = null;
var dservice = null;
var radius_circle = null;
var markerArray = [];
var parkingLocations = [{
        "name": "Bãi giữ xe",
        "address": "Cách Mạng Tháng Tám, Phường 15, Quận 10, Thành phố Hồ Chí Minh, Việt Name",
        "lat": 10.786140368621982,
        "long": 106.66553523925666,
    },
    {
        "name": "Bãi giữ xe",
        "address": "Trường Sơn, Phường 15, Quận 10, Thành phố Hồ Chí Minh, Việt Nam",
        "lat": 10.783623768095028,
        "long": 106.66602110517302,
    },
    {
        "name": "Bãi giữ xe ôtô",
        "address": "550 Đ. Cách Mạng Tháng 8, Phường 11, Quận 3, Thành phố Hồ Chí Minh, Việt Nam",
        "lat": 10.785919366395701,
        "long": 106.66687897069089,
    },
    {
        "name": "Bãi giữ xe bệnh viện Thống Nhất",
        "address": "669 Đ. Cách Mạng Tháng 8, Phường 6, Tân Bình, Thành phố Hồ Chí Minh, Việt Nam",
        "lat": 10.792474542422955,
        "long": 106.65389890720036,
    },
    {
        "name": "Bãi giữ xe 24h",
        "address": "332 Đ. Cao Thắng, Phường 12, Quận 10, Thành phố Hồ Chí Minh, Việt Nam",
        "lat": 10.775856472760822,
        "long": 106.66872907259513,
    },
    {
        "name": "Bãi đậu xe Cao Thắng",
        "address": "177 Đ. Cao Thắng, Phường 12, Quận 10, Thành phố Hồ Chí Minh, Việt Nam",
        "lat": 10.77460735384704,
        "long": 106.67606615637462,
    },
    {
        "name": "Bãi đậu xe Cao Thắng",
        "address": "177 Đ. Cao Thắng, Phường 12, Quận 10, Thành phố Hồ Chí Minh, Việt Nam",
        "lat": 10.774602038976802,
        "long": 106.67606315432558,
    },
    {
        "name": "Bãi giữ xe Thái",
        "address": "Đường Trục, Tổ 5, Bình Chánh, Thành phố Hồ Chí Minh, Việt Nam",
        "lat": 10.804105422754187,
        "long": 106.56876503892447,
    },
    {
        "name": "Bãi giữ xe ô tô 24/24",
        "address": "2A4 Quách Điêu, Vĩnh Lộc A, Bình Chánh, Thành phố Hồ Chí Minh, Việt Nam",
        "lat": 10.829448363525294,
        "long": 106.57226481009462,
    },
]


function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function showPlace(latpos, longpos) {
    var latpos = latpos.toFixed(1);
    var longpos = longpos.toFixed(1);
    for (var i = 0; i < parkingLocations.length; i++) {
        // check radius
        var R = 6371;
        var dLat = deg2rad(parkingLocations[i]['lat'].toFixed(1) - latpos);
        var dLong = deg2rad(parkingLocations[i]['long'].toFixed(1) - longpos);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(latpos)) * Math.cos(deg2rad(parkingLocations[i]['lat'].toFixed(1))) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // distance in km
        // console.log(d);
        // show multiple marker
        if (d < 10.000) {
            var markerParking, i;
            var iconParking = {
                url: "img/marker.png",
                scaledSize: new google.maps.Size(45, 45),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 0)
            }
            markerParking = new google.maps.Marker({
                position: new google.maps.LatLng(parkingLocations[i]['lat'], parkingLocations[i]['long']),
                map: map,
                icon: iconParking,
                content: '<div id="content">' +
                    '<strong style="font-weight:600;">' + parkingLocations[i]['name'] + '</strong>' +
                    '<br/>' + parkingLocations[i]['address'] + '<div class="p-1"></div>' +
                    '<button class="direction" id="direction">Chỉ Đường <i class="fas fa-directions"></i></button>',
            });
            google.maps.event.addListener(markerParking, "click", (function(markerParking, i) {
                return function() {
                    inforwindow.setContent(this.content);
                    inforwindow.open(map, markerParking);
                    showDirection(this.position);
                }
            })(markerParking, i));
        }
    }
}

function showDirection(data) {
    if (ddisplay || dservice) {
        ddisplay.setMap(null);
    } else {
        dservice = new google.maps.DirectionsService();
        ddisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
    }
    ddisplay.setMap(map);
    dservice.route({
        origin: { lat: lat, lng: long },
        destination: data,
        travelMode: 'DRIVING',
        provideRouteAlternatives: true,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }, function(result, status) {
        if (status == "OK") {
            $("button").on("click", function() {
                //console.log(result);
                ddisplay.setDirections(result);
                document.getElementById("distance").setAttribute('value', 'Khoảng Cách: ' + (result.routes[0].legs[0].distance.value / 1000) + ' km');
                document.getElementById("duration").setAttribute('value', 'Thời Gian: ' + result.routes[0].legs[0].duration.text);
            })
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
            map: map,
        });
        var title = '<div id="content">' + '<strong style="font-weight:600;">Vị trí của bạn</strong>' + '</div>'
        google.maps.event.addListener(markerLocation, "click", (function() {
            inforwindow.setContent(title);
            inforwindow.open(map, markerLocation);
        }));
        showPlace(this.lat, this.long);
    })

}