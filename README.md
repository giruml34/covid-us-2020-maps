# COVID-19 Web Map Application (2020)

This project presents two interactive web maps visualizing COVID-19 data in the United States for the year 2020. The maps were created as part of Lab 3 for GEOG 458 and demonstrate the use of Mapbox GL JS for thematic web mapping, including choropleth and proportional symbol visualizations.

---

## Maps

- **Choropleth Map (COVID-19 Case Rates per 1,000 residents):**  
   [View Map 1 – COVID-19 Case Rates](https://giruml34.github.io/covid-us-2020-maps/map1.html)

- **Proportional Symbol Map (Total COVID-19 Cases):**  
  [View Map 2 – COVID-19 Total Cases](https://giruml34.github.io/covid-us-2020-maps/map2.html)

---

## Project Description

The choropleth map displays COVID-19 case rates per 1,000 residents at the county level across the United States. Darker shades represent higher case rates, allowing for easy comparison of relative intensity between counties.

The proportional symbol map visualizes total confirmed COVID-19 cases using scaled circles. Counties with larger case totals are represented by larger symbols, making spatial patterns of case concentration easier to interpret.

Both maps include interactive features such as hover and click interactions, legends, map titles, and appropriate basemaps to enhance readability and usability.

---

## Data Sources

- **COVID-19 Case Data:** The New York Times  
- **Population Data:** American Community Survey (ACS) 2018 5-year estimates  
- **County Boundaries:** U.S. Census Bureau  

---

## Libraries and Tools Used

- Mapbox GL JS  
- HTML5  
- JavaScript  
- Mapshaper (for GeoJSON processing and simplification)
