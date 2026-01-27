mapboxgl.accessToken = 'PASTE_YOUR_OWN_MAPBOX_TOKEN_HERE';

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-98, 38],
    zoom: 3,
    projection: 'albers'
});

map.on('load', () => {

    map.addSource('covid-rates', {
        type: 'geojson',
        data: 'assets/us-covid-2020-rates.geojson'
    });

    map.addLayer({
        id: 'covid-rates-layer',
        type: 'fill',
        source: 'covid-rates'
    });

});
