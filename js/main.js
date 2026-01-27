map.on('load', () => {
    map.addSource('covid-rates', {
        type: 'geojson',
        data: 'assets/us-covid-2020-rates.geojson'
    });

    map.addLayer({
        id: 'covid-rates-layer',
        type: 'fill',
        source: 'covid-rates'
    });
});

