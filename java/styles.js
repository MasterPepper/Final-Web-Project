mapboxgl.accessToken = 'pk.eyJ1IjoiYXdpc2UzIiwiYSI6ImNrMWd4OW12MDE5Z2wzZG50M2Nhem81Y3UifQ.Jxul5R6VJcY7NXbtWGqz0g';

var bounds = [
    [-126, 41.75], // Southwest coordinates
    [-113, 47]  // Northeast coordinates
    ];

var map = new mapboxgl.Map({
    container: 'map', // container id
    center: [-120.1178, 44.3762], 
    zoom: '5',
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
     

    map.on('click', 'counties', function (e) {

        var newCoords = new mapboxgl.Popup().setLngLat(e.lngLat)._lngLat

        // SEVERAL ADDITIONS FOR BOXING:
        var bbox = [[newCoords.lng + 1, newCoords.lat + 1], [newCoords.lng - 1, newCoords.lat - 1]]
        map.fitBounds(bbox)
        // console.log(bbox)
        // END OF BOXING STUFF
        
        // console.log(newCoords);
    });

});
