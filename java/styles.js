mapboxgl.accessToken = 'pk.eyJ1IjoiYXdpc2UzIiwiYSI6ImNrMWd4OW12MDE5Z2wzZG50M2Nhem81Y3UifQ.Jxul5R6VJcY7NXbtWGqz0g';

var bounds = [
    [-126, 41.75], // Southwest coordinates
    [-113, 47]  // Northeast coordinates
    ];

var map = new mapboxgl.Map({
    container: 'map', // container id
    center: [-120.1178, 44.3762], 
    zoom: '6.5',
    style: 'mapbox://styles/awise3/ck37ukgp01dkr1cmwtet19o9e', // stylesheet location
    maxBounds: bounds,
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());


// Make the panel stay open to show the "What am I looking at" page
var state = { panelOpen: true };

// Function that, if the the user clicks the arrow, minimizes the info panel.
function panelSelect(e) {
    if(state.panelOpen) {
        document.getElementById('descriptionPanel').style.height = '30px';
        document.getElementById('glyph').className = "chevron glyphicon glyphicon-chevron-up";
        state.panelOpen = false;
    } else {
        document.getElementById('descriptionPanel').style.height = '320px';
        document.getElementById('glyph').className = "chevron glyphicon glyphicon-chevron-down";
        state.panelOpen = true;
    }
}


// The next three functions are used to select counties
map.on('load', function() {
    // Add the source to query. In this example we're using
    // county polygons uploaded as vector tiles
    map.addSource('counties', {
    "type": "vector",
    "url": "mapbox://mapbox.82pkq93d"
    });
     
    map.addLayer({
    "id": "counties",
    "type": "fill",
    "source": "counties",
    "source-layer": "original",
    "paint": {
    "fill-outline-color": "rgba(0,0,0,0.1)",
    "fill-color": "rgba(0,0,0,0)"
    }
    }, 'settlement-label'); // Place polygon under these labels.
     
    map.addLayer({
    "id": "counties-highlighted",
    "type": "fill",
    "source": "counties",
    "source-layer": "original",
    "paint": {
    "fill-outline-color": "#484896",
    "fill-color": "#bbeda4",
    "fill-opacity": 0.75
    },
    "filter": ["in", "FIPS", ""]
    }, 'settlement-label'); // Place polygon under these labels.
//     
//    map.on('click', function(e) {
//        // set bbox as 5px reactangle area around clicked point
//        var bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
//        var features = map.queryRenderedFeatures(bbox, { layers: ['counties'] });
//        
//        // Run through the selected features and set a filter
//        // to match features with unique FIPS codes to activate
//        // the `counties-highlighted` layer.
//        var filter = features.reduce(function(memo, feature) {
//        memo.push(feature.properties.FIPS);
//        return memo;
//        }, ['in', 'FIPS']);
//        
//        map.setFilter("counties-highlighted", filter);
//
////        document.getElementById('info').innerHTML =
////            // e.point is the x, y coordinates of the mousemove event relative
////            // to the top-left corner of the map
////            JSON.stringify(e.point) + '<br />' +
////            // e.lngLat is the longitude, latitude geographical position of the event
////            JSON.stringify(e.lngLat.wrap());
//        console.log(bbox);
//        
//        map.fitBounds(bbox);
////        map.flyTo({
////            center: [JSON.stringify(e.lngLat.wrap())],
////        });
//        
//        
//    });
//    
    
    map.on('click', 'counties', function (e) {
//        new mapboxgl.Popup()
//        .setLngLat(e.lngLat)
//        .setHTML(e.features[0].properties.name)
//        .addTo(map);
        
        console.log(e.features[0].geometry.getBounds());
    });

});
