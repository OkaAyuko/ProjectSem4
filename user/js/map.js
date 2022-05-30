const myMap = L.map('map').setView([9.906340099442563, 105.82396500201925], 8);
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution =
    '&copy; <a href="">Copyright</a>, Coded by T1.2008.A0 ❤️';
const tileLayer = L.tileLayer(tileUrl, { attribution });
tileLayer.addTo(myMap);

// function generateList() {
//     const ul = document.querySelector('.list-items');
//     storeList.forEach((shop) => {
//         const li = document.createElement('li');
//         const div = document.createElement('div');
//         const a = document.createElement('a');
//         const p = document.createElement('p');
//         a.addEventListener('click', () => {
//             flyToStore(shop);
//         });
//         div.classList.add('shop-item');
//         a.innerText = shop.properties.name;
//         a.href = '#';
//         p.innerText = shop.properties.address;

//         div.appendChild(a);
//         div.appendChild(p);
//         li.appendChild(div);
//         ul.appendChild(li);
//     });
// }

// generateList();

// function makePopupContent(shop) {
//     return `
//     <div>
//         <h4>${shop.properties.name}</h4>
//         <p>${shop.properties.address}</p>
//         <div class="phone-number">
//             <a href="tel:${shop.properties.phone}">${shop.properties.phone}</a>
//         </div>
//     </div>
//   `;
// }

// function onEachFeature(feature, layer) {
//     layer.bindPopup(makePopupContent(feature), { closeButton: false, offset: L.point(0, -8) });
// }

// var myIcon = L.icon({
//     iconUrl: 'images/marker.png',
//     iconSize: [30, 40]
// });

// var myIconLocation = L.icon({
//     iconUrl: 'images/marker-location.png',
//     iconSize: [50, 40]
// });

// const shopsLayer = L.geoJSON(storeList, {
//     onEachFeature: onEachFeature,
//     pointToLayer: function(feature, latlng) {
//         return L.marker(latlng, { icon: myIcon });
//     }
// });
// shopsLayer.addTo(myMap);

// function flyToStore(store) {
//     const lat = store.geometry.coordinates[1];
//     const lng = store.geometry.coordinates[0];
//     myMap.flyTo([lat, lng], 14, {
//         duration: 3
//     });
//     setTimeout(() => {
//         L.popup({ closeButton: false, offset: L.point(0, -8) })
//             .setLatLng([lat, lng])
//             .setContent(makePopupContent(store))
//             .openOn(myMap);
//     }, 3000);
// }
// -------------------------------------------- //

// var locations = [
//     ["Bãi Giữ Xe Ô Tô Vị Thanh", "92 Nguyễn Công Trứ, Phường 1, Vị Thanh, Hậu Giang, Việt Nam", "090 999 111", 9.834159053307923, 105.45291116542504],
//     ["Bãi Xe Phước Giàu", "Tân Phú Đông, Sa Đéc, Đồng Tháp, Việt Nam", "322 114 345", 10.36488412465991, 105.74438740754032],
//     ["Bãi Đậu Xe Thành Phố", "Trần Hưng Đạo, Phường 1, Sóc Trăng, Việt Nam", "999 152 786", 9.64348185402889, 105.98412962180936]
// ];

// for (var i = 0; i < locations.length; i++) {
//     marker = new L.marker([locations[i][3], locations[i][4]], { icon: myIcon });
//     marker.bindPopup(
//         '<h4>' + locations[i][0] + '</h4>' +
//         '<p>' + locations[i][1] + '</p>' +
//         '<div class="phone-number"><a href="tel:' + locations[i][2] + '">' + locations[i][2] + '</a>'
//     ).addTo(myMap);
// }


// -------------------------------------------- //


var value = 0;
// var domainFrom = document.getElementById('searchFrom');
// var domainTo = document.getElementById('searchTo');

function getLocation() {
    if (!navigator.geolocation) {
        window.alert("Your browser does not support geolocation feature !");
    } else {
        navigator.geolocation.getCurrentPosition(getPosition);
    }
}

function getRouting() {
    // Routing 
    L.Routing.control({
        createMarker: function() { return null; },
        waypoints: [
            L.latLng(9.777817539003879, 105.46508013437919),
            L.latLng(10.033747452141528, 105.75898462991356),
        ],
        // geocoder: L.Control.Geocoder.nominatim(),
        lineOptions: {
            styles: [{ color: 'green', opacity: 1, weight: 4 }]
        },
        routeWhileDragging: true,
        addWaypoints: true,
    }).on('routesfound', function(e) {
        console.log(e);
    }).addTo(myMap);

}


function getPosition(position) {
    var marker, circle;
    var lat = position.coords.latitude
    var long = position.coords.longitude
    if (marker) {
        myMap.removeLayer(marker)
    }
    if (circle) {
        myMap.removeLayer(circle)
    }
    marker = L.marker([lat, long], { icon: myIconLocation })
    circle = L.circle([lat, long], { fillOpacity: 0, opacity: 0 })
    var featureGroup = L.featureGroup([marker, circle]).addTo(myMap);
    myMap.fitBounds(featureGroup.getBounds());
}