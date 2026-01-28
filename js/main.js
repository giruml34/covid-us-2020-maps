mapboxgl.accessToken =
  'pk.eyJ1IjoiZ2lydW13IiwiYSI6ImNtaGNsMnczejI4a2cybXB1b3h6dHBuaHkifQ.fO5Cyk2RL57zq0RKG8BDkg';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-98, 38],
  zoom: 3,
  projection: 'albers'
});

map.on('load', () => {

  /* =========================
     MAP 1 — CASE RATES
  ========================= */
  if (window.location.href.includes('map1.html')) {

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
          ['get', 'rate_per_1000'],
          0, '#f2f0f7',
          5, '#cbc9e2',
          10, '#9e9ac8',
          20, '#756bb1',
          30, '#54278f'
        ],
        'fill-opacity': 0.8
      }
    });

    map.on('click', 'rates-layer', e => {
      const p = e.features[0].properties;
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
          `<strong>${p.NAME}</strong><br>
           Cases per 1,000: ${p.rate_per_1000}`
        )
        .addTo(map);
    });

    document.getElementById('legend').innerHTML =
      '<strong>Cases per 1,000</strong><br>Low → High';
  }

  /* =========================
     MAP 2 — TOTAL CASES
  ========================= */
  if (window.location.href.includes('map2.html')) {

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
          0, 3,
          10000, 6,
          50000, 12,
          100000, 20
        ],
        'circle-color': '#e34a33',
        'circle-opacity': 0.6,
        'circle-stroke-color': 'white',
        'circle-stroke-width': 1
      }
    });

    map.on('click', 'cases-layer', e => {
      const p = e.features[0].properties;
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
          `<strong>${p.NAME}</strong><br>
           Total cases: ${p.cases}`
        )
        .addTo(map);
    });

    document.getElementById('legend').innerHTML =
      '<strong>Total Cases</strong><br>Small → Large';
  }
});
