mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lydW13IiwiYSI6ImNtaGNsMnczejI4a2cybXB1b3h6dHBuaHkifQ.fO5Cyk2RL57zq0RKG8BDkg';

const isMap1 = window.location.href.includes('map1');
const isMap2 = window.location.href.includes('map2');

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [-98, 38],
  zoom: 3,
  projection: 'albers'
});

map.on('load', () => {

  /* =========================
     MAP 1 — CHOROPLETH
     ========================= */
  if (isMap1) {

    map.addSource('rates', {
      type: 'geojson',
      data: 'assets/us-covid-2020-rates.geojson'
    });

    map.addLayer({
      id: 'rates-fill',
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
          20, '#2ca25f',
          40, '#006d2c'
        ],
        'fill-opacity': 0.8
      }
    });

    map.addLayer({
      id: 'rates-outline',
      type: 'line',
      source: 'rates',
      paint: {
        'line-color': '#ffffff',
        'line-width': 0.2
      }
    });

    map.on('mousemove', 'rates-fill', (e) => {
      const rate = e.features[0].properties.rate;
      new mapboxgl.Popup({ closeButton: false })
        .setLngLat(e.lngLat)
        .setHTML(`<strong>Cases per 1,000:</strong> ${rate}`)
        .addTo(map);
    });

    document.getElementById('legend').innerHTML = `
      <strong>Cases per 1,000</strong>
      <div class="legend-row"><div class="legend-color" style="background:#edf8fb"></div>Low</div>
      <div class="legend-row"><div class="legend-color" style="background:#2ca25f"></div>High</div>
      <div style="margin-top:6px;font-size:10px">Source: NYT, ACS</div>
    `;
  }

  /* =========================
     MAP 2 — PROPORTIONAL + CLUSTERS
     ========================= */
  if (isMap2) {

    map.addSource('cases', {
      type: 'geojson',
      data: 'assets/us-covid-2020-counts.geojson',
      cluster: true,
      clusterRadius: 40
    });

    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'cases',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': '#3182bd',
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          15, 100, 25, 500, 35
        ]
      }
    });

    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'cases',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-size': 12
      }
    });

    map.addLayer({
      id: 'cases-point',
      type: 'circle',
      source: 'cases',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#e34a33',
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['get', 'cases'],
          1000, 4,
          10000, 12,
          50000, 20
        ],
        'circle-opacity': 0.6
      }
    });

    map.on('click', 'cases-point', (e) => {
      const cases = e.features[0].properties.cases;
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`<strong>Total cases:</strong> ${cases}`)
        .addTo(map);
    });

    document.getElementById('legend').innerHTML = `
      <strong>Total Cases</strong>
      <div class="legend-row"><div class="legend-color" style="background:#e34a33"></div>Small → Large</div>
      <div style="margin-top:6px;font-size:10px">Source: NYT</div>
    `;
  }
});
