mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lydW13IiwiYSI6ImNtaGNsMnczejI4a2cybXB1b3h6dHBuaHkifQ.fO5Cyk2RL57zq0RKG8BDkg';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-98, 38],
  zoom: 3
});

map.on('load', () => {

  map.addSource('counties', {
    type: 'geojson',
    data: 'assets/us-covid-2020-rates.geojson'
  });

  map.addLayer({
    id: 'county-fill',
    type: 'fill',
    source: 'counties',
    paint: {
      'fill-color': [
        'step',
        ['get', 'rate'],
        '#edf8fb',
        5, '#b2e2e2',
        10, '#66c2a4',
        20, '#2ca25f',
        30, '#006d2c'
      ],
      'fill-opacity': 0.8
    }
  });

  map.addLayer({
    id: 'county-outline',
    type: 'line',
    source: 'counties',
    paint: {
      'line-color': '#ffffff',
      'line-width': 0.3
    }
  });

  map.on('click', 'county-fill', (e) => {
    const p = e.features[0].properties;
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(`<strong>${p.county}</strong><br>Rate per 1,000: ${p.rate}`)
      .addTo(map);
  });

  document.getElementById('legend').innerHTML = `
    <strong>COVID-19 Case Rates</strong><br>
    <div><span style="background:#edf8fb"></span>0–5</div>
    <div><span style="background:#b2e2e2"></span>5–10</div>
    <div><span style="background:#66c2a4"></span>10–20</div>
    <div><span style="background:#2ca25f"></span>20–30</div>
    <div><span style="background:#006d2c"></span>30+</div>
    <small>Source: NY Times</small>
  `;
});
