mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lydW13IiwiYSI6ImNtaGNsMnczejI4a2cybXB1b3h6dHBuaHkifQ.fO5Cyk2RL57zq0RKG8BDkg';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-98, 38],
  zoom: 3
});

map.on('load', () => {

  map.addSource('rates', {
    type: 'geojson',
    data: 'assets/us-covid-2020-rates.geojson'
  });

  map.addLayer({
    id: 'rates-layer',
    type: 'fill',
    source: 'rates',
    paint: {
      'fill-color': '#3182bd',
      'fill-opacity': 0.6
    }
  });
});
