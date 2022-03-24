var morganMap;
var autocomplete;
var mapReady = false;

jQuery(document).ready(function () {
  var mapElement = document.createElement('div');
  mapElement.id = 'map'; 
  mapElement.style.height = '400px';
  mapElement.style.width = '100%';
  var mapLocation = document.getElementById('homes-map-wrapper'); // The first row
  mapLocation.appendChild(mapElement);

  morganMap = new MorganMap({
    popup: true,
  });
  morganMap.on('onMapReady', (data) => {
    mapReady = true; // used by radius filter
	 initializeCityAutocomplete();

    //homes = JSON.parse(document.getElementById('home-json').innerText);
   	const s = document.createElement( 'script' );
    s.src = '/homes-data.js';
	s.type = 'text/javascript';
    s.async = true;
	s.onload = function(){
    	homes = homes.sort(function(a, b){return a.custom_fields.price_v - b.custom_fields.price_v}); // sort by price
      	updateHomes();
    }
	document.body.appendChild(s)
  });
});

function redrawMap() {
	morganMap.clearMarkers();
  	morganMap.addMarker(mapMarkersV2, true);
}

function initializeCityAutocomplete(){
	var input = document.getElementById('city');
    var options = {
      types: ['(cities)'],
      componentRestrictions: {country: 'us'}
    };

    autocomplete = new google.maps.places.Autocomplete(input, options);
  
  	google.maps.event.addListener(autocomplete, 'place_changed', function () {
        updateHomes();
    });
}