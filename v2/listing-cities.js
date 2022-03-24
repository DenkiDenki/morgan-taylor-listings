var homeListing = [];
var currentPage = 1;
var maxPages = 0;
const PAGE_LENGTH = 6;

function renderHomeListing() {
  	sliceHomes();
	document.getElementById('homes-listing').innerHTML = '<div class="row" id="cities">' + homeListing.map( homeListingTemplate ).join('') + '</div>';
    
    renderPaginator();
}

function renderPaginator() {
	maxPages = Math.ceil(mapMarkersV2.length / PAGE_LENGTH);
  	let paginator = '<section id="homes-paginator">';
  
  	if (maxPages > 1 && currentPage !== 1) {
    	paginator += `<span class="prev-button">PREV</span>`;
    }
  
  	for (let i = 1; i <= maxPages; i++) {
    	paginator += `<span class="page-number ${ i === currentPage ? 'current-page' : '' }">${i}</span>`;
    }
  
  	if (maxPages > 1 && currentPage !== maxPages) {
    	paginator += `<span class="next-button">NEXT</span>`;
    }
  
  	paginator += '</section>';
  
  	document.getElementById('homes-paginator').innerHTML = paginator;
}

function sliceHomes(){
	homeListing = mapMarkersV2.slice((currentPage - 1) * PAGE_LENGTH, currentPage * PAGE_LENGTH);
}

jQuery(document).on('click','span.page-number', function(){
  	jQuery(this).addClass('current-page');	
  
  	currentPage = Number(jQuery(this).text());
 
  	renderHomeListing();
});

jQuery(document).on('click', '.prev-button', function(){
  jQuery('span.page-number.current-page').prev().click();
});

jQuery(document).on('click', '.next-button', function(){
  jQuery('span.page-number.current-page').next().click();
});


function homeListingTemplate( homecity ) {
    return `
    <section id="home-${homecity.id}" class="home-listing-item col-lg-6" style="position: relative;">
        <figure>
			<a href="${homecity.detailsUrl}"><img loading="lazy" class="home lazy" data-src="${homecity.image}" src="${homecity.image}"/>
			</a>
        </figure>
        <div class="home-info">
            <p class="title-and-price">
                <b class="home-title">${homecity.title}</b>
				<b class="home-price"><i class="icon-price"></i>${homecity.price}</b>
            </p>
            <p class="home-type"><i class="icon-residential"></i>${homecity.apartmentType}</p>
            <p class="home-info-details">
                <span class="home-bed"><i class="icon-bed"></i>${homecity.bedroom}</span>
                <span class="home-bath"><i class="icon-bath"></i>${homecity.bathroom}</span>
				<span class="home-sqft"><i class="icon-sin-título-1-copia"></i>${homecity.sqft}</span>
            </p>
			<div class="home-actions">
            	<a class="home-details" href="${homecity.detailsUrl}" title="Get details" target="_blank"><i class="icon-info"></i><span>Get Details</span></a>
				<a class="home-sharer" href="#" data-home-id="${homecity.id}" title="Share"><i class="icon-share"></i><span>Share</span></a>
			</div>
			<section class="home-share-overlay" data-home-id="${homecity.id}">
				<a class="facebook" href="${homecity.facebookUrl}" target="_blank"><i class="icon-facebook"></i></a>
              	<a class="twitter" href="${homecity.twitterUrl}" target="_blank"><i class="icon-twitter "></i></a>
              	<a class="pinterest" href="${homecity.pinterestUrl}" target="_blank"><i class="icon-pinterest"></i></a>
			</section>
        </div>
    </section>`;
}

jQuery(document).on('click', 'a.home-sharer', function(event){
	event.preventDefault();
  	let homeId = jQuery(this).data('home-id');
	jQuery(`#home-${homeId}`).addClass('with-sharer-overlay');
})

jQuery(document).on('click', 'section.home-share-overlay', function(event){  
    let homeId = jQuery(this).data('home-id');
	jQuery(`#home-${homeId}`).removeClass('with-sharer-overlay');
})
