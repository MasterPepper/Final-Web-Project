mapboxgl.accessToken = 'pk.eyJ1IjoiYXdpc2UzIiwiYSI6ImNrMWd4OW12MDE5Z2wzZG50M2Nhem81Y3UifQ.Jxul5R6VJcY7NXbtWGqz0g'; 
var map = new mapboxgl.Map({
    container: 'map', // container id
    center: [-120.1178, 44.3762], 
    zoom: '6',
    style: 'mapbox://styles/awise3/ck2v4dwwi0efk1clkdzhpvwql', // stylesheet location
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());


// Make the panel stay open to show the "What am I looking at" page
var state = { panelOpen: true };

// Function that, if the the user clicks the arrow, closes the info panel.
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
