let mapDiv = document.querySelector('.map');

// Connect to API

let apiKey = 'CLRkoZGf2fW9owEZqTx8psFKdWPVS_Sme-Yv-vcuZos'

var platform = new H.service.Platform({
    'apikey': apiKey
  });

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();
var service = platform.getSearchService();

// Call the geocode method with the geocoding parameters,
// the callback and an error callback function (called if a communication error occurs):
let landmark = document.querySelector('.main-heading').textContent;

service.geocode({
    q: landmark
  }, (result) => {
    // Check if location is found
    if(result.items == 0){
      let h2 = `
        <h2 class="map-error">Sorry no map could be found for this landmark</h1>
      `
      mapDiv.insertAdjacentHTML('beforeend', h2);
    } else {
      // Instantiate (and display) a map object:
      var map = new H.Map(
          document.querySelector('.map'),
          defaultLayers.vector.normal.map,
          {
          zoom: 14.5,
          center: result.items[0].position
      });
      map.addObject(new H.map.Marker(result.items[0].position));
      // Create the default UI:
      var ui = H.ui.UI.createDefault(map, defaultLayers);
    }
}, alert);
