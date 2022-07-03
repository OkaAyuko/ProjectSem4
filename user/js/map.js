var map = null;
var lat = 0;
var long = 0;
var infowindow = null;
var ddisplay = null;
var dservice = null;
var radius_circle = null;
var buttonDirection;
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
    {
        "name": "Bãi xe 244",
        "address": "336 Liên Khu 4-5, Bình Hưng Hoà B, Bình Tân, Thành phố Hồ Chí Minh, Việt Nam",
        "lat": 10.803836157761179,
        "long": 106.5833460898702,
    },
    {
        "name": "Bãi giữ xe ô tô Tháng",
        "address": "47/8 Bình Thành, Bình Hưng Hoà B, Bình Tân, Thành phố Hồ Chí Minh, Việt Nam",
        "lat": 10.801606628483857,
        "long": 106.58653293093546,
    },
    {
        "name": "Bãi xe Bá Sơn",
        "address": "152 Đ. Nguyễn Thị Tú, Bình Hưng Hoà B, Bình Tân, Thành phố Hồ Chí Minh, Việt Nam",
        "lat": 10.815494097294602,
        "long": 106.59142729657972,
    },
    {
        "name": "Bãi xe 390",
        "address": "390 QL1A, Bình Hưng Hoà B, Bình Tân, Thành phố Hồ Chí Minh, Việt Nam",
        "lat": 10.806340194668364,
        "long": 106.59876903376622,
    },
    {
        "name": "Bãi đậu xe khu công nghiệp Tân Bình",
        "address": "Đường CN6, Sơn Kỳ, Tân Phú, Thành phố Hồ Chí Minh, Việt Nam",
        "lat": 10.808647358759579,
        "long": 106.61051074577816,
    },
    {
        "name": "Bãi đậu xe nhà hàng Đông Phương 4",
        "address": "309 Đông Hưng Thuận 29, Đông Hưng Thuận, Quận 12, Thành phố Hồ Chí Minh, Việt Nam",
        "lat": 10.835440504398681,
        "long": 106.6285604770306,
    },
]

function calculate(lat1, lat2, long1, long2) {
    if ((lat1 == lat2) && (long1 == long2)) {
        return 0;
    }
    // var R = 6371.0710;
    var R = 6371;
    var dLat1 = lat1 * (Math.PI / 180);
    var dLat2 = lat2 * (Math.PI / 180);
    var difflat = (dLat2 - dLat1);
    var difflon = (long2 - long1) * (Math.PI / 180);
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(dLat1) * Math.cos(dLat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
}

function showPlace(latpos, longpos) {
    var latpos = latpos.toFixed(6);
    var longpos = longpos.toFixed(7);
    let listItem = document.querySelector(".list-items");
    let exerciseItems = "";
    // console.log(latpos, longpos);
    for (var i = 0; i < parkingLocations.length; i++) {
        var latParking = parkingLocations[i]['lat'].toFixed(6);
        var longParking = parkingLocations[i]['long'].toFixed(7);
        //console.log(latParking, longParking);
        // check radius
        var cal = calculate(latpos, latParking, longpos, longParking);
        var radius = 10.000;
        // show multiple marker
        if (cal < radius) {
            exerciseItems += "<li><div class='shop-item'>" + "<a href=''>" + parkingLocations[i].name + "</a>" +
                "<p>" + parkingLocations[i].address + "</p>" + "<p>" + "<i class='fa fa-road'></i> " + cal.toFixed(3) + " km" +
                "<button type='button' value='1' class='direction' id='direction-list'><i class='fa fa-directions'></i> Chỉ Đường</button>" + "</p>" + "</div>" + "</li>";
            var markerParking, i;
            var pos = new google.maps.LatLng(parkingLocations[i]['lat'], parkingLocations[i]['long']);
            // icon
            var iconParking = {
                url: "img/marker.png",
                size: new google.maps.Size(71, 71),
                scaledSize: new google.maps.Size(45, 45),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
            };
            // create marker
            markerParking = new google.maps.Marker({
                position: pos,
                map: map,
                icon: iconParking,
                content: '<div id="content-parking">' +
                    '<strong style="font-weight:600; font-size:14px;">' + parkingLocations[i]['name'] + '</strong>' +
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
    // display html list
    listItem.innerHTML = exerciseItems;
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
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidTolls: true,
        avoidHighways: false,
    }, function(result, status) {
        if (status == "OK") {
            $("#direction").on("click", function() {
                ddisplay.setDirections(result);
                document.getElementById("distance").setAttribute('value', 'Quãng Đường: ' + (result.routes[0].legs[0].distance.value / 1000).toFixed(3) + ' km');
                document.getElementById("duration").setAttribute('value', 'Thời Gian: ' + result.routes[0].legs[0].duration.text);
            });
        } else {
            ddisplay.setDirections(null);
        }
    });
}


function getPosition() {
    if (!navigator.geolocation) {
        window.alert("Your browser does not support geolocation feature !");
    } else {
        showMap();
    }
}

function showMap() {
    inforwindow = new google.maps.InfoWindow();
    window.navigator.geolocation.getCurrentPosition(function(pos) {
        lat = pos.coords.latitude;
        long = pos.coords.longitude;
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: lat, lng: long },
            zoom: 14,
            fullscreenControl: false,
            streetViewControl: false,
        });
        var markerLocation = new google.maps.Marker({
            position: { lat: lat, lng: long },
            map: map,
        });
        showPlace(lat, long);
    });
}