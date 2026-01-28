mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lydW13IiwiYSI6ImNtaGNsMnczejI4a2cybXB1b3h6dHBuaHkifQ.fO5Cyk2RL57zq0RKG8BDkg';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-98, 38],
    zoom: 3
});

map.on('load', () => {

    /* ---------- CHOROPLETH (RATES) ---------- */
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
                ['get', 'rates'],
                0, '#edf8fb',
                10, '#b3cde3',
                20, '#8c96c6',
                30, '#8856a7',
                40, '#810f7c'
            ],
            'fill-opacity': 0.8
        }
    });

    /* ---------- PROPORTIONAL SYMBOLS (CASES) ---------- */
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
                10000, 8,
                50000, 16,
                200000, 30
            ],
            'circle-color': '#41b6c4',
            'circle-opacity': 0.6,
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1
        }
    });

    /* ---------- POPUP ---------- */
    map.on('click', 'cases-layer', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(
                `<strong>County:</strong> ${e.features[0].properties.county}<br>
                 <strong>Cases:</strong> ${e.features[0].properties.cases}`
            )
            .addTo(map);
    });

    /* ---------- LEGEND ---------- */
    const legend = document.getElementById('legend');
    legend.innerHTML = `
        <strong>Legend</strong><br>
        <div class="break"><span class="dot" style="width:10px;height:10px;background:#edf8fb"></span>Low</div>
        <div class="break"><span class="dot" style="width:14px;height:14px;background:#8c96c6"></span>Medium</div>
        <div class="break"><span class="dot" style="width:18px;height:18px;background:#810f7c"></span>High</div>
        <hr>
        <small>Source: NY Times & ACS</small>
    `;
});
