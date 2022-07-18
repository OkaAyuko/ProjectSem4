var map = null;
var lat = 0;
var long = 0;
var inforwindow = null;
var ddisplay = null;
var radius_circle = null;
var buttonDirection;
var markerArray = [];
var markerLocation = null;
var INTERVAL = 2000;

var parkingLocations = [{
        "name": "Le Thi Rieng Parking Lot",
        "address": "Cach Mang Thang Tam, Ward 15, District 10, Ho Chi Minh City, Vietnam",
        "lat": 10.786140368621982,
        "long": 106.66553523925666,
        "seat": 20,
        "remaining": 10
    },
    {
        "name": "Truong Son Parking Lot",
        "address": "Truong Son, Ward 15, District 10, Ho Chi Minh City, Vietnam",
        "lat": 10.783623768095028,
        "long": 106.66602110517302,
        "seat": 30,
        "remaining": 12
    },
    {
        "name": "550 Street",
        "address": "550 Street. Cach Mang Thang 8, Ward 11, District 3, Ho Chi Minh City, Vietnam",
        "lat": 10.785919366395701,
        "long": 106.66687897069089,
        "seat": 25,
        "remaining": 24
    },
    {
        "name": "Thong Nhat Hospital",
        "address": "669 Street. Cach Mang Thang 8, Ward 6, Tan Binh, Ho Chi Minh City, Vietnam",
        "lat": 10.792474542422955,
        "long": 106.65389890720036,
        "seat": 22,
        "remaining": 21
    },
    {
        "name": "332 Cao Thang",
        "address": "332 Street. Cao Thang, Ward 12, District 10, Ho Chi Minh City, Vietnam",
        "lat": 10.775856472760822,
        "long": 106.66872907259513,
        "seat": 24,
        "remaining": 8
    },
    {
        "name": "152 Ba Son",
        "address": "152 Street. Nguyen Thi Tu, Binh Hung Hoa B, Binh Tan, Ho Chi Minh City, Vietnam",
        "lat": 10.815494097294602,
        "long": 106.59142729657972,
        "seat": 26,
        "remaining": 4
    },
    {
        "name": "Tan Binh Industrial Zone",
        "address": "CN6 Road, Son Ky, Tan Phu, Ho Chi Minh City, Vietnam",
        "lat": 10.808647358759579,
        "long": 106.61051074577816,
        "seat": 17,
        "remaining": 5
    },
    {
        "name": "Dong Phuong 4 Restaurant",
        "address": "309 Dong Hung Thuan 29, Dong Hung Thuan, District 12, Ho Chi Minh City, Vietnam",
        "lat": 10.835440504398681,
        "long": 106.6285604770306,
        "seat": 39,
        "remaining": 9
    },
    {
        "name": "Hoang Nhu Parking Lot",
        "address": "Tan Tao, Binh Tan, Ho Chi Minh City, Vietnam",
        "lat": 10.763773372224323,
        "long": 106.58615458756867,
        "seat": 33,
        "remaining": 6
    }
]


function listElements(name, addr, calulate, seat, remaining) {
    const ul = document.querySelector('.list-items');
    const li = document.createElement('li');
    const div = document.createElement('div');
    const a = document.createElement('a');
    const address = document.createElement('p');
    const radius = document.createElement('p');
    const button = document.createElement('a');
    const row = document.createElement('row');
    const col14 = document.createElement('col');
    const col24 = document.createElement('col');
    const nop = document.createElement('p');
    // div 
    div.classList.add('shop-item');
    div.setAttribute('id', 'shop-item');

    // name
    a.innerHTML = name;
    a.href = '#';
    a.classList.add('shop-item-name');
    a.setAttribute('id', 'shop-item-name');

    // address
    address.innerHTML = addr;

    // radius
    radius.setAttribute('id', 'radius');
    radius.innerHTML = '<i class="fa fa-road"></i> ' + calulate.toFixed(3) + ' km ';

    nop.setAttribute('id', 'nop');
    nop.innerHTML = '<i class="fa fa-chair"></i> ' + remaining + "/" + seat;

    // button booking
    button.setAttribute('class', 'booking-list');
    button.setAttribute('type', 'button');
    button.innerHTML = 'Booking';

    // row 
    row.classList.add('row');
    // col14 
    col14.classList.add('col-6');
    col14.classList.add('pt-2');
    // col24
    col24.classList.add('col-6');
    col24.classList.add('pt-4');

    div.appendChild(a);
    div.appendChild(address);
    div.appendChild(row);
    row.appendChild(col14);
    col14.appendChild(radius);
    col14.appendChild(nop);
    row.appendChild(col24);
    col24.appendChild(button)
    li.appendChild(div);
    ul.appendChild(li);
}

function contentElement(name, address) {
    return '<div id="content-parking">' + '<strong>' + name + '</strong>' + '<br/>' + address + '<div class="p-1"></div>' +
        '<button type="button" class="direction" id="direction"><i class="fa fa-fa fa-arrow-alt-circle-right"></i> Direction</button>' + '&nbsp&nbsp' +
        '<button type="button" class="booking-box" id=""><i class="fa fa-fa fa-parking"></i> Booking</button>';
}

function calculate(lat1, lat2, long1, long2) {
    if ((lat1 == lat2) && (long1 == long2)) {
        return 0;
    }
    var R = 6371;
    var dLat1 = lat1 * (Math.PI / 180);
    var dLat2 = lat2 * (Math.PI / 180);
    var difflat = (dLat2 - dLat1);
    var difflon = (long2 - long1) * (Math.PI / 180);
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(dLat1) * Math.cos(dLat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
}


function showPlace(latpos, longpos) {
    var latpos = latpos;
    var longpos = longpos;

    for (var i = 0; i < parkingLocations.length; i++) {
        var latParking = parkingLocations[i]['lat'].toFixed(6);
        var longParking = parkingLocations[i]['long'].toFixed(7);
        var cal = calculate(latpos, latParking, longpos, longParking);
        var radius = 10.000;
        if (cal < radius) {
            listElements(parkingLocations[i].name, parkingLocations[i].address, cal, parkingLocations[i].seat, parkingLocations[i].remaining);
        }

        var markerParking, i;
        // icon
        var iconParking = {
            url: "img/marker.png",
            size: new google.maps.Size(71, 71),
            scaledSize: new google.maps.Size(45, 45),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
        };
        var contentOnMarker = contentElement(parkingLocations[i]['name'], parkingLocations[i]['address']);
        // create marker
        markerParking = new google.maps.Marker({
            position: new google.maps.LatLng(parkingLocations[i]['lat'], parkingLocations[i]['long']),
            map: map,
            icon: iconParking,
            content: contentOnMarker,
            // animation: google.maps.Animation.BOUNCE
        });
        google.maps.event.addListener(markerParking, "click", (function(markerParking, i) {
            return function() {
                var placePos = inforwindow.setPosition(this.position);
                inforwindow.setContent(this.content);
                inforwindow.open(map, placePos);
                // inforwindow.setOptions({
                //     pixelOffset: new google.maps.Size(5.55, -24.5)
                // });
                map.panTo(this.position);
                showDirection(this.position);
            }
        })(markerParking, i));
    }
    // show place marker on listShop
    $(document).ready(function() {
        // remainingArr = parkingLocations.filter(data => data.name != 'Le Thi Rieng Parking Lot');
        // console.log(remainingArr);
        $('#shop-item #shop-item-name').click(function() {
            var idParking = this.textContent;
            for (var i in parkingLocations) {
                if (idParking == parkingLocations[i]['name']) {
                    var posI = new google.maps.LatLng(parkingLocations[i]['lat'], parkingLocations[i]['long']);
                    var contentOnShop = contentElement(parkingLocations[i]['name'], parkingLocations[i]['address']);
                    var placeListPos = inforwindow.setPosition(posI)
                    inforwindow.setContent(contentOnShop);
                    // inforwindow.setOptions({
                    //     pixelOffset: new google.maps.Size(5.55, -24.5)
                    // });
                    inforwindow.open(map);
                    map.panTo(posI);
                    showDirection(posI);
                }
            }
        });
    });
}

function showDirection(data) {
    // delete
    if (ddisplay) {
        ddisplay.setMap(null);
    }
    var dservice = new google.maps.DirectionsService();
    ddisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });

    ddisplay.setMap(map);
    dservice.route({
        origin: { lat: lat, lng: long },
        destination: data,
        travelMode: 'DRIVING',
        provideRouteAlternatives: true,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidTolls: true,
        avoidHighways: false,
        optimizeWaypoints: true,
        avoidTolls: true,
        drivingOptions: {
            departureTime: new Date(Date.now() + 10000),
            trafficModel: 'bestguess'
        },
        unitSystem: google.maps.UnitSystem.METRIC

    }, function(result, status) {
        if (status == "OK") {
            $("#direction").on("click", function() {
                ddisplay.setDirections(result);
                //console.log(result);
                document.getElementById("distance").setAttribute('value', 'Distance: ' + (result.routes[0].legs[0].distance.value / 1000) + ' km');
                document.getElementById("duration").setAttribute('value', 'Duration: ' + (result.routes[0].legs[0].duration.text));
            });
        } else {
            window.alert('Directions request failed due to ' + status);
            //ddisplay.setDirections(null);
        }
    });
}


function showMap() {
    inforwindow = new google.maps.InfoWindow();
    inforwindow.setOptions({
        pixelOffset: new google.maps.Size(5.55, -24.5)
    });
    window.navigator.geolocation.getCurrentPosition(function(pos) {
        lat = pos.coords.latitude;
        long = pos.coords.longitude;
        if (map) {
            return;
        }
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: lat, lng: long },
            zoom: 15,
            fullscreenControl: false,
            streetViewControl: false,
        });

        markerLocation = new google.maps.Marker({
            position: { lat: lat, lng: long },
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillOpacity: 1,
                strokeWeight: 2,
                fillColor: '#5384ED',
                strokeColor: '#ffffff',
            }
        });
        document.getElementById("getLocation").addEventListener("click", function() {
            map.setCenter(markerLocation.position);
        });
        window.setTimeout(showMap, INTERVAL);
        // setInterval(function() {
        //     pubnub.publish({ channel: pnChannel, message: markerLocation.position });
        // }, 1200);
        showPlace(lat, long);
    });
}