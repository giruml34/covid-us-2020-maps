mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lydW13IiwiYSI6ImNtaGNsMnczejI4a2cybXB1b3h6dHBuaHkifQ.fO5Cyk2RL57zq0RKG8BDkg';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [-98, 38],
  zoom: 3,
  projection: 'albers'
});

map.on('load', () => {

  // ===== COVID RATES (map1.html) =====
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
        ['get', 'rate'],
        0, '#f7fbff',
        5, '#c6dbef',
        10, '#6baed6',
        20, '#2171b5',
        40, '#08306b'
      ],
      'fill-opacity': 0.8
    }
  });

  map.on('click', 'covid-rates-layer', (e) => {
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        `<strong>County:</strong> ${e.features[0].properties.county}<br>
         <strong>Case Rate:</strong> ${e.features[0].properties.rate}`
      )
      .addTo(map);
  });

});
