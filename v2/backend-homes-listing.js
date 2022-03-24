var homes = [];
var formattedHomes = [];
var homeSlice = [];
var currentPage = 1;
var maxPages = 0;
var PAGE_LENGTH = 10;

jQuery(document).ready(function () {
    homes = JSON.parse(document.getElementById('home-json').innerText);
    homes = homes.sort(function(a, b){return a.custom_fields.price_v - b.custom_fields.price_v}); // sort by price
    formatHomes();
   	renderHomeListing();
});

jQuery(document).on('keyup', '#homes-search', function(){
  	currentPage = 1;
    formatHomes();
   	renderHomeListing();
})

function formatHomes(){
  let homesWithLatAndLong = homes.filter( home => home.custom_fields.coordinates_group.latitude && home.custom_fields.coordinates_group.longitud );
  formattedHomes = homesWithLatAndLong.map( function( home ){
    let marker = {
      id: home.id,
      latitude: Number(home.custom_fields.coordinates_group.latitude),
      longitude: Number(home.custom_fields.coordinates_group.longitud),
      title: home.title,
      image: home.custom_fields.gallery.length && home.custom_fields.gallery[0].sizes && home.custom_fields.gallery[0].sizes.list_img_crop ? home.custom_fields.gallery[0].sizes.list_img_crop : '/wp-content/uploads/2021/11/Pending-Refresh-II.jpeg',

      editUrl: home.edit_url,
      deleteUrl: home.delete_url,

      availability: home.date ? home.date : 'N/A',
      apartmentType: home.custom_fields.type.join('/'),
      bathroom: home.custom_fields.bath,
      sqft: home.sqft,
      parkinglot: home.custom_fields.garage,
      prettyPrice: home.pretty_price,
      price: home.pretty_price == 0 ? 'Coming Soon' : home.pretty_price,
      bedroom: home.custom_fields.beds,
      description: home.description,
      detailsUrl: home.permalink,
      markerImage: home.marker,
    }
    return marker;
  } ).filter(h => {
		if ( document.getElementById('homes-search').value === '' ) {
        	return true;
        } else {
        	let text = document.getElementById('homes-search').value;
          	if ( JSON.stringify( Object.assign({}, h, {editUrl: '', deleteUrl: '', detailsUrl: '', image: '', markerImage: '', description: ''}) ).search( text ) !== -1 ) {
            	return true;
            } else {
            	return false;
            }
        }
  } );
}

function renderHomeListing() {
  	sliceHomes();
	document.getElementById('homes-listing').innerHTML = '<div class="row">' + homeSlice.map( homeListingTemplate ).join('') + '</div>';
    
    renderPaginator();
}

function renderPaginator() {
	maxPages = Math.ceil(formattedHomes.length / PAGE_LENGTH);
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
	homeSlice = formattedHomes.slice((currentPage - 1) * PAGE_LENGTH, currentPage * PAGE_LENGTH);
}

jQuery(document).on('click','span.page-number', function(){
  	jQuery(this).addClass('current-page');	
  
  	currentPage = Number(jQuery(this).text());
 
  	renderHomeListing();
});

jQuery(document).on('change','select#page-size', function(){
	PAGE_LENGTH = this.value;
	currentPage = 1;
  	renderHomeListing();
});

jQuery(document).on('click', '.prev-button', function(){
  jQuery('span.page-number.current-page').prev().click();
});

jQuery(document).on('click', '.next-button', function(){
  jQuery('span.page-number.current-page').next().click();
});


function homeListingTemplate( home ) {
    return `
    <section id="home-${home.id}" class="home-listing-item col-lg-6" style="position: relative;">
        <figure>
            <a href="${home.detailsUrl}"><img loading="lazy" class="home" src="${home.image}" /></a>
        </figure>
        <div class="home-info">
            <p class="title-and-price">
                <b class="home-title">${home.title}</b>
                <b class="home-price">$${home.price}</b>
            </p>
            <p class="home-type"><i class="icon-residential"></i>${home.apartmentType}</p>
            <p>
                <span class="home-bed"><i class="icon-bed"></i>${home.bedroom}</span>
                <span class="home-bath"><i class="icon-bath"></i>${home.bathroom}</span>
				<span class="home-sqft"><i class="icon-sin-título-1-copia"></i>${home.sqft}</span>
            </p>
			<div class="home-actions">
				<a class="home-sharer" href="#" data-home-id="${home.id}" title="Actions"><i class="icon-share"></i><span>Actions</span></a>
			</div>
			<section class="home-share-overlay" data-home-id="${home.id}">
				<a class="facebook" href="${home.editUrl}" target="_blank">
					<svg width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.1931 1.6501L23.1529 1.6129C22.3849 0.900459 21.3893 0.508057 20.3496 0.508057C19.184 0.508057 18.0649 1.00915 17.2791 1.88273L2.42073 18.4023C2.2853 18.5528 2.18257 18.7305 2.11907 18.9239L0.371945 24.2429C0.169946 24.8578 0.271328 25.5379 0.643095 26.062C1.01783 26.5902 1.62153 26.9056 2.25813 26.9056H2.25823C2.53359 26.9056 2.80273 26.8481 3.058 26.7346L8.11659 24.4872C8.30051 24.4056 8.4655 24.2856 8.60083 24.1351L23.4593 7.61559C25.0054 5.89669 24.8862 3.22078 23.1931 1.6501ZM3.71938 23.2603L4.74458 20.1392L4.83104 20.043L6.77414 21.8453L6.68767 21.9415L3.71938 23.2603ZM21.3408 5.65037L8.70929 19.694L6.7662 17.8917L19.3977 3.84795C19.6447 3.57326 19.9828 3.42194 20.3497 3.42194C20.6715 3.42194 20.9798 3.54354 21.2183 3.7648L21.2584 3.802C21.7829 4.28852 21.8198 5.11772 21.3408 5.65037Z" fill="#82BA50"/>
					</svg>
				</a>
              	<a class="twitter" href="javascript:deleteHome('${home.title}', '${home.deleteUrl}')">
                  	<svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.7704 8.88046L14.8109 8.80859L14.3861 20.4094L16.3455 20.481L16.7704 8.88046Z" fill="#82BA50"/>
                      <path d="M12.9803 8.84448H11.0196V20.4453H12.9803V8.84448Z" fill="#82BA50"/>
                      <path d="M9.61349 20.409L9.18869 8.80811L7.22928 8.88002L7.65413 20.4808L9.61349 20.409Z" fill="#82BA50"/>
                      <path d="M0.333832 4.00806V5.96874H2.37689L3.99769 24.3873C4.04213 24.8934 4.46601 25.2817 4.97412 25.2817H18.9928C19.501 25.2817 19.9252 24.8932 19.9693 24.3869L21.5901 5.96874H23.6662V4.00806H0.333832ZM18.0949 23.321H5.87184L4.3451 5.96874H19.6219L18.0949 23.321Z" fill="#82BA50"/>
                      <path d="M15.2025 0.25H8.79751C7.89656 0.25 7.1636 0.982958 7.1636 1.8839V4.98836H9.12429V2.21068H14.8757V4.98836H16.8364V1.8839C16.8364 0.982958 16.1034 0.25 15.2025 0.25Z" fill="#82BA50"/>
                  	</svg>
				</a>
              	<a class="pinterest" href="${home.detailsUrl}" target="_blank">
                    <svg width="27" height="15" viewBox="0 0 27 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25.7368 6.55552C25.5161 6.30109 20.2422 0.333252 13.5002 0.333252C6.75791 0.333252 1.48417 6.30109 1.26298 6.55577C0.829006 7.05465 0.829006 7.77852 1.26323 8.2779C1.48417 8.53233 6.75791 14.4999 13.5002 14.4999C20.2422 14.4999 25.5161 8.53183 25.7371 8.2774C26.1711 7.77852 26.1711 7.05465 25.7368 6.55552ZM15.5595 3.9182C16.0129 3.67624 16.6451 3.95387 16.9714 4.53805C17.2977 5.12249 17.1947 5.79249 16.7413 6.03444C16.2882 6.27665 15.6557 5.99877 15.3292 5.41458C15.0031 4.83015 15.1059 4.16015 15.5595 3.9182ZM13.5002 12.3378C8.79051 12.3378 4.82711 8.80147 3.45529 7.41659C4.38165 6.48119 6.49079 4.56574 9.21274 3.42032C8.68182 4.21004 8.37057 5.15367 8.37057 6.16939C8.37057 8.93917 10.667 11.1844 13.4999 11.1844C16.3328 11.1844 18.6295 8.93917 18.6295 6.16939C18.6295 5.15367 18.3185 4.21004 17.7876 3.42032C20.5095 4.56599 22.6184 6.48119 23.5448 7.41659C22.173 8.80222 18.2096 12.3378 13.5002 12.3378Z" fill="#82BA50"/>
                    </svg>

				</a>
			</section>
        </div>
    </section>`;
}

jQuery(document).on('click', 'a.home-sharer', function(event){
	event.preventDefault();
  	let homeId = jQuery(this).data('home-id');
	jQuery(`#home-${homeId}`).addClass('with-sharer-overlay');
});

jQuery(document).on('click', 'section.home-share-overlay', function(event){  
    let homeId = jQuery(this).data('home-id');
	jQuery(`#home-${homeId}`).removeClass('with-sharer-overlay');
});

function deleteHome(title, deleteUrl){
    bootbox.dialog({
        title: 'CONFIRM',
        centerVertical: true,
        closeButton: false,
        message: '<div class="text-center">Are you sure you want to delete: <span style="display: block; color: #000;">' + title + '</span></div>',
        buttons: {
            confirm: {
                label: 'DELETE',
                className: 'morgan-bootbox-btn-confirm',
                callback: function ( result ) {
                    window.location.href = deleteUrl
                }
            },
            cancel: {
                label: 'CANCEL',
                className: 'morgan-bootbox-btn-cancel'
            }
        },
    });
}