var bando = null;
var lat = 0;
var long = 0;
var infowindow;

function showMap() {
    window.navigator.geolocation.getCurrentPosition(function(pos) {
        lat = pos.coords.latitude;
        long = pos.coords.longitude;
        bando = new google.maps.Map(document.getElementById('map'), {
            center: { lat: lat, lng: long },
            zoom: 15,
            fullscreenControl: false
        });

        // marker cp1, cp2
        var cp1 = new google.maps.Marker({
            position: { lat: lat, lng: long },
            map: bando,
            anchorPoint: new google.maps.Point(0, 0)
        })
        var cp2 = new google.maps.Marker({
            map: bando,
            anchorPoint: new google.maps.Point(0, 0)
        });

        // Search
        var input = document.getElementById('searchInput');
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', bando);
        infowindow = new google.maps.InfoWindow();
        autocomplete.addListener('place_changed', function() {
            infowindow.close();
            cp2.setVisible(false);
            cp1.setVisible(true);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }
            if (!place.geometry.viewport) {
                bando.fitBounds(place.geometry.viewport);
            } else {
                bando.setCenter(place.geometry.location);
                bando.setZoom(15);
            }
            cp2.setPosition(place.geometry.location);
            cp2.setVisible(true);
            cp1.setVisible(false);
            var address = '';
            if (place.address_components) {
                address = [(place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }
            google.maps.event.addListener(cp2, 'click', function() {
                infowindow.setContent('<div class="set-window-content"><strong>' + place.name + '</strong><br/>' + address + '</div>');
                infowindow.open(bando, cp2);
            })
        })
    })

}