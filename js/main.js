mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lydW13IiwiYSI6ImNtaGNsMnczejI4a2cybXB1b3h6dHBuaHkifQ.fO5Cyk2RL57zq0RKG8BDkg';

/* =========================
   MAP 1 – CHOROPLETH (RATES)
========================= */

if (document.getElementById('map1')) {

  const map1 = new mapboxgl.Map({
    container: 'map1',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-98, 39],
    zoom: 3
  });

  map1.on('load', () => {

    map1.addSource('rates', {
      type: 'geojson',
      data: 'assets/us-covid-2020-rates.geojson'
    });

    map1.addLayer({
      id: 'rates-layer',
      type: 'fill',
      source: 'rates',
      paint: {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'rate'],
          0, '#f2f0f7',
          10, '#cbc9e2',
          25, '#9e9ac8',
          50, '#756bb1',
          100, '#54278f'
        ],
        'fill-opacity': 0.8
      }
    });

    map1.addLayer({
      id: 'rates-outline',
      type: 'line',
      source: 'rates',
      paint: {
        'line-color': '#ffffff',
        'line-width': 0.2
      }
    });
  });
}

/* ==============================
   MAP 2 – PROPORTIONAL SYMBOLS
============================== */

if (document.getElementById('map2')) {

  const map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-98, 39],
    zoom: 3
  });

  map2.on('load', () => {

    map2.addSource('cases', {
      type: 'geojson',
      data: 'assets/us-covid-2020-counts.geojson'
    });

    map2.addLayer({
      id: 'cases-circles',
      type: 'circle',
      source: 'cases',
      paint: {
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['get', 'cases'],
          0, 2,
          1000, 6,
          10000, 12,
          50000, 20
        ],
        'circle-color': '#3182bd',
        'circle-opacity': 0.7,
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': 0.5
      }
    });
  });
}
