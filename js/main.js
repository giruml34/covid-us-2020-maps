mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lydW13IiwiYSI6ImNtaGNsMnczejI4a2cybXB1b3h6dHBuaHkifQ.fO5Cyk2RL57zq0RKG8BDkg';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11', // LIGHT BASEMAP
    center: [-98, 38],
    zoom: 3
});

map.on('load', () => {

    /* ===============================
       DATA SOURCE WITH CLUSTERING
    =============================== */
    map.addSource('cases', {
        type: 'geojson',
        data: 'assets/us-covid-2020-counts.geojson',
        cluster: true,
        clusterMaxZoom: 6,
        clusterRadius: 50
    });

    /* ===============================
       CLUSTER CIRCLES
    =============================== */
    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'cases',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#ccebc5',
                100, '#7bccc4',
                750, '#2b8cbe'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                15,
                100, 25,
                750, 40
            ]
        }
    });

    /* ===============================
       CLUSTER COUNT LABELS
    =============================== */
    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'cases',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['Open Sans Bold'],
            'text-size': 12
        }
    });

    /* ===============================
       UNCLUSTERED POINTS
    =============================== */
    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'cases',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#41b6c4',
            'circle-radius': [
                'interpolate',
                ['linear'],
                ['get', 'cases'],
                1000, 5,
                10000, 10,
                50000, 18
            ],
            'circle-opacity': 0.7,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#333'
        }
    });

    /* ===============================
       POPUPS
    =============================== */
    map.on('click', 'unclustered-point', (e) => {
        const p = e.features[0].properties;
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(
                `<strong>${p.county}</strong><br>
                 Total Cases: ${p.cases}`
            )
            .addTo(map);
    });

    /* ===============================
       LEGEND
    =============================== */
    const legend = document.getElementById('legend');
    legend.innerHTML = `
        <strong>COVID-19 Cases</strong><br>
        <div><span style="background:#41b6c4;width:12px;height:12px;display:inline-block;border-radius:50%"></span> County</div>
        <div><span style="background:#ccebc5;width:12px;height:12px;display:inline-block;border-radius:50%"></span> Small cluster</div>
        <div><span style="background:#7bccc4;width:12px;height:12px;display:inline-block;border-radius:50%"></span> Medium cluster</div>
        <div><span style="background:#2b8cbe;width:12px;height:12px;display:inline-block;border-radius:50%"></span> Large cluster</div>
        <hr>
        <small>Source: NY Times</small>
    `;
});

