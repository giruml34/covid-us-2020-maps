mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lydW13IiwiYSI6ImNtaGNsMnczejI4a2cybXB1b3h6dHBuaHkifQ.fO5Cyk2RL57zq0RKG8BDkg';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-98, 39],
    zoom: 3,
    projection: 'albers'
});

map.on('load', () => {

    if (MAP_TYPE === "rates") {
        loadRatesMap();
    } else {
        loadCountsMap();
    }

});

function loadRatesMap() {

    map.addSource('rates', {
        type: 'geojson',
        data: 'assets/us-covid-2020-rates.geojson'
    });

    map.addLayer({
        id: 'rates-layer',
        type: 'fill',
        source: 'rates',
        paint: {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'rate'],
                0, '#edf8fb',
                5, '#b2e2e2',
                10, '#66c2a4',
                20, '#238b45'
            ],
            'fill-opacity': 0.8,
            'fill-outline-color': '#ffffff'
        }
    });

    document.getElementById('legend').innerHTML = `
        <strong>Cases per 1,000</strong><br>
        0–5<br>5–10<br>10–20<br>20+
    `;
}

function loadCountsMap() {

    map.addSource('counts', {
        type: 'geojson',
        data: 'assets/us-covid-2020-counts.geojson'
    });

    map.addLayer({
        id: 'counts-layer',
        type: 'circle',
        source: 'counts',
        paint: {
            'circle-radius': [
                'interpolate',
                ['linear'],
                ['get', 'cases'],
                1000, 4,
                10000, 10,
                50000, 20
            ],
            'circle-color': '#2b8cbe',
            'circle-opacity': 0.6,
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 1
        }
    });

    map.on('click', 'counts-layer', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<strong>Cases:</strong> ${e.features[0].properties.cases}`)
            .addTo(map);
    });

    document.getElementById('legend').innerHTML = `
        <strong>Total Cases</strong><br>
        Small → Large
    `;
}
