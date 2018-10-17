var map;

function initMap() {
    var myLatlng = new google.maps.LatLng(45.2754884,-75.7449855);
    var mapOptions = {
        zoom: 14,
        scrollwheel: false,
        center: new google.maps.LatLng(45.2806238,-75.7472997),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
                  {
                      "stylers": [
                          {
                              "hue": "#c8cfe3"
                          },
                          {
                              "saturation": 250
                          }
                      ]
                  },
                  {
                      "featureType": "road",
                      "elementType": "geometry",
                      "stylers": [
                          {
                              "lightness": 50
                          },
                          {
                              "visibility": "simplified"
                          }
                      ]
                  },
                  {
                      "featureType": "road",
                      "elementType": "labels",
                      "stylers": [
                          {
                              "visibility": "off"
                          }
                      ]
                  }
              ]
    }
    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'Scope-R'
    });

    var contentString = '<div class="info-window-content"><h2>Scope-R</h2>' +
        '<h3>Software · Methodology · Efficiency</h3>' +
        '<p><a href="https://goo.gl/maps/5pYbMeoqTry">See map</a> for directions or additional company information.</p></div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
}

google.maps.event.addDomListener(window, 'load', initMap);

$('a[data-type="gmap"]').on('shown.bs.tab', function(e) {
    initialize();
})
