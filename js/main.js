mapboxgl.accessToken = 'PASTE_YOUR_MAPBOX_TOKEN_HERE';

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-98, 38],
    zoom: 3,
    projection: 'albers'
});

map.on('load', () => {

    /* ===== CHOROPLETH: COVID RATES ===== */
    if (window.location.pathname.includes('map1')) {

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
                    0, '#f2f0f7',
                    5, '#cbc9e2',
                    10, '#9e9ac8',
                    20, '#756bb1',
                    40, '#54278f'
                ],
                'fill-opacity': 0.8
            }
        });

        map.on('click', 'covid-rates-layer', (e) => {
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(
                    `<strong>${e.features[0].properties.county}</strong><br>
                     Rate: ${e.features[0].properties.rates}`
                )
                .addTo(map);
        });
    }

    /* ===== PROPORTIONAL SYMBOLS: COVID COUNTS ===== */
    if (window.location.pathname.includes('map2')) {

        map.addSource('covid-counts', {
            type: 'geojson',
            data: 'assets/us-covid-2020-counts.geojson'
        });

        map.addLayer({
            id: 'covid-counts-layer',
            type: 'circle',
            source: 'covid-counts',
            paint: {
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['get', 'cases'],
                    100, 2,
                    1000, 6,
                    5000, 12,
                    20000, 25
                ],
                'circle-color': '#e31a1c',
                'circle-opacity': 0.6,
                'circle-stroke-color': 'white',
                'circle-stroke-width': 1
            }
        });

        map.on('click', 'covid-counts-layer', (e) => {
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(
                    `<strong>${e.features[0].properties.county}</strong><br>
                     Cases: ${e.features[0].properties.cases}`
                )
                .addTo(map);
        });
    }
});
