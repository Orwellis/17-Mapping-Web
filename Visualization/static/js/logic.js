function createMap(earthquakes) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "Earthquakes": earthquakes
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [43.52, -117.95],
    zoom: 12,
    layers: [lightmap, earthquakes]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}


function createMarkers(response) {

  //    Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.
  //  * Your data markers should reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes 
  //    should appear larger and darker in color.
  //  * Include popups that provide additional information about the earthquake when a marker is clicked.
  //  * Create a legend that will provide context for your map data.
  //  * Your visualization should look something like the map above.

  var earthquakes = response.features;

  var earthquakeNumber = response.metadata.count;

  var earthquakeMarkers = [];

  for (var index = 0; index < earthquakeNumber; index++) {

    var earthquake = earthquakes[index];
    var coordinates = earthquake.geometry.coordinates;
    console.log(coordinates)
    var prop = earthquake.properties

    var earthquakeMarker = L.marker([coordinates[1], coordinates[0]])
      .bindPopup("<h3>Place: " + prop.place + "<h3><h3>Date: " + prop.time + "<h3><h3>Mag: " + prop.mag + "<h3>");
    
      earthquakeMarkers.push(earthquakeMarker);
  }

  createMap(L.layerGroup(earthquakeMarkers));

}

// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);
