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
  map.addSource('covid-cases', {
    type: 'geojson',
    data: 'assets/us-covid-2020-counts.geojson'
  });

  map.addLayer({
    id: 'cases-layer',
    type: 'circle',
    source: 'covid-cases',
    paint: {
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['get', 'cases'],
        0, 6,
        500, 8,
        5000, 12,
        25000, 18,
        100000, 26
      ],
      'circle-color': '#feb24c',
      'circle-opacity': 0.7,
      'circle-stroke-color': '#ffffff',
      'circle-stroke-width': 1
    }
  });

  map.on('click', 'cases-layer', (e) => {
    const p = e.features[0].properties;
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        `<strong>${p.county}, ${p.state}</strong><br>
         Total cases: ${p.cases.toLocaleString()}`
      )
      .addTo(map);
  });

  map.on('mouseenter', 'cases-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'cases-layer', () => {
    map.getCanvas().style.cursor = '';
  });
});
