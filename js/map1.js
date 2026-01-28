mapboxgl.accessToken =
  'pk.eyJ1IjoiZ2lydW13IiwiYSI6ImNtaGNsMnczejI4a2cybXB1b3h6dHBuaHkifQ.fO5Cyk2RL57zq0RKG8BDkg';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v11',
  center: [-98, 38],
  zoom: 3,
  projection: 'albers'
});

map.on('load', () => {
  map.addSource('covid-rates', {
    type: 'geojson',
    data: 'assets/us-covid-2020-rates.geojson'
  });

  map.addLayer({
    id: 'rates-layer',
    type: 'fill',
    source: 'covid-rates',
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
      'fill-opacity': 0.8,
      'fill-outline-color': '#ffffff'
    }
  });

  map.on('click', 'rates-layer', (e) => {
    const p = e.features[0].properties;
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        `<strong>${p.county}, ${p.state}</strong><br>
         Cases per 1,000: ${p.rates}`
      )
      .addTo(map);
  });

  map.on('mouseenter', 'rates-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'rates-layer', () => {
    map.getCanvas().style.cursor = '';
  });
});

