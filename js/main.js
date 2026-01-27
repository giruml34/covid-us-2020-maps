mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lydW13IiwiYSI6ImNtaGNsMnczejI4a2cybXB1b3h6dHBuaHkifQ.fO5Cyk2RL57zq0RKG8BDkg';

const map = new mapboxgl.Map({
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
        source: 'covid-rates',
        paint: {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'rates'],
                0, '#f7fbff',
                10, '#c6dbef',
                25, '#6baed6',
                50, '#2171b5',
                100, '#08306b'
            ],
            'fill-opacity': 0.8,
            'fill-outline-color': '#ffffff'
        }
    });
});
