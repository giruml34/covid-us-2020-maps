mapboxgl.accessToken = 'PASTE_YOUR_TOKEN_HERE';

const isRatesMap = window.location.href.includes('map1');
const geojsonFile = isRatesMap
  ? 'assets/us-covid-2020-rates.geojson'
  : 'assets/us-covid-2020-counts.geojson';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v11',
  center: [-98, 38],
  zoom: 3,
  projection: 'albers'
});

map.on('load', () => {

  map.addSource('covid', {
    type: 'geojson',
    data: geojsonFile,
    cluster: !isRatesMap,
    clusterRadius: 40
  });

  // =========================
  // MAP 1 — CHOROPLETH
  // =========================
  if (isRatesMap) {
    map.addLayer({
      id: 'rates-layer',
      type: 'fill',
      source: 'covid',
      paint: {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'rates'],
          0, '#f1eef6',
          5, '#bdc9e1',
          10, '#74a9cf',
          20, '#2b8cbe',
          40, '#045a8d'
        ],
        'fill-opacity': 0.8
      }
    });

    map.on('click', 'rates-layer', e => {
      const p = e.features[0].properties;
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
          `<strong>${p.county}, ${p.state}</strong><br>
           Cases per 1,000: ${p.rates}`
        )
        .addTo(map);
    });

    document.getElementById('legend').innerHTML =
      `<b>Cases per 1,000</b><br>
       Light → Dark`;

  }

  // =========================
  // MAP 2 — CLUSTERS + CIRCLES
  // =========================
  else {
    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'covid',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': '#f03b20',
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          15, 100, 25, 500, 35
        ]
      }
    });

    map.addLayer({
      id: 'cases-layer',
      type: 'circle',
      source: 'covid',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#feb24c',
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['get', 'cases'],
          0, 3,
          50000, 10,
          200000, 20
        ],
        'circle-opacity': 0.7
      }
    });

    map.on('click', 'cases-layer', e => {
      const p = e.features[0].properties;
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
          `<strong>${p.county}, ${p.state}</strong><br>
           Total Cases: ${p.cases}`
        )
        .addTo(map);
    });

    document.getElementById('legend').innerHTML =
      `<b>Total Cases</b><br>
       Small → Large`;
  }
});

