mapboxgl.accessToken = 'pk.eyJ1IjoiYXdpc2UzIiwiYSI6ImNrMWd4OW12MDE5Z2wzZG50M2Nhem81Y3UifQ.Jxul5R6VJcY7NXbtWGqz0g';

var bounds = [
    [-126, 40], // Southwest coordinates
    [-114, 48]  // Northeast coordinates
    ];

var map = new mapboxgl.Map({
    container: 'map', // container id
    center: [-120.1178, 44.3762], 
    zoom: '6.5',
    style: 'mapbox://styles/awise3/ck37ukgp01dkr1cmwtet19o9e/draft', // stylesheet location
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


var bounds = [
[-74.04728500751165, 40.68392799015035], // Southwest coordinates
[-73.91058699000139, 40.87764500765852]  // Northeast coordinates
];

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
     
    map.on('click', function(e) {
        // set bbox as 5px reactangle area around clicked point
        var bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
        var features = map.queryRenderedFeatures(bbox, { layers: ['counties'] });
        // Run through the selected features and set a filter
        // to match features with unique FIPS codes to activate
        // the `counties-highlighted` layer.
        var filter = features.reduce(function(memo, feature) {
        memo.push(feature.properties.FIPS);
        return memo;
        }, ['in', 'FIPS']);
        
        map.setFilter("counties-highlighted", filter);

        
        map.flyTo({
            center: [e.point.x, e.point.y],
            zoom: '11',
        });
    });

});
