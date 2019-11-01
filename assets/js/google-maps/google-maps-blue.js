var map;

function initMap() {
    var myLatlng = new google.maps.LatLng(45.5502871,-75.2779887);
    var mapOptions = {
        zoom: 14,
        scrollwheel: false,
        center: myLatlng,
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
        '<h3>Methodology · Precision · Efficiency</h3>' +
        '<p><a href="https://goo.gl/maps/QjypWz8HZpi6hctt5">See map</a> for directions or additional company information.</p></div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
}

//Initialize map after the window is done loading
$(window).on('load', function () {
      initMap();
 });

$('a[data-type="gmap"]').on('shown.bs.tab', function(e) {
    initialize();
})
