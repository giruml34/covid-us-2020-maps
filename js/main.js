mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lydW13IiwiYSI6ImNtaGNsMnczejI4a2cybXB1b3h6dHBuaHkifQ.fO5Cyk2RL57zq0RKG8BDkg';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-98, 38],
    zoom: 3
});

map.on('load', () => {

    // =========================
    // MAP 1 — CHOROPLETH (RATES)
    // =========================
    if (window.location.href.includes("map1")) {

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
                'fill-opacity': 0.85
            }
        });

        map.on('click', 'rates-layer', (e) => {
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(`<strong>Rate per 1,000:</strong> ${e.features[0].properties.rate}`)
                .addTo(map);
        });

        document.getElementById('legend').innerHTML =
            "<strong>Cases per 1,000</strong><br>Low → High";
    }

    // ============================
    // MAP 2 — PROPORTIONAL SYMBOLS
    // ============================
    if (window.location.href.includes("map2")) {

        map.addSource('cases', {
            type: 'geojson',
            data: 'assets/us-covid-2020-counts.geojson'
        });

        map.addLayer({
            id: 'cases-layer',
            type: 'circle',
            source: 'cases',
            paint: {
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['get', 'cases'],
                    1000, 3,
                    50000, 12,
                    200000, 25
                ],
                'circle-color': '#3182bd',
                'circle-opacity': 0.7,
                'circle-stroke-color': 'white',
                'circle-stroke-width': 1
            }
        });

        map.on('click', 'cases-layer', (e) => {
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(`<strong>Total Cases:</strong> ${e.features[0].properties.cases}`)
                .addTo(map);
        });

        document.getElementById('legend').innerHTML =
            "<strong>Total Cases</strong><br>Small → Large";
    }
});
