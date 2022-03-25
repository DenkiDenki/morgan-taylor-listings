var mapMarkersV2 = [];
var homes = [];
var salesStatusImg;

function applyFilters(homes){
	return homes.filter( home => {
    	//Available Lot filter
        const availableLotSwitch = document.querySelector('#available-lot-switch');
		if( availableLotSwitch && home.construction_status === 'available-lot'){
			if( availableLotSwitch.checked ) {
				return true; //include it
            } else {
              	return false  //exclude it
            }
		} else {
          return true; //Include it because does not apply to this filter...
        }
	}).filter( home => {
    	//Under Construction filter
        const underConstructionSwitch = document.querySelector('#under-construction-switch');
		if( underConstructionSwitch && home.construction_status === 'under-construction'){
			if( underConstructionSwitch.checked ) {
				return true; //include it
            } else {
              	return false  //exclude it
            }
		} else {
          return true; //Include it because does not apply to this filter...
        }
	}).filter( home => {
    	//Move In Ready filter
        const moveInReadySwitch = document.querySelector('#move-in-ready-switch');
		if( moveInReadySwitch && home.construction_status === 'move-in-ready'){
			if( moveInReadySwitch.checked ){
				return true; //include it
            } else {
              	return false  //exclude it
            }
		} else {
          return true; //Include it because does not apply to this filter...
        }
	}).filter( home => {
    	//Price filter
      	let price = Number(home.custom_fields.price_v);
      	let allowed = false;
      	switch(document.getElementById('price').value){
        	case 'all':
            	allowed = true;
            break;
        	case 'a':
            	//Under 250K
            	if( price < 250000 ){
                  allowed = true;
                }
            break;
            case 'b':
            	//250K - 349K
            	if( price >= 250000 && price < 350000 ){
                  allowed = true;
                }
            break;
            case 'c':
            	//350K - 449K
            	if( price >= 350000 && price < 450000 ){
                  allowed = true;
                }
            break;
            case 'd':
            	//450K - 599K
            	if( price >= 450000 && price < 600000 ){
                  allowed = true;
                }
            break;
            case 'e':
            	//600K - 749K
            	if( price >= 600000 && price < 750000 ){
                  allowed = true;
                }
            break;
            case 'f':
            	//750K - 1Million
            	if( price >= 750000 && price <= 1000000 ){
                  allowed = true;
                }
            break;
            case 'g':
            	//+1Million
            	if( price > 1000000 ){
                  allowed = true;
                }
            break;
        }
      	return allowed
    }).filter( home => {
      	// State filter
    	if ( document.querySelector('input[name="state"]:checked').value === home.state){
			return true; // include it
		} else {
			return false; // exclude it
		}
    }).filter( home => {
      	// City filter
		if( document.getElementById('city').value !== '' && autocomplete.getPlace() !== undefined && document.getElementById('radio').value === 'all'){
        	if( home.custom_fields.city === autocomplete.getPlace().name){
            	return true; // include it
            } else {
            	return false;	// exclude it
           	}
        } else {
        	return true; // include it
        }
    }).filter( home => {
    	//Radius filter
      	let latitude = Number(home.custom_fields.coordinates_group.latitude);
      	let longitude = Number(home.custom_fields.coordinates_group.longitud);
      	let allowed = false;
      	if(mapReady && document.getElementById('city').value !== '' && autocomplete.getPlace() !== undefined){
			switch(document.getElementById('radio').value){
              case 'all':
                  allowed = true;
              break;
              case '5':
                  if( getDistanceInMiles(latitude, longitude) <= 5 ){
                    allowed = true;
                  }
              break;
              case '10':
                  if( getDistanceInMiles(latitude, longitude) <= 10 ){
                    allowed = true;
                  }
              break;
              case '15':
                  if( getDistanceInMiles(latitude, longitude) <= 15 ){
                    allowed = true;
                  }
              break;
              case '20':
                  if( getDistanceInMiles(latitude, longitude) <= 20 ){
                    allowed = true;
                  }
              break;     
           	}
        } else {
          allowed = true;
        }
		
      	return allowed;
    });
}

function getDistanceInMiles(markerLatitude, markerLongitude){
	let centerLatitude = autocomplete.getPlace().geometry.location.lat();
  	let centerLongitude = autocomplete.getPlace().geometry.location.lng();
	let distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(centerLatitude, centerLongitude), new google.maps.LatLng(markerLatitude, markerLongitude));
  	return distance / 1609;
}


function updateMarkers(){
  let homesWithLatAndLong = homes.filter( home => home.custom_fields.coordinates_group.latitude && home.custom_fields.coordinates_group.longitud )
  mapMarkersV2 = applyFilters(homesWithLatAndLong).map( function( home ){

    let marker = {
      id: home.id,
      latitude: Number(home.custom_fields.coordinates_group.latitude),
      longitude: Number(home.custom_fields.coordinates_group.longitud),
      title: home.title,
      image: listingImage(home),
      facebookUrl: home.facebook_url,
      pinterestUrl: home.pinterest_url,
      twitterUrl: home.twitter_url,
      availability: home.date ? home.date : "N/A",
      apartmentType: home.custom_fields.type.join("/"),
      bathroom: home.custom_fields.bath,
      sqft: home.sqft,
      parkinglot: home.custom_fields.garage,
      prettyPrice: home.pretty_price,
      price: home.pretty_price == 0 ? "Coming Soon" : home.pretty_price,
      bedroom: home.custom_fields.beds,
      salestatus: home.sales_status,
      description: home.description,
      detailsUrl: home.permalink,
      markerImage: home.marker,
      relatedFloorplans: home.floorplans.map((f) =>
        f.tiny_image
          ? f
          : Object.assign(f, {
              tiny_image: "/wp-content/uploads/2021/11/Pending-Refresh-II.jpeg",
            })
      ),
      template: getInfoWindowCustomTemplate(home),
    };
    marker.pinterestUrl = marker.pinterestUrl.replace('_media', marker.image);
    return marker;
  } );
}

function renderFloorplans( floorplans ){
	return floorplans.map(f => {
    	return `
		<section class="info-window-floorplan">
			<a href="${f.permalink}">
				<img class="home lazy" src="${f.tiny_image}" data-src="${f.tiny_image}" width="80" height="60">
			</a>
			<h6>${f.title}</h6>
			<h6>$ ${f.price}</h6>
		</section>
		`;
    }).join('');
}

function getInfoWindowCustomTemplate( home ){
  if ( home.construction_status !== 'available-lot' ) {
    return null; // So the default template will be used.
  } else {
  	return `<div class="info-window-lot">
            <div class="section-title">
              <h3 class>{{title}}</h3>
              <h3><i class="icon-price"></i><span>{{price}}</span></h3>
            </div>
			<h4>Available Floor Plans on this Lot:</h4>
			<div>
              <div class="info-window-floorplan-container">
              	${renderFloorplans(home.floorplans)}
              </div>
              <div class="action-content">
                <a href="{{detailsUrl}}">
                  <i class="icon-info"></i>
                  <span>Get Details</span>
                </a>
              </div>
            </div>
    </div>`;
  }
}

function listingImage( home ){
  if( home.sales_status === "sold" ){
    salesStatusImg = "/wp-content/uploads/2021/11/Sold-Refresh-II.jpeg";
    return salesStatusImg;
  }else if(home.sales_status === "pending"){ return salesStatusImg = "/wp-content/uploads/2021/11/Pending-Refresh-II.jpeg";}
else{ return salesStatusImg = home.image; };
}

jQuery('#available-lot-switch, #move-in-ready-switch, #under-construction-switch, #price, input[name="state"], #city, #radio').on('change', function(event){
	if(this.id === 'city'){
        if (this.value === '') {
            updateHomes();
        }
    } else {
        updateHomes();
    }
});

function adjustZoomToFit(){
	if(mapMarkersV2.length){
  		var latlng = mapMarkersV2.map(point => {
          return new google.maps.LatLng(point.latitude, point.longitude)
        });
        var latlngbounds = new google.maps.LatLngBounds();
        for (var i = 0; i < latlng.length; i++) {
          latlngbounds.extend(latlng[i]);
        }
        morganMap._map.fitBounds(latlngbounds);  
    }
}

function updateHomes(){
	updateMarkers();
  	redrawMap();
  	currentPage = 1;
  	renderHomeListing();
  	adjustZoomToFit();
}