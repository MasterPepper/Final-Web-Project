mapboxgl.accessToken = 'pk.eyJ1IjoiYXdpc2UzIiwiYSI6ImNrMWd4OW12MDE5Z2wzZG50M2Nhem81Y3UifQ.Jxul5R6VJcY7NXbtWGqz0g'; 
var map = new mapboxgl.Map({
    container: 'map', // container id
    center: [-122.67745971679688, 45.52751668442124], 
    zoom: '12',
    style: 'mapbox://styles/awise3/ck2v4dwwi0efk1clkdzhpvwql', // stylesheet location
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

