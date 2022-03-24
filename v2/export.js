//Print listing of houses
function exportHomesPDF(event) {
  	//Getting filter values  
  	var state = document.querySelector('input[name="state"]:checked').value
    var lot = document.querySelector('#available-lot-switch').checked;
  	var ready = document.querySelector('#move-in-ready-switch').checked;
  	var construction = document.querySelector('#under-construction-switch').checked;
  	let price = document.getElementById('price') 
    let price2 = price.options[price.selectedIndex].text
  	var city = document.getElementById('city').value
 	let radio = document.getElementById('radio') 
    let radio2 = radio.options[radio.selectedIndex].text
    
  var div = document.getElementById('homes-filters')
    
    var transformInfoToHtml = function (mapMarkersV2) {
        var html = '<tbody>'
        mapMarkersV2.forEach(data => {
            html += `
            <section id="home-${data.id}" class="home-listing-item col-lg-6 salto" style="position: relative;">
                <figure>
                    <a href="${data.detailsUrl}"><img loading="lazy" class="home lazy" src="${data.image}"/></a>
                </figure>
                <div class="home-info">
                    <p class="title-and-price">
                        <b class="home-title">${data.title}</b>
                        <b class="home-price">$${data.prettyPrice}</b>
                    </p>
                    <p class="home-type"><i class="icon-residential"></i>${data.apartmentType}</p>
                    <p>
                        <span class="home-bed"><i class="icon-bed"></i>${data.bedroom}</span>
                        <span class="home-bath"><i class="icon-bath"></i>${data.bathroom}</span>
                        <span class="home-sqft"><i class="icon-sin-título-1-copia"></i>${data.sqft}</span>
                    </p>                
                </div>
            </section>`
        })
        return html + '</tbody>'
    }
    
    //Filters
    var transformFiltersToHtml = function () {
        var html = '<tbody>'
        html += `<section id="state-filter" class="text-center">`
        switch (state) {
  			case "arizona":
    			html += `<label class="check-container form-check form-check-inline"><span class="filter-label">Arizona</span><input
              	type="radio" name="state" value="arizona" checked><span class="checkmark"></span></label>
      			<label class="check-container form-check form-check-inline"><span class="filter-label">Colorado</span><input
              	type="radio" name="state" value="colorado"><span class="checkmark"></span></label>`
    			break
           	case "colorado":
            	html += `<label class="check-container form-check form-check-inline"><span class="filter-label">Arizona</span><input
              	type="radio" name="state" value="arizona"><span class="checkmark"></span></label>
      			<label class="check-container form-check form-check-inline"><span class="filter-label">Colorado</span><input
              	type="radio" name="state" value="colorado" checked><span class="checkmark"></span></label>`
                break
        }
      	html += `</section><br><section id="home-status-filter" class="d-flex justify-content-center flex-wrap">`
        switch (lot){
          case true:
            html += `<div class="home-status-inline-switch">
          				<div class="onoffswitch">
              				<input type="checkbox" name="term" value="available-lot" class="onoffswitch-checkbox" id="available-lot-switch"
                  				tabindex="0" checked>
              				<label class="onoffswitch-label" for="available-lot-switch">
                  				<span class="onoffswitch-inner"></span>
                  				<span class="onoffswitch-switch"></span>
              				</label>
          				</div>
          				<span class="filter-label">Available Lots</span>
      					</div>`
            break
            case false:
            	html += `<div class="home-status-inline-switch">
          				<div class="onoffswitch">
              				<input type="checkbox" name="term" value="available-lot" class="onoffswitch-checkbox" id="available-lot-switch"
                  				tabindex="0">
              				<label class="onoffswitch-label" for="available-lot-switch">
                  				<span class="onoffswitch-inner"></span>
                  				<span class="onoffswitch-switch"></span>
              				</label>
          				</div>
          				<span class="filter-label">Available Lots</span>
      					</div>`
                break
        }
      	switch(ready){
          case true: html += `<div class="home-status-inline-switch">
          	<div class="onoffswitch">
              	<input type="checkbox" name="term" value="move-in-ready" class="onoffswitch-checkbox" id="move-in-ready-switch"
                  	tabindex="0" checked>
              	<label class="onoffswitch-label" for="move-in-ready-switch">
                  <span class="onoffswitch-inner"></span>
                  <span class="onoffswitch-switch"></span>
              	</label>
          	</div>
          	<span class="filter-label">Move-in Ready</span>
      		</div>`
          break
          case false:
            html += `<div class="home-status-inline-switch">
          	<div class="onoffswitch">
              	<input type="checkbox" name="term" value="move-in-ready" class="onoffswitch-checkbox" id="move-in-ready-switch"
                  	tabindex="0">
              	<label class="onoffswitch-label" for="move-in-ready-switch">
                  <span class="onoffswitch-inner"></span>
                  <span class="onoffswitch-switch"></span>
              	</label>
          	</div>
          	<span class="filter-label">Move-in Ready</span>
      		</div>`
            break
        }        
      	switch (construction){
          case true:
            html += `<div class="home-status-inline-switch">
          		<div class="onoffswitch">
              	<input type="checkbox" name="term" value="under-construction" class="onoffswitch-checkbox" id="under-construction-switch"
                 	 tabindex="0" checked>
             	 <label class="onoffswitch-label" for="under-construction-switch">
                  	<span class="onoffswitch-inner"></span>
                	  <span class="onoffswitch-switch"></span>
             	 </label>
         	 </div>
          	<span class="filter-label">Under Construction</span>
      		</div>`
            break
            case false: 
            	html += `<div class="home-status-inline-switch">
          		<div class="onoffswitch">
              	<input type="checkbox" name="term" value="under-construction" class="onoffswitch-checkbox" id="under-construction-switch"
                 	 tabindex="0">
             	 <label class="onoffswitch-label" for="under-construction-switch">
                  	<span class="onoffswitch-inner"></span>
                	  <span class="onoffswitch-switch"></span>
             	 </label>
         	 </div>
          	<span class="filter-label">Under Construction</span>
      		</div>`
            break
        }
      	html += `</section><br><section id="fields-filter" class="d-flex justify-content-center flex-wrap">`
        
        html += `<div class="home-filter">
        <label for="city" style="font-size: 12px; font-weight: 600;">Price</label><br>
      <span class="icon-f price-s"></span>
      <input type="text" id="price" style="height: 38px; width: 160px; font-size: 13px; font-weight: 600;" placeholder="${price2}">
    </div>`                
        
        html += `<div class="home-filter">
        <label for="city" style="font-size: 12px; font-weight: 600;">City</label><br>
      <span class="icon-f city-s"></span>
      <input type="text" id="city" style="height: 38px; width: 160px; font-size: 13px; font-weight: 600;" placeholder="${city}">
    </div>`
        
        html += `<div class="home-filter">
        <label for="city" style="font-size: 12px; font-weight: 600;">Radius</label><br>
      <span class="icon-f city-s"></span>
      <input type="text" id="radio" style="height: 38px; width: 160px; font-size: 13px; font-weight: 600;" placeholder="${radio2}">
    </div>`     
        return html + '</section></div><br></tbody>'
    }
    
    var singleIncidentPrintWindow = window.open('', '_blank', 'titlebar=0;menubar=0;toolbar=0')
    singleIncidentPrintWindow.document.write(`
    
    <!DOCTYPE html>
<html>
<head>
<style>

.fl-builder-content *,.fl-builder-content *:before,.fl-builder-content *:after {-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}.fl-row:before,.fl-row:after,.fl-row-content:before,.fl-row-content:after,.fl-col-group:before,.fl-col-group:after,.fl-col:before,.fl-col:after,.fl-module:before,.fl-module:after,.fl-module-content:before,.fl-module-content:after {display: table;content: " ";}.fl-row:after,.fl-row-content:after,.fl-col-group:after,.fl-col:after,.fl-module:after,.fl-module-content:after {clear: both;}.fl-row,.fl-row-content,.fl-col-group,.fl-col,.fl-module,.fl-module-content {zoom:1;}.fl-clear {clear: both;}.fl-clearfix:before,.fl-clearfix:after {display: table;content: " ";}.fl-clearfix:after {clear: both;}.fl-clearfix {zoom:1;}.fl-visible-medium,.fl-visible-medium-mobile,.fl-visible-mobile,.fl-col-group .fl-visible-medium.fl-col,.fl-col-group .fl-visible-medium-mobile.fl-col,.fl-col-group .fl-visible-mobile.fl-col {display: none;}.fl-row,.fl-row-content {margin-left: auto;margin-right: auto;}.fl-row-content-wrap {position: relative;}.fl-builder-mobile .fl-row-bg-photo .fl-row-content-wrap {background-attachment: scroll;}.fl-row-bg-video,.fl-row-bg-video .fl-row-content {position: relative;}.fl-row-bg-video .fl-bg-video {bottom: 0;left: 0;overflow: hidden;position: absolute;right: 0;top: 0;}.fl-row-bg-video .fl-bg-video video {bottom: 0;left: 0px;max-width: none;position: absolute;right: 0;top: 0px;}.fl-row-bg-video .fl-bg-video iframe {pointer-events: none;width: 100vw;height: 56.25vw; max-width: none;min-height: 100vh;min-width: 177.77vh; position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%); -webkit-transform: translate(-50%, -50%); }.fl-bg-video-fallback {background-position: 50% 50%;background-repeat: no-repeat;background-size: cover;bottom: 0px;left: 0px;position: absolute;right: 0px;top: 0px;}.fl-row-bg-slideshow,.fl-row-bg-slideshow .fl-row-content {position: relative;}.fl-row .fl-bg-slideshow {bottom: 0;left: 0;overflow: hidden;position: absolute;right: 0;top: 0;z-index: 0;}.fl-builder-edit .fl-row .fl-bg-slideshow * {bottom: 0;height: auto !important;left: 0;position: absolute !important;right: 0;top: 0;}.fl-row-bg-overlay .fl-row-content-wrap:after {border-radius: inherit;content: '';display: block;position: absolute;top: 0;right: 0;bottom: 0;left: 0;z-index: 0;}.fl-row-bg-overlay .fl-row-content {position: relative;z-index: 1;}.fl-row-full-height .fl-row-content-wrap,.fl-row-custom-height .fl-row-content-wrap {display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;min-height: 100vh;}.fl-row-overlap-top .fl-row-content-wrap {display: -webkit-inline-box;display: -webkit-inline-flex;display: -moz-inline-box;display: -ms-inline-flexbox;display: inline-flex;width: 100%;}.fl-row-custom-height .fl-row-content-wrap {min-height: 0;}.fl-builder-edit .fl-row-full-height .fl-row-content-wrap {min-height: calc( 100vh - 48px );}.fl-row-full-height .fl-row-content,.fl-row-custom-height .fl-row-content {-webkit-box-flex: 1 1 auto; -moz-box-flex: 1 1 auto;-webkit-flex: 1 1 auto;-ms-flex: 1 1 auto;flex: 1 1 auto;}.fl-row-full-height .fl-row-full-width.fl-row-content,.fl-row-custom-height .fl-row-full-width.fl-row-content {max-width: 100%;width: 100%;}.fl-builder-ie-11 .fl-row.fl-row-full-height:not(.fl-visible-medium):not(.fl-visible-medium-mobile):not(.fl-visible-mobile),.fl-builder-ie-11 .fl-row.fl-row-custom-height:not(.fl-visible-medium):not(.fl-visible-medium-mobile):not(.fl-visible-mobile) {display: flex;flex-direction: column;height: 100%;}.fl-builder-ie-11 .fl-row-full-height .fl-row-content-wrap,.fl-builder-ie-11 .fl-row-custom-height .fl-row-content-wrap {height: auto;}.fl-builder-ie-11 .fl-row-full-height .fl-row-content,.fl-builder-ie-11 .fl-row-custom-height .fl-row-content {flex: 0 0 auto;flex-basis: 100%;margin: 0;}.fl-builder-ie-11 .fl-row-full-height.fl-row-align-top .fl-row-content,.fl-builder-ie-11 .fl-row-full-height.fl-row-align-bottom .fl-row-content,.fl-builder-ie-11 .fl-row-custom-height.fl-row-align-top .fl-row-content,.fl-builder-ie-11 .fl-row-custom-height.fl-row-align-bottom .fl-row-content {margin: 0 auto;}.fl-builder-ie-11 .fl-row-full-height.fl-row-align-center .fl-col-group:not(.fl-col-group-equal-height),.fl-builder-ie-11 .fl-row-custom-height.fl-row-align-center .fl-col-group:not(.fl-col-group-equal-height) {display: flex;align-items: center;justify-content: center;-webkit-align-items: center;-webkit-box-align: center;-webkit-box-pack: center;-webkit-justify-content: center;-ms-flex-align: center;-ms-flex-pack: center;}.fl-row-full-height.fl-row-align-center .fl-row-content-wrap,.fl-row-custom-height.fl-row-align-center .fl-row-content-wrap {align-items: center;justify-content: center;-webkit-align-items: center;-webkit-box-align: center;-webkit-box-pack: center;-webkit-justify-content: center;-ms-flex-align: center;-ms-flex-pack: center;}.fl-row-full-height.fl-row-align-bottom .fl-row-content-wrap,.fl-row-custom-height.fl-row-align-bottom .fl-row-content-wrap {align-items: flex-end;justify-content: flex-end;-webkit-align-items: flex-end;-webkit-justify-content: flex-end;-webkit-box-align: end;-webkit-box-pack: end;-ms-flex-align: end;-ms-flex-pack: end;}.fl-builder-ie-11 .fl-row-full-height.fl-row-align-bottom .fl-row-content-wrap,.fl-builder-ie-11 .fl-row-custom-height.fl-row-align-bottom .fl-row-content-wrap {justify-content: flex-start;-webkit-justify-content: flex-start;}@media all and (device-width: 768px) and (device-height: 1024px) and (orientation:portrait){.fl-row-full-height .fl-row-content-wrap{min-height: 1024px;}}@media all and (device-width: 1024px) and (device-height: 768px) and (orientation:landscape){.fl-row-full-height .fl-row-content-wrap{min-height: 768px;}}@media screen and (device-aspect-ratio: 40/71) {.fl-row-full-height .fl-row-content-wrap {min-height: 500px;}}.fl-col-group-equal-height,.fl-col-group-equal-height .fl-col,.fl-col-group-equal-height .fl-col-content{display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;}.fl-col-group-equal-height{-webkit-flex-wrap: wrap;-ms-flex-wrap: wrap;flex-wrap: wrap;width: 100%;}.fl-col-group-equal-height.fl-col-group-has-child-loading {-webkit-flex-wrap: nowrap;-ms-flex-wrap: nowrap;flex-wrap: nowrap;}.fl-col-group-equal-height .fl-col,.fl-col-group-equal-height .fl-col-content{-webkit-box-flex: 1 1 auto; -moz-box-flex: 1 1 auto;-webkit-flex: 1 1 auto;-ms-flex: 1 1 auto;flex: 1 1 auto;}.fl-col-group-equal-height .fl-col-content{-webkit-box-orient: vertical; -webkit-box-direction: normal;-webkit-flex-direction: column;-ms-flex-direction: column;flex-direction: column; flex-shrink: 1; min-width: 1px; max-width: 100%;width: 100%;}.fl-col-group-equal-height:before,.fl-col-group-equal-height .fl-col:before,.fl-col-group-equal-height .fl-col-content:before,.fl-col-group-equal-height:after,.fl-col-group-equal-height .fl-col:after,.fl-col-group-equal-height .fl-col-content:after{content: none;}.fl-col-group-equal-height.fl-col-group-align-center .fl-col-content {align-items: center;justify-content: center;-webkit-align-items: center;-webkit-box-align: center;-webkit-box-pack: center;-webkit-justify-content: center;-ms-flex-align: center;-ms-flex-pack: center;}.fl-col-group-equal-height.fl-col-group-align-bottom .fl-col-content {justify-content: flex-end;-webkit-justify-content: flex-end;-webkit-box-align: end;-webkit-box-pack: end;-ms-flex-pack: end;}.fl-col-group-equal-height.fl-col-group-align-center .fl-module,.fl-col-group-equal-height.fl-col-group-align-center .fl-col-group {width: 100%;}.fl-builder-ie-11 .fl-col-group-equal-height,.fl-builder-ie-11 .fl-col-group-equal-height .fl-col,.fl-builder-ie-11 .fl-col-group-equal-height .fl-col-content,.fl-builder-ie-11 .fl-col-group-equal-height .fl-module,.fl-col-group-equal-height.fl-col-group-align-center .fl-col-group {min-height: 1px;}.fl-col {float: left;min-height: 1px;}.fl-col-bg-overlay .fl-col-content {position: relative;}.fl-col-bg-overlay .fl-col-content:after {border-radius: inherit;content: '';display: block;position: absolute;top: 0;right: 0;bottom: 0;left: 0;z-index: 0;}.fl-col-bg-overlay .fl-module {position: relative;z-index: 2;}.fl-module img {max-width: 100%;}.fl-builder-module-template {margin: 0 auto;max-width: 1100px;padding: 20px;}.fl-builder-content a.fl-button,.fl-builder-content a.fl-button:visited {border-radius: 4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;display: inline-block;font-size: 16px;font-weight: normal;line-height: 18px;padding: 12px 24px;text-decoration: none;text-shadow: none;}.fl-builder-content .fl-button:hover {text-decoration: none;}.fl-builder-content .fl-button:active {position: relative;top: 1px;}.fl-builder-content .fl-button-width-full .fl-button {display: block;text-align: center;}.fl-builder-content .fl-button-width-custom .fl-button {display: inline-block;text-align: center;max-width: 100%;}.fl-builder-content .fl-button-left {text-align: left;}.fl-builder-content .fl-button-center {text-align: center;}.fl-builder-content .fl-button-right {text-align: right;}.fl-builder-content .fl-button i {font-size: 1.3em;height: auto;margin-right:8px;vertical-align: middle;width: auto;}.fl-builder-content .fl-button i.fl-button-icon-after {margin-left: 8px;margin-right: 0;}.fl-builder-content .fl-button-has-icon .fl-button-text {vertical-align: middle;}.fl-icon-wrap {display: inline-block;}.fl-icon {display: table-cell;vertical-align: middle;}.fl-icon a {text-decoration: none;}.fl-icon i {float: left;height: auto;width: auto;}.fl-icon i:before {border: none !important;height: auto;width: auto;}.fl-icon-text {display: table-cell;text-align: left;padding-left: 15px;vertical-align: middle;}.fl-icon-text-empty {display: none;}.fl-icon-text *:last-child {margin: 0 !important;padding: 0 !important;}.fl-icon-text a {text-decoration: none;}.fl-icon-text span {display: block;}.fl-icon-text span.mce-edit-focus {min-width: 1px;}.fl-photo {line-height: 0;position: relative;}.fl-photo-align-left {text-align: left;}.fl-photo-align-center {text-align: center;}.fl-photo-align-right {text-align: right;}.fl-photo-content {display: inline-block;line-height: 0;position: relative;max-width: 100%;}.fl-photo-img-svg {width: 100%;}.fl-photo-content img {display: inline;height: auto;max-width: 100%;}.fl-photo-crop-circle img {-webkit-border-radius: 100%;-moz-border-radius: 100%;border-radius: 100%;}.fl-photo-caption {font-size: 13px;line-height: 18px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}.fl-photo-caption-below {padding-bottom: 20px;padding-top: 10px;}.fl-photo-caption-hover {background: rgba(0,0,0,0.7);bottom: 0;color: #fff;left: 0;opacity: 0;filter: alpha(opacity = 0);padding: 10px 15px;position: absolute;right: 0;-webkit-transition:opacity 0.3s ease-in;-moz-transition:opacity 0.3s ease-in;transition:opacity 0.3s ease-in;}.fl-photo-content:hover .fl-photo-caption-hover {opacity: 100;filter: alpha(opacity = 100);}.fl-builder-pagination,.fl-builder-pagination-load-more {padding: 40px 0;}.fl-builder-pagination ul.page-numbers {list-style: none;margin: 0;padding: 0;text-align: center;}.fl-builder-pagination li {display: inline-block;list-style: none;margin: 0;padding: 0;}.fl-builder-pagination li a.page-numbers,.fl-builder-pagination li span.page-numbers {border: 1px solid #e6e6e6;display: inline-block;padding: 5px 10px;margin: 0 0 5px;}.fl-builder-pagination li a.page-numbers:hover,.fl-builder-pagination li span.current {background: #f5f5f5;text-decoration: none;}.fl-slideshow,.fl-slideshow * {-webkit-box-sizing: content-box;-moz-box-sizing: content-box;box-sizing: content-box;}.fl-slideshow .fl-slideshow-image img {max-width: none !important;}.fl-slideshow-social {line-height: 0 !important;}.fl-slideshow-social * {margin: 0 !important;}.fl-builder-content .bx-wrapper .bx-viewport {background: transparent;border: none;box-shadow: none;-moz-box-shadow: none;-webkit-box-shadow: none;left: 0;}.mfp-wrap button.mfp-arrow,.mfp-wrap button.mfp-arrow:active,.mfp-wrap button.mfp-arrow:hover,.mfp-wrap button.mfp-arrow:focus {background: transparent !important;border: none !important;outline: none;position: absolute;top: 50%;box-shadow: none !important;-moz-box-shadow: none !important;-webkit-box-shadow: none !important;}.mfp-wrap .mfp-close,.mfp-wrap .mfp-close:active,.mfp-wrap .mfp-close:hover,.mfp-wrap .mfp-close:focus {background: transparent !important;border: none !important;outline: none;position: absolute;top: 0;box-shadow: none !important;-moz-box-shadow: none !important;-webkit-box-shadow: none !important;}.admin-bar .mfp-wrap .mfp-close,.admin-bar .mfp-wrap .mfp-close:active,.admin-bar .mfp-wrap .mfp-close:hover,.admin-bar .mfp-wrap .mfp-close:focus {top: 32px!important;}img.mfp-img {padding: 0;}.mfp-counter {display: none;}.mfp-wrap .mfp-preloader.fa {font-size: 30px;}.fl-form-field {margin-bottom: 15px;}.fl-form-field input.fl-form-error {border-color: #DD6420;}.fl-form-error-message {clear: both;color: #DD6420;display: none;padding-top: 8px;font-size: 12px;font-weight: lighter;}.fl-form-button-disabled {opacity: 0.5;}.fl-animation {opacity: 0;}.fl-builder-preview .fl-animation,.fl-builder-edit .fl-animation,.fl-animated {opacity: 1;}.fl-animated {animation-fill-mode: both;-webkit-animation-fill-mode: both;}.fl-button.fl-button-icon-animation i {width: 0 !important;opacity: 0;-ms-filter: "alpha(opacity=0)";transition: all 0.2s ease-out;-webkit-transition: all 0.2s ease-out;}.fl-button.fl-button-icon-animation:hover i {opacity: 1! important;-ms-filter: "alpha(opacity=100)";}.fl-button.fl-button-icon-animation i.fl-button-icon-after {margin-left: 0px !important;}.fl-button.fl-button-icon-animation:hover i.fl-button-icon-after {margin-left: 10px !important;}.fl-button.fl-button-icon-animation i.fl-button-icon-before {margin-right: 0 !important;}.fl-button.fl-button-icon-animation:hover i.fl-button-icon-before {margin-right: 20px !important;margin-left: -10px;}.single:not(.woocommerce).single-fl-builder-template .fl-content {width: 100%;}.fl-builder-layer {position: absolute;top:0;left:0;right: 0;bottom: 0;z-index: 0;pointer-events: none;overflow: hidden;}.fl-builder-shape-layer {z-index: 0;}.fl-builder-shape-layer.fl-builder-bottom-edge-layer {z-index: 1;}.fl-row-bg-overlay .fl-builder-shape-layer {z-index: 1;}.fl-row-bg-overlay .fl-builder-shape-layer.fl-builder-bottom-edge-layer {z-index: 2;}.fl-row-has-layers .fl-row-content {z-index: 1;}.fl-row-bg-overlay .fl-row-content {z-index: 2;}.fl-builder-layer > * {display: block;position: absolute;top:0;left:0;width: 100%;}.fl-builder-layer + .fl-row-content {position: relative;}.fl-builder-layer .fl-shape {fill: #aaa;stroke: none;stroke-width: 0;width:100%;}.fl-builder-content a.fl-button,.fl-builder-content a.fl-button:visited {background: #fafafa;border: 1px solid #ccc;color: #333;}.fl-builder-content a.fl-button *,.fl-builder-content a.fl-button:visited * {color: #333;}.fl-row-content-wrap { margin: 0px; }.fl-row-content-wrap { padding: 20px; }.fl-row-fixed-width { max-width: 1190px; }.fl-col-content { margin: 0px; }.fl-col-content { padding: 0px; }.fl-module-content { margin: 0px; }@media (max-width: 992px) { .fl-visible-desktop,.fl-visible-mobile,.fl-col-group .fl-visible-desktop.fl-col,.fl-col-group .fl-visible-mobile.fl-col {display: none;}.fl-visible-desktop-medium,.fl-visible-medium,.fl-visible-medium-mobile,.fl-col-group .fl-visible-desktop-medium.fl-col,.fl-col-group .fl-visible-medium.fl-col,.fl-col-group .fl-visible-medium-mobile.fl-col {display: block;}.fl-col-group-equal-height .fl-visible-desktop-medium.fl-col,.fl-col-group-equal-height .fl-visible-medium.fl-col,.fl-col-group-equal-height .fl-visible-medium-mobile.fl-col {display: flex;} }@media (max-width: 768px) { .fl-visible-desktop,.fl-visible-desktop-medium,.fl-visible-medium,.fl-col-group .fl-visible-desktop.fl-col,.fl-col-group .fl-visible-desktop-medium.fl-col,.fl-col-group .fl-visible-medium.fl-col,.fl-col-group-equal-height .fl-visible-desktop-medium.fl-col,.fl-col-group-equal-height .fl-visible-medium.fl-col {display: none;}.fl-visible-medium-mobile,.fl-visible-mobile,.fl-col-group .fl-visible-medium-mobile.fl-col,.fl-col-group .fl-visible-mobile.fl-col {display: block;}.fl-row-content-wrap {background-attachment: scroll !important;}.fl-row-bg-parallax .fl-row-content-wrap {background-attachment: scroll !important;background-position: center center !important;}.fl-col-group.fl-col-group-equal-height {display: block;}.fl-col-group.fl-col-group-equal-height.fl-col-group-custom-width {display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;}.fl-col-group.fl-col-group-responsive-reversed {display: -webkit-box;display: -moz-box;display: -ms-flexbox;display: -moz-flex;display: -webkit-flex;display: flex;flex-flow: row wrap;-ms-box-orient: horizontal;-webkit-flex-flow: row wrap;}.fl-col-group.fl-col-group-responsive-reversed .fl-col {-webkit-box-flex: 0 0 100%; -moz-box-flex: 0 0 100%;-webkit-flex: 0 0 100%;-ms-flex: 0 0 100%;flex: 0 0 100%; min-width: 0;}.fl-col-group-responsive-reversed .fl-col:nth-of-type(1) {-webkit-box-ordinal-group: 12; -moz-box-ordinal-group: 12;-ms-flex-order: 12;-webkit-order: 12; order: 12;}.fl-col-group-responsive-reversed .fl-col:nth-of-type(2) {-webkit-box-ordinal-group: 11;-moz-box-ordinal-group: 11;-ms-flex-order: 11;-webkit-order: 11;order: 11;}.fl-col-group-responsive-reversed .fl-col:nth-of-type(3) {-webkit-box-ordinal-group: 10;-moz-box-ordinal-group: 10;-ms-flex-order: 10;-webkit-order: 10;order: 10;}.fl-col-group-responsive-reversed .fl-col:nth-of-type(4) {-webkit-box-ordinal-group: 9;-moz-box-ordinal-group: 9;-ms-flex-order: 9;-webkit-order: 9;order: 9;}.fl-col-group-responsive-reversed .fl-col:nth-of-type(5) {-webkit-box-ordinal-group: 8;-moz-box-ordinal-group: 8;-ms-flex-order: 8;-webkit-order: 8;order: 8;}.fl-col-group-responsive-reversed .fl-col:nth-of-type(6) {-webkit-box-ordinal-group: 7;-moz-box-ordinal-group: 7;-ms-flex-order: 7;-webkit-order: 7;order: 7;}.fl-col-group-responsive-reversed .fl-col:nth-of-type(7) {-webkit-box-ordinal-group: 6;-moz-box-ordinal-group: 6;-ms-flex-order: 6;-webkit-order: 6;order: 6;}.fl-col-group-responsive-reversed .fl-col:nth-of-type(8) {-webkit-box-ordinal-group: 5;-moz-box-ordinal-group: 5;-ms-flex-order: 5;-webkit-order: 5;order: 5;}.fl-col-group-responsive-reversed .fl-col:nth-of-type(9) {-webkit-box-ordinal-group: 4;-moz-box-ordinal-group: 4;-ms-flex-order: 4;-webkit-order: 4;order: 4;}.fl-col-group-responsive-reversed .fl-col:nth-of-type(10) {-webkit-box-ordinal-group: 3;-moz-box-ordinal-group: 3;-ms-flex-order: 3;-webkit-order: 3;order: 3;}.fl-col-group-responsive-reversed .fl-col:nth-of-type(11) {-webkit-box-ordinal-group: 2;-moz-box-ordinal-group: 2;-ms-flex-order: 2;-webkit-order: 2;order: 2;}.fl-col-group-responsive-reversed .fl-col:nth-of-type(12) {-webkit-box-ordinal-group: 1;-moz-box-ordinal-group: 1;-ms-flex-order: 1;-webkit-order: 1;order: 1;}.fl-col {clear: both;float: none;margin-left: auto;margin-right: auto;width: auto !important;}.fl-col-small:not(.fl-col-small-full-width) {max-width: 400px;}.fl-block-col-resize {display:none;}.fl-row[data-node] .fl-row-content-wrap {margin: 0;padding-left: 0;padding-right: 0;}.fl-row[data-node] .fl-bg-video,.fl-row[data-node] .fl-bg-slideshow {left: 0;right: 0;}.fl-col[data-node] .fl-col-content {margin: 0;padding-left: 0;padding-right: 0;} }.page .fl-post-header, .single-fl-builder-template .fl-post-header { display:none; }.fl-node-5e4d58d2f3a13 .fl-row-content {max-width: 686px;} .fl-node-5e4d58d2f3a13 > .fl-row-content-wrap {padding-top:50px;}@media ( max-width: 768px ) { .fl-node-5e4d58d2f3a13.fl-row > .fl-row-content-wrap {padding-right:20px;padding-left:20px;}} .fl-node-5e4d58d2f3a1b > .fl-row-content-wrap {margin-right:0px;margin-left:0px;} .fl-node-5e4d58d2f3a1b > .fl-row-content-wrap {padding-right:0px;padding-bottom:80px;padding-left:0px;} .fl-node-5e5ee54cbdc10 > .fl-row-content-wrap {padding-top:0px;padding-right:0px;padding-bottom:20px;padding-left:0px;}.fl-node-5e4d58d2f3a1a > .fl-row-content-wrap {background-image: url(https://www.morgantaylorhomes.com/wp-content/uploads/2019/09/CTA-FORM-cut.jpg);background-repeat: no-repeat;background-position: center center;background-attachment: scroll;background-size: cover;border-style: solid;border-width: 0;background-clip: border-box;border-color: #ffffff;border-top-width: 0px;border-right-width: 10px;border-bottom-width: 0px;border-left-width: 0px;}@media(max-width: 992px) {.fl-node-5e4d58d2f3a1a > .fl-row-content-wrap {background-image: url(https://www.morgantaylorhomes.com/wp-content/uploads/2019/09/20180103174034395761000000-o.jpg);background-position: center top;}} .fl-node-5e4d58d2f3a1a > .fl-row-content-wrap {margin-right:0px;margin-bottom:10px;margin-left:10px;}@media ( max-width: 992px ) { .fl-node-5e4d58d2f3a1a.fl-row > .fl-row-content-wrap {margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}}@media ( max-width: 768px ) { .fl-node-5e4d58d2f3a1a.fl-row > .fl-row-content-wrap {margin-right:0px;}} .fl-node-5e4d58d2f3a1a > .fl-row-content-wrap {padding-right:0px;padding-left:0px;}@media ( max-width: 992px ) { .fl-node-5e4d58d2f3a1a.fl-row > .fl-row-content-wrap {padding-right:0px;padding-bottom:0px;padding-left:0px;}}@media ( max-width: 768px ) { .fl-node-5e4d58d2f3a1a.fl-row > .fl-row-content-wrap {padding-right:0px;padding-left:0px;}}.fl-node-5e4d58d2f3a17 {width: 100%;}.fl-node-5ed6f08c7a79e {width: 100%;}.fl-node-5e5ee54cbdbe3 {width: 16.667%;}@media(max-width: 768px) {.fl-builder-content .fl-node-5e5ee54cbdbe3 {width: 100% !important;max-width: none;clear: none;float: left;}} .fl-node-5e5ee54cbdbe3 > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}@media ( max-width: 768px ) { .fl-node-5e5ee54cbdbe3.fl-col > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}}.fl-node-5e5ee54cbdbdf {width: 16.667%;}@media(max-width: 768px) {.fl-builder-content .fl-node-5e5ee54cbdbdf {width: 100% !important;max-width: none;clear: none;float: left;}} .fl-node-5e5ee54cbdbdf > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}@media ( max-width: 768px ) { .fl-node-5e5ee54cbdbdf.fl-col > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}}.fl-node-5e5ee54cbdbe2 {width: 16.667%;}@media(max-width: 768px) {.fl-builder-content .fl-node-5e5ee54cbdbe2 {width: 100% !important;max-width: none;clear: none;float: left;}} .fl-node-5e5ee54cbdbe2 > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}@media ( max-width: 768px ) { .fl-node-5e5ee54cbdbe2.fl-col > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}}.fl-node-5e5ee54cbdbe4 {width: 16.667%;}@media(max-width: 768px) {.fl-builder-content .fl-node-5e5ee54cbdbe4 {width: 100% !important;max-width: none;clear: none;float: left;}} .fl-node-5e5ee54cbdbe4 > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}@media ( max-width: 768px ) { .fl-node-5e5ee54cbdbe4.fl-col > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}}.fl-node-5e5ee54cbdbe1 {width: 16.667%;}@media(max-width: 768px) {.fl-builder-content .fl-node-5e5ee54cbdbe1 {width: 100% !important;max-width: none;clear: none;float: left;}} .fl-node-5e5ee54cbdbe1 > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}@media ( max-width: 768px ) { .fl-node-5e5ee54cbdbe1.fl-col > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}}.fl-node-5e5ee54cbdbe0 {width: 16.667%;}@media(max-width: 768px) {.fl-builder-content .fl-node-5e5ee54cbdbe0 {width: 100% !important;max-width: none;clear: none;float: left;}} .fl-node-5e5ee54cbdbe0 > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}@media ( max-width: 768px ) { .fl-node-5e5ee54cbdbe0.fl-col > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}}.fl-node-5e5ee54cbdc09 {width: 16.667%;}@media(max-width: 768px) {.fl-builder-content .fl-node-5e5ee54cbdc09 {width: 100% !important;max-width: none;clear: none;float: left;}} .fl-node-5e5ee54cbdc09 > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}@media ( max-width: 768px ) { .fl-node-5e5ee54cbdc09.fl-col > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}}.fl-node-5e5ee54cbdc08 {width: 16.667%;}@media(max-width: 768px) {.fl-builder-content .fl-node-5e5ee54cbdc08 {width: 100% !important;max-width: none;clear: none;float: left;}} .fl-node-5e5ee54cbdc08 > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}@media ( max-width: 768px ) { .fl-node-5e5ee54cbdc08.fl-col > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}}.fl-node-5e5ee54cbdbed {width: 16.667%;}@media(max-width: 768px) {.fl-builder-content .fl-node-5e5ee54cbdbed {width: 100% !important;max-width: none;clear: none;float: left;}} .fl-node-5e5ee54cbdbed > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}@media ( max-width: 768px ) { .fl-node-5e5ee54cbdbed.fl-col > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}}.fl-node-5e5ee54cbdbec {width: 16.667%;}@media(max-width: 768px) {.fl-builder-content .fl-node-5e5ee54cbdbec {width: 100% !important;max-width: none;clear: none;float: left;}} .fl-node-5e5ee54cbdbec > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}@media ( max-width: 768px ) { .fl-node-5e5ee54cbdbec.fl-col > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}}.fl-node-5e5ee54cbdc07 {width: 16.667%;}@media(max-width: 768px) {.fl-builder-content .fl-node-5e5ee54cbdc07 {width: 100% !important;max-width: none;clear: none;float: left;}} .fl-node-5e5ee54cbdc07 > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}@media ( max-width: 768px ) { .fl-node-5e5ee54cbdc07.fl-col > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}}.fl-node-5e5ee54cbdbeb {width: 16.667%;}@media(max-width: 768px) {.fl-builder-content .fl-node-5e5ee54cbdbeb {width: 100% !important;max-width: none;clear: none;float: left;}} .fl-node-5e5ee54cbdbeb > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}@media ( max-width: 768px ) { .fl-node-5e5ee54cbdbeb.fl-col > .fl-col-content {margin-top:5px;margin-right:5px;margin-bottom:5px;margin-left:5px;}}.fl-node-5d8384bd84d43 {width: 100%;}@media(max-width: 992px) {.fl-builder-content .fl-node-5d8384bd84d43 {width: 100% !important;max-width: none;-webkit-box-flex: 0 1 auto;-moz-box-flex: 0 1 auto;-webkit-flex: 0 1 auto;-ms-flex: 0 1 auto;flex: 0 1 auto;}} .fl-node-5d8384bd84d43 > .fl-col-content {margin-right:150px;margin-left:150px;}@media ( max-width: 768px ) { .fl-node-5d8384bd84d43.fl-col > .fl-col-content {padding-right:20px;padding-left:20px;}}.fl-module-heading .fl-heading {padding: 0 !important;margin: 0 !important;}.fl-node-5e4d58d2f3a18.fl-module-heading .fl-heading {font-size: 30px;line-height: 40px;text-align: center;text-transform: uppercase;}@media(max-width: 768px) {.fl-node-5e4d58d2f3a18.fl-module-heading .fl-heading {font-size: 20px;}} .fl-node-5e4d58d2f3a18 > .fl-module-content {margin-bottom:10px;}@media (max-width: 768px) { .fl-node-5e4d58d2f3a18 > .fl-module-content { margin-bottom:0px; } }.fl-row .fl-col .fl-node-5d8e2f54ca480 h2.fl-heading a,.fl-row .fl-col .fl-node-5d8e2f54ca480 h2.fl-heading .fl-heading-text,.fl-row .fl-col .fl-node-5d8e2f54ca480 h2.fl-heading .fl-heading-text *,.fl-node-5d8e2f54ca480 h2.fl-heading .fl-heading-text {color: #ffffff;}.fl-node-5d8e2f54ca480.fl-module-heading .fl-heading {font-size: 20px;line-height: 27px;text-align: center;}@media(max-width: 768px) {.fl-node-5d8e2f54ca480.fl-module-heading .fl-heading {font-size: 14px;line-height: 18px;}} .fl-node-5d8e2f54ca480 > .fl-module-content {margin-top:70px;margin-right:0px;margin-bottom:20px;}@media ( max-width: 768px ) { .fl-node-5d8e2f54ca480.fl-module > .fl-module-content {margin-top:30px;margin-bottom:20px;}}.fl-builder-content .fl-rich-text strong {font-weight: bold;}.fl-node-5d8384bd84d46 .fl-rich-text, .fl-node-5d8384bd84d46 .fl-rich-text * {font-family: "Nunito Sans", sans-serif;font-weight: 400;font-size: 30px;line-height: 40px;text-align: center;}@media(max-width: 768px) {.fl-node-5d8384bd84d46 .fl-rich-text, .fl-node-5d8384bd84d46 .fl-rich-text * {font-size: 20px;line-height: 24px;}} .fl-node-5d8384bd84d46 > .fl-module-content {margin-bottom:0px;}@media ( max-width: 768px ) { .fl-node-5d8384bd84d46.fl-module > .fl-module-content {margin-bottom:0px;}}h1, h2, h3, .filter-label {font-family: 'Nunito Sans', sans-serif!important;}.popcityname{ font-family: 'Nunito Sans', sans-serif!important;}#call-now-button-desktop .pp-flipbox.pp-flipbox-front,#call-now-button-desktop .pp-flipbox.pp-flipbox-back{padding: 0 20px!important;width: auto;}.acf-field.acf-field-wysiwyg.acf-field--post-content.col-flexi{display: inline-block;text-align: center;margin: 30px 5%;}.col-flexi span{list-style-type: none;display: inline-block;padding: 0 10px;text-align: center!important;}.icon-down-open:before {transform: rotate(-90deg);font-size: 10px!important;line-height: 10px!important;margin-right: 10px;font-weight: 900;}h3.popcityname{font-style: normal;font-weight: 800;font-size: 16px!important;line-height: 22px!important;text-transform: uppercase;color: #000000;}.bestcities-img{margin-right: 30px;margin-top: -20px;}.row.list{float:left!important;}.home_directory{padding-top: 10px;clear: both;}.directory_container{ overflow-y: scroll;max-height: 55vh;clear: both;}.title-homes-list{float:left;font-size: 30px;}.list-items-homes{float: left;clear: both;margin-bottom: 30px;}form[name="frm"]{float: right; }form[name="pages-view"]{clear:both;}.socialToolBox input.edit-home,.socialToolBox .dele-home,.socialToolBox .see-home{border-radius: 50%;width: 15px!important;height: 15px;padding: 10px;}.add-home-icon{width: 40px;height: 40px;padding: 10px 10px!important;background-color: #82ba50;margin: 0;}.container-cont{padding: 40px;}.add-home-icon a{color:#ffffff;font-size: 30px;line-height: 30px;}input.edit-home{background: url(/wp-content/uploads/2020/03/edit-home.png) #ffffff no-repeat center!important;}.dele-home{background: url(/wp-content/uploads/2020/03/delete-home.png) #ffffff no-repeat center!important;}.see-home{background: url(/wp-content/uploads/2020/03/see-home.png) #ffffff no-repeat center!important;}.floor-plan-tabs .pp-tabs-labels {display: flex !important; }.floor-plan-tabs .pp-tabs-labels .pp-tab-active .pp-tab-label-inner {border-bottom: 1px solid #82BA50 !important;}@media (max-width:768px) {.bestcities-img{display:none!important;}.fl-node-5d8dfcea2ad89 .pp-infobox-image img {display: none;}.floor-plan-tabs .pp-tabs-labels {display: none !important; }}.carousel_rel_floor-plan { max-width: 600px;height: 250px;}.rltd_fp-desc{display: none;}ul.slides {display: block;position: relative;height: 450px;margin: 0;padding: 0;overflow: hidden;list-style: none;}.slides * {user-select: none;-ms-user-select: none;-moz-user-select: none;-khtml-user-select: none;-webkit-user-select: none;-webkit-touch-callout: none;}ul.slides input {display: none; }.slide-container { display: block; }.slide-image {display: block;position: absolute;width: 100%;height: auto;top: 0;opacity: 0;transition: all .7s ease-in-out;} .slide-image img {width: auto;min-width: 100%;height: auto;}.carousel-controls {position: absolute;top: 0;left: 0;right: 0;z-index: 999;font-size: 50px;line-height: 60px;color: #fff;padding-top: 150px;}.carousel-controls label {display: none;position: absolute;padding: 0 20px;opacity: 0;transition: opacity .2s;cursor: pointer;height: 100px;}.slide-image:hover + .carousel-controls label{opacity: 0.5;}.carousel-controls label:hover {opacity: 1;}.carousel-controls .prev-slide {width: 49%;text-align: left;left: 0;}.carousel-controls .next-slide {width: 49%;text-align: right;right: 0;}.carousel-dots {position: absolute;left: 0;right: 0;bottom: 20px;z-index: 999;text-align: center;}.carousel-dots .carousel-dot {display: inline-block;width: 15px;height: 15px;border-radius: 50%;background-color: #82BA4F;opacity: 0.5;margin: 10px;}input:checked + .slide-container .slide-image {opacity: 1;display: block;transform: scale(1);transition: opacity 1s ease-in-out;}input:checked + .slide-container .slide-image .rltd_fp-link{ display: block;}input:checked + .slide-container .carousel-controls label { display: block; }input#img-1:checked ~ .carousel-dots label#img-dot-1,input#img-2:checked ~ .carousel-dots label#img-dot-2,input#img-3:checked ~ .carousel-dots label#img-dot-3,input#img-4:checked ~ .carousel-dots label#img-dot-4,input#img-5:checked ~ .carousel-dots label#img-dot-5,input#img-6:checked ~ .carousel-dots label#img-dot-6 {opacity: 1;}input:checked + .slide-container .nav label { display: block; }.rltd_fp-desc, .rltd_fp-link{font-size: 20px;}.rltd_fp-link{text-align: right!important;padding: 20px 10px 5px;font-weight: 600;display: none;}.rltd_fp-link a{ color: #82BA4F;}@media only screen and (min-width: 768px) {.prev-slide, .next-slide{height: 350px;}}.ph.icon-bed,.ph.icon-garage-1,.ph.icon-bath{color:#82ba50;font-size: 32px;background: none;}.rltd_fp-title{margin-bottom: 10px!important;font-size: 35px;text-align: left;font-weight:500;text-transform: uppercase;margin-bottom: 20px!important;}.gform_wrapper .top_label .gfield_label{display:none!important;}.ginput_container{margin-top: 0!important;}.gform_wrapper ul li.gfield {margin-top: 6px!important;padding-top: 0;} #gform_1 .ginput_container input{text-align: center!important;}#gform_1 .gfield{font-size: 14px!important;}#gform_1 .gform_footer input[type="submit"]{background-color: #75a848;}#gform_1 .gfield input:not([type="submit"]):not([type="button"]){ background-color: #ffffff!important;border-color: #828282;}#gform_1 .top_label li.gfield div:not(.ginput_container_date) select.large{background-color: #ffffff!important;border-color: #828282;}#label_1_8_1{color: #c7c7c7;}#choice_1_8_1{height: 13px!important;}.newsletter ul.gform_fields li.gfield.gf_left_half {padding-right: 5px!important;}.newsletter .gform_wrapper .gform_footer {padding: 5px 0 10px!important;margin: 5px 0 0!important;}.gform_wrapper li.gfield select{height: 45px!important;min-height: 45px;}.gform_wrapper.gf_browser_chrome ul.gform_fields li.gfield select {margin-left: 0; }.gfield_select{ height: 45px!important;}.gform_wrapper input{height:45px!important;}#input_1_16{overflow: hidden!important;}.mfp-gallery img.mfp-img {padding: 20px!important;background-color: #ffffff;}.fl-post-carousel-svg-container {box-shadow: 0px 0px 13px rgba(0, 0, 0, 0.25);}.front {z-index: 11;position: relative;}.centred-column .fl-col-content {max-width: 485px;margin: 0 auto !important;text-align: center;}.centered-column-second .fl-col-content {max-width: 564px;margin: 0 auto !important;text-align: center;}#input_7_10 .ginput_container.ginput_container_select{margin-left: -11px!important;}#gform_1 ul.gform_fields li.gfield{padding-right: 6px!important;}.gform_wrapper li.hidden_label input{margin-top:0!important;}#gform_1 #field_1_1 {margin-bottom: 6px!important;}#gform_1 #input_1_10{height: 100%;}#gform_1 #field_1_10 .instruction {display: none!important;}#gform_1 #field_1_6 .ginput_container {margin-top:6px!important;}#gform_1 #field_1_8 .gfield_checkbox li {display: flex;align-items: baseline;margin-right: 20px;}#gform_1 #field_1_8 .gfield_checkbox input[type=checkbox]{margin-right: 5px;}#gform_1 .gform_confirmation_wrapper {padding-top:100px;}#gform_1 #gform_submit_button_1 {font-size: 16px;font-weight: bold;}.gform_wrapper .gfield_checkbox li label, .gform_wrapper .gfield_radio li label {max-width: 100% !important;}@media (min-width: 992px) {.gf_first_quarter,.gf_second_quarter,.gf_third_quarter{width: 24.59%!important;margin-right: 4px;}}.field_5e26825dfd6e0 .acf-bl>li, .acf-field-5e265c135d671 .acf-bl>li{display: inline!important;float: left!important;margin-right: 10px !important;width: 150px!important;}.drop {cursor: pointer;display: block;}.row-filters input[type="checkbox"]{ display: none; }.row-filters input:checked + .drop + div#floors{visibility: visible;opacity: 1;height: 130px;transition: opacity 600ms, visibility 600ms, height 600ms;}.row-filters input +.drop + div#floors{ -webkit-transition: opacity 600ms, visibility 600ms;transition: opacity 600ms, visibility 600ms, height 600ms; opacity: 0;visibility: hidden;height: 0;}div#floors{ margin-bottom: 10px;}.drop:after { content: '';position: absolute;left:300px;top: 168px;z-index: 1;display: block;width: 9px;height: 9px; margin: 0; border-right: 2px solid;border-bottom: 2px solid;-webkit-transform-origin: right bottom;-ms-transform-origin: right bottom;transform-origin: right bottom;-webkit-transform: rotate( 45deg );-ms-transform: rotate( 45deg );transform: rotate( 45deg );}:checked+ .drop:after { content: ''; position: absolute;left:300px;top: 168px;z-index: 1;display: block;width: 9px;height: 9px; margin: -5px -5px 20px 0;border-right: 2px solid;border-bottom: 2px solid;-webkit-transform-origin: right bottom;-ms-transform-origin: right bottom;transform-origin: right bottom;-webkit-transform: rotate( -135deg );-ms-transform: rotate( -135deg );transform: rotate( -135deg );}.desc, .row_3{font-size: 14px!important;line-height: 20px;}.row_3 > span{border: 1px solid #E1E1E1;}.row_3 > span > a {padding: 8px;line-height: 35px;}.row_3 > span > div.socialBox {padding: 8px;}.row_3 .icon-bath,.row_3 .icon-bed,.row_3 .icon-residential,.row_3 .icon-sqft2,.row_3 .icon-sin-titulo-1-copia{background:none;color:#82ba50!important;font-size: 16px;}.list img.home {object-fit: cover;height: 170px;width: 100%;}.details, .socialShare, .talkShare{margin-top: 10px;font-size: 14px;background-color: #ffffff;}.details {width: auto;text-align: center;}.icon-sqft2{background:none;color:#82ba50!important;font-size: 16px;}.icon-share{color:#000000;font-size: 12px;}#btn-results{background-color: #82ba50;border-color: #82ba50;font-weight: 600;} span.details:hover{-webkit-transform: scale(1.25);-moz-transform: scale(1.25);transform: scale(1.25);-webkit-transition: all .15s ease-in-out;-moz-transition: all .15s ease-in-out;transition: all .15s ease-in-out;position: relative;z-index: 999;}span.details {display: inline-block;width: auto;text-align: center;-webkit-transform: scale(1);-moz-transform: scale(1);transform: scale(1);-webkit-transition: all .35s ease-in-out;-moz-transition: all .35s ease-in-out;transition: all .35s ease-in-out;}form[name=frm]{float: none;}.categorychecklist-holder ul.acf-checkbox-list li {float: left;margin: 5px 10px;}label[for=region]{padding-right: 15px;padding-top: 10px;font-size: 25px;}.acf-repeater .acf-row-handle.order {background: #ffffff;}.spec_content .acf-input textarea{background-color: #ffffff!important;}.rowform07,.rowform02,.rowform01{clear:both; display: inline-flex; padding-bottom: 20px;}.rowform01 input[type="checkbox"],.rowform01 input[type="checkbox"]{display: inline-flex;vertical-align:middle;position: relative; }fieldset { border:none;}.rowform02 .filters{margin-right: 10px;}.rowform02 select{height: 38px;}.filter .rowform02 .filters select#type{margin-right: 0;} .filter .rowform02 .filters select option[value='all']{padding-left: 41px!important; }.icon-f{width: 41px;height: 38px;float:left;padding: 0px!important;background-color: #82ba50;} .icon-f.city-s{background: url('/wp-content/uploads/2020/02/city-f.png') no-repeat center center #82ba50;background-size: 25px;-webkit-print-color-adjust: exact;}.icon-f.bed-s{background: url('/wp-content/uploads/2019/12/bed-f.png') no-repeat center center #82ba50;background-size: 25px;}.icon-f.garage-s{background: url('/wp-content/uploads/2019/12/garage-f.png') no-repeat center center #82ba50;background-size: 25px;}.icon-f.sqfoot-s{background: url('/wp-content/uploads/2019/12/sqft-f.png') no-repeat center center #82ba50;background-size: 25px;}.icon-f.type-s{background: url('/wp-content/uploads/2019/12/garage-f.png') no-repeat center center #82ba50;background-size: 25px;}.icon-f.price-s{background: url('/wp-content/uploads/2019/12/price-f.png') no-repeat center center #82ba50;background-size: 25px;-webkit-print-color-adjust: exact;}#new-home{max-width: 1000px;margin-left: 20%;margin-bottom: 100px!important;}#new-home .acf-input {margin-right: 10px!important;margin-left: 0px!important;}.acf-form-submit input[type=submit]{background-color: #82BA50!important;float: right;margin-right: 5px;text-transform: uppercase;font-style: normal;font-weight: 600;font-size: 16px;line-height: 22px;display: flex;margin-bottom: 50px!important}.acf-form-submit{padding-top:20px;}.acf-field.acf-field-file{margin-top: 50px;}.acf-field .acf-label label {font-weight: bold;margin: 0px!important;padding: 0;}.acf-label{font-family: 'Nunito Sans', sans-serif;font-style: normal;font-weight: 600;font-size: 15px!important;line-height: 19px;display: flex;color: #241A1A;}.acf-tab-group li.active a{font-family: 'Nunito Sans', sans-serif;font-style: normal;font-weight: 600!important;font-size: 16px;line-height: 22px;display: flex;align-items: center;text-align: center;text-transform: uppercase;color: #000000!important;background-color: none!important;padding-bottom: 6px;margin-bottom:0!important;position: relative;border: none!important;}.acf-tab-group li.active {border-bottom: #82BA50 solid 2px;}.acf-tab-group li a{font-family: 'Nunito Sans', sans-serif;font-style: normal;font-weight: 600!important;font-size: 16px!important;line-height: 22px;display: flex;align-items: center;text-align: center;text-transform: uppercase;color: #D6D6D6!important;text-decoration: none;transition: none;background: none!important; padding-bottom: 6px;margin-bottom: 0px;position: relative;z-index: 1;border: none!important;}.acf-tab-group li { border-bottom: #D6D6D6 solid 2px; padding: 10px 25px!important;margin: 0!important;}.acf-tab-group { border: none!important;padding: 0!important; }.acf-field[data-width]+.acf-field[data-width] {border-left:none;}.acf-field select {border: 1px solid #D6D6D6!important;box-sizing: border-box;border-radius: 5px;background-color: #ffffff;padding: 12px!important;}form#new-home .acf-relationship .filters .filter select{height: 44px;line-height: 1.4;}.acf-field input[type="text"]{border: 1px solid #D6D6D6;box-sizing: border-box;border-radius: 5px;padding: 10px!important;background-color: #ffffff;}.acf-input{margin-right: 5px; margin-left: 5px;}.acf-repeater .acf-row-handle.order {background: #ffffff;}.acf-table>tbody>tr>td {border: none!important;}.acf-field .acf-label label {display: block;font-weight: bold;margin: 0 0 3px;padding: 0 10px 0 0;}.floor-plan-tabs .pp-tabs-labels {display: flex !important; }.floor-plan-tabs .pp-tabs-labels .pp-tab-active .pp-tab-label-inner {border-bottom: 1px solid #82BA50 !important;}.acf-input select{font-family: Source Sans Pro;font-style: normal;font-weight: 600!important;font-size: 15px;line-height: 19px;display: flex;align-items: center;color: #241A1A;}.acf-table{border:none!important;}@media (max-width:768px) {.fl-node-5d8dfcea2ad89 .pp-infobox-image img {display: none;}.floor-plan-tabs .pp-tabs-labels {display: none !important; }.rowform01{display: inline-block;}}.check-container {display: initial;position: relative;padding-left: 30px!important;margin-bottom: 12px;cursor: pointer;font-size: 22px;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}.check-container input {position: absolute;opacity: 0;cursor: pointer;height: 0;width: 0;}.checkmark {position: relative;margin-left: 10px;border-radius:100%;height: 18px;width: 18px;background-color: #eee;}.check-container:hover input ~ .checkmark {background-color: #82ba50;}.check-container input:checked ~ .checkmark {background-color: #82ba50;}.checkmark:after {content: "";position: absolute;display: none;}.check-container input:checked ~ .checkmark:after {display: block;}.check-container .checkmark:after {left: 5px;top: 3px;width: 7px;height: 10px;border: solid white;border-width: 0 2px 2px 0;-webkit-transform: rotate(45deg);-ms-transform: rotate(45deg);transform: rotate(45deg);}.custom-floor{margin: 6px;}.post-inf .fl-post-info-author{font-weight: 600;}.pp-social-icon .dashicons-share1{padding-top: 8px;}#post-carousel .fl-post-carousel-post .fl-post-carousel-content{overflow: hidden;max-height: 150px!important;}#post-carousel .fl-post-carousel-image img{max-height: 300px;}.fl-post-carousel-text p{max-height: 65px!important;overflow: hidden;text-overflow: ellipsis;font-size: 16px!important;line-height: 30px!important;}#post-carousel .read-more{display: none!important;}#post-carousel .fl-post-carousel-grid .fl-post-carousel-post{border: none;}#post-carousel .fl-post-carousel-author span{color: #82BA50;}#post-carousel .fl-post-carousel-title{font-size: 30px;line-height: 40px;text-transform: uppercase;color: #000000;} #gform_7 .gfield_checkbox{ color: #ffffff; font-size: 18px; margin-left: 30px; } #gform_7 #field_7_10, #field_7_9{color: #a8a8a8!important;}#gform_7 ul.gform_fields li.gfield.gf_left_half {padding-right: 6px!important;}.green{background-color: #82BA50;width: 8px;height: 80px;position: relative;left: 0;margin-right:40px;margin-bottom:60px;margin-top: 60px;float: left;}.title-g{float: left;margin-top: 60px;}.fl-module-post-carousel.fl-node-5d787e22f06bd .fl-post-carousel-text{display: none;}.s-title .fl-module-content{background-color: #000000;opacity: 0.8;width: 300px;float: left;}.com-image-text { font-size: 20px;line-height: 27px;color: #fff;position: absolute;text-transform: uppercase;top: 50%;left: 50%;-webkit-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);transform: translate(-50%, -50%);text-align: center;font-weight:bold;color:#fff;text-align: center;font-weight: bold;text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.7);}.com-image-container{position: relative;width: 100%;}.com-image {display: block;width: 100%;height: auto;}.com-overlay {position: absolute;top: 0;bottom: 0;left: 0;right: 0;height: 100%;width: 100%;opacity: 1;transition: .5s ease;background-color: rgba(255,255,255,0.4);}.com-image-container:hover .com-overlay {opacity: 0;}.com-text {color: #fff;font-size: 16px;position: absolute;line-height: 22px;text-transform: uppercase;top: 50%;left: 50%;-webkit-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);transform: translate(-50%, -50%);text-align: center;font-weight:bold;opacity:0.5;}@media (min-width: 769px) {#black-box {max-width: 342px;width: 100%;} #gform_1 #field_1_9 {padding-right: 6px!important;}.gform_wrapper .gform_footer { padding: 0px 0 10px;}#gform_7 #field_7_10 #input_7_10{margin-left: -1px!important;}#gform_7 .ginput_container.ginput_container_select{padding-right: 4px;}#gform_7 #field_7_10 .ginput_container.ginput_container_select,#gform_7 #field_7_9 .ginput_container.ginput_container_select ,#gform_7 #field_7_16 .ginput_container.ginput_container_select{padding-right: 0!important;}#gform_1 #input_1_2.gfield_select{margin-left: 0;}}@media (max-width: 768px) {.pp-gf-content .gform_wrapper ul.gform_fields li.gfield.gf_left_half{padding-right: 0!important;} .btn-talk{display: hidden;}.acf-field.acf-field-file{width:100%!important;} #gform_fields_1 input,#gform_fields_1 select {height: 55px;} #gform_7 .gfield_checkbox{ margin-left: 20%!important; } #gchoice_7_11_1, #gchoice_7_11_2, #gchoice_7_11_3{ margin-bottom: 5px!important; } .fl-node-5d9c368b8bfad .gform_wrapper .gform_footer {text-align: center;}#black-box .pp-infobox-image img {display: none!important; }.fl-node-5d8b409943aad .pp-tabs-panels .pp-tabs-panel-content {padding: 0!important;}.pp-image-carousel-wrapper .pp-image-carousel-thumb{display:none;}}.fl-node-5e5ee54cbdc10{display:none!important;}.ast-page-builder-template .site-content>.ast-container {max-width: 100%;padding: 0;}.fl-builder-row-settings #fl-field-separator_position {display: none !important;}.fl-builder-row-settings #fl-field-separator_position {display: none !important;}.fl-builder-row-settings #fl-field-separator_position {display: none !important;}.fl-builder-row-settings #fl-field-separator_position {display: none !important;}.fl-node-5e4d58d2f3a17 > .fl-col-content {}.fl-node-5ed6f08c7a79e > .fl-col-content {}.fl-node-5e5ee54cbdbe3 > .fl-col-content {}.fl-node-5e5ee54cbdbdf > .fl-col-content {}.fl-node-5e5ee54cbdbe2 > .fl-col-content {}.fl-node-5e5ee54cbdbe4 > .fl-col-content {}.fl-node-5e5ee54cbdbe1 > .fl-col-content {}.fl-node-5e5ee54cbdbe0 > .fl-col-content {}.fl-node-5e5ee54cbdc09 > .fl-col-content {}.fl-node-5e5ee54cbdc08 > .fl-col-content {}.fl-node-5e5ee54cbdbed > .fl-col-content {}.fl-node-5e5ee54cbdbec > .fl-col-content {}.fl-node-5e5ee54cbdc07 > .fl-col-content {}.fl-node-5e5ee54cbdbeb > .fl-col-content {}.fl-node-5d8384bd84d43 > .fl-col-content {}.fl-node-5e4d58d2f3a17 > .fl-col-content {-webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-moz-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-webkit-transition: -webkit-box-shadow 500ms ease-in-out, -webkit-transform 500ms ease-in-out;-moz-transition: -moz-box-shadow 500ms ease-in-out, -moz-transform 500ms ease-in-out;transition: box-shadow 500ms ease-in-out, transform 500ms ease-in-out;will-change: box-shadow;}.fl-node-5ed6f08c7a79e > .fl-col-content {-webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-moz-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-webkit-transition: -webkit-box-shadow 500ms ease-in-out, -webkit-transform 500ms ease-in-out;-moz-transition: -moz-box-shadow 500ms ease-in-out, -moz-transform 500ms ease-in-out;transition: box-shadow 500ms ease-in-out, transform 500ms ease-in-out;will-change: box-shadow;}.fl-node-5e5ee54cbdbe3 > .fl-col-content {-webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-moz-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-webkit-transition: -webkit-box-shadow 500ms ease-in-out, -webkit-transform 500ms ease-in-out;-moz-transition: -moz-box-shadow 500ms ease-in-out, -moz-transform 500ms ease-in-out;transition: box-shadow 500ms ease-in-out, transform 500ms ease-in-out;will-change: box-shadow;}.fl-node-5e5ee54cbdbdf > .fl-col-content {-webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-moz-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-webkit-transition: -webkit-box-shadow 500ms ease-in-out, -webkit-transform 500ms ease-in-out;-moz-transition: -moz-box-shadow 500ms ease-in-out, -moz-transform 500ms ease-in-out;transition: box-shadow 500ms ease-in-out, transform 500ms ease-in-out;will-change: box-shadow;}.fl-node-5e5ee54cbdbe2 > .fl-col-content {-webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-moz-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-webkit-transition: -webkit-box-shadow 500ms ease-in-out, -webkit-transform 500ms ease-in-out;-moz-transition: -moz-box-shadow 500ms ease-in-out, -moz-transform 500ms ease-in-out;transition: box-shadow 500ms ease-in-out, transform 500ms ease-in-out;will-change: box-shadow;}.fl-node-5e5ee54cbdbe4 > .fl-col-content {-webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-moz-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-webkit-transition: -webkit-box-shadow 500ms ease-in-out, -webkit-transform 500ms ease-in-out;-moz-transition: -moz-box-shadow 500ms ease-in-out, -moz-transform 500ms ease-in-out;transition: box-shadow 500ms ease-in-out, transform 500ms ease-in-out;will-change: box-shadow;}.fl-node-5e5ee54cbdbe1 > .fl-col-content {-webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-moz-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-webkit-transition: -webkit-box-shadow 500ms ease-in-out, -webkit-transform 500ms ease-in-out;-moz-transition: -moz-box-shadow 500ms ease-in-out, -moz-transform 500ms ease-in-out;transition: box-shadow 500ms ease-in-out, transform 500ms ease-in-out;will-change: box-shadow;}.fl-node-5e5ee54cbdbe0 > .fl-col-content {-webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-moz-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-webkit-transition: -webkit-box-shadow 500ms ease-in-out, -webkit-transform 500ms ease-in-out;-moz-transition: -moz-box-shadow 500ms ease-in-out, -moz-transform 500ms ease-in-out;transition: box-shadow 500ms ease-in-out, transform 500ms ease-in-out;will-change: box-shadow;}.fl-node-5e5ee54cbdc09 > .fl-col-content {-webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-moz-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-webkit-transition: -webkit-box-shadow 500ms ease-in-out, -webkit-transform 500ms ease-in-out;-moz-transition: -moz-box-shadow 500ms ease-in-out, -moz-transform 500ms ease-in-out;transition: box-shadow 500ms ease-in-out, transform 500ms ease-in-out;will-change: box-shadow;}.fl-node-5e5ee54cbdc08 > .fl-col-content {-webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-moz-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-webkit-transition: -webkit-box-shadow 500ms ease-in-out, -webkit-transform 500ms ease-in-out;-moz-transition: -moz-box-shadow 500ms ease-in-out, -moz-transform 500ms ease-in-out;transition: box-shadow 500ms ease-in-out, transform 500ms ease-in-out;will-change: box-shadow;}.fl-node-5e5ee54cbdbed > .fl-col-content {-webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-moz-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-webkit-transition: -webkit-box-shadow 500ms ease-in-out, -webkit-transform 500ms ease-in-out;-moz-transition: -moz-box-shadow 500ms ease-in-out, -moz-transform 500ms ease-in-out;transition: box-shadow 500ms ease-in-out, transform 500ms ease-in-out;will-change: box-shadow;}.fl-node-5e5ee54cbdbec > .fl-col-content {-webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-moz-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-webkit-transition: -webkit-box-shadow 500ms ease-in-out, -webkit-transform 500ms ease-in-out;-moz-transition: -moz-box-shadow 500ms ease-in-out, -moz-transform 500ms ease-in-out;transition: box-shadow 500ms ease-in-out, transform 500ms ease-in-out;will-change: box-shadow;}.fl-node-5e5ee54cbdc07 > .fl-col-content {-webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-moz-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-webkit-transition: -webkit-box-shadow 500ms ease-in-out, -webkit-transform 500ms ease-in-out;-moz-transition: -moz-box-shadow 500ms ease-in-out, -moz-transform 500ms ease-in-out;transition: box-shadow 500ms ease-in-out, transform 500ms ease-in-out;will-change: box-shadow;}.fl-node-5e5ee54cbdbeb > .fl-col-content {-webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-moz-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-webkit-transition: -webkit-box-shadow 500ms ease-in-out, -webkit-transform 500ms ease-in-out;-moz-transition: -moz-box-shadow 500ms ease-in-out, -moz-transform 500ms ease-in-out;transition: box-shadow 500ms ease-in-out, transform 500ms ease-in-out;will-change: box-shadow;}.fl-node-5d8384bd84d43 > .fl-col-content {-webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-moz-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);-webkit-transition: -webkit-box-shadow 500ms ease-in-out, -webkit-transform 500ms ease-in-out;-moz-transition: -moz-box-shadow 500ms ease-in-out, -moz-transform 500ms ease-in-out;transition: box-shadow 500ms ease-in-out, transform 500ms ease-in-out;will-change: box-shadow;}


/* Begin: State custom radio button */

/* The slide-container */
.check-container {
  position: relative;
  padding-left: 30px!important;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
	display: inline-flex;
    align-items: center;
}

/* Hide the browser's default checkbox */
.check-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: relative;
  margin-left: 10px;
  /*top: 0;
  left: 0;*/
  border-radius:100%;
  height: 18px;
  width: 18px;
  background-color: #eee;
  -webkit-print-color-adjust: exact;
}

/* On mouse-over, add a grey background color */
.check-container:hover input ~ .checkmark {
  background-color: #82ba50;
}

/* When the checkbox is checked, add a blue background */
.check-container input:checked ~ .checkmark {
  background-color: #82ba50;
  -webkit-print-color-adjust: exact;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.check-container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.check-container .checkmark:after {
  left: 5px;
  top: 3px;
  width: 7px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-print-color-adjust: exact;
}

/* End: State custom radio button */


h1, h2, h3, .filter-label, p, b, label {
    font-family: 'Nunito Sans', sans-serif!important;
}

/* Begin: onoffswitch filters (Home status filter) */

.filter-label{
	font-size: 15px;
	line-height: 17px;
	font-weight: 600;
}
.inline-switch{
	min-width: 150px;
	margin: 20px 0;
	width: 33.33%;
	text-align: center;
}
.onoffswitch {
  	position: relative;
    width: 45px!important;
    float: left;
  	margin: 0 10px!important;
  	-webkit-user-select:none; 
    -moz-user-select:none;
    -ms-user-select: none;
}
.onoffswitch-checkbox {
  	position: absolute;
  	opacity: 0;
  	pointer-events: none;
}
.onoffswitch-label {
  	display: block; overflow: hidden; cursor: pointer;
  	border-radius: 20px;
}
.onoffswitch-inner {
  	display: block; width: 100%; margin-left: 0;
  	transition: margin 0.3s ease-in 0s;
}
.onoffswitch-inner:before, .onoffswitch-inner:after {
  	display: block;
    float: left;
    width: 50%;
    height: 24px;
    padding: 0;
    line-height: 24px;
  	font-size: 14px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;
  	box-sizing: border-box;
}
.onoffswitch-inner:before {
  	content: "";
  	padding-left: 10px;
  	background-color: #EEEEEE; color: #FFFFFF;
	-webkit-print-color-adjust: exact;
}
.onoffswitch-inner:after {
  	content: "";
  	padding-right: 10px;
  	background-color: #EEEEEE; color: #999999;
  	text-align: right;
	-webkit-print-color-adjust: exact;
}
.onoffswitch-switch {
  	display: block;
  	width: 18px;
  	height: 18px;
  	margin: 3px;
  	background: #ccc;
  	position: absolute;
  	top: 0;
  	bottom: 0;
  	right: 20px;
  	border-radius: 20px;
  	transition: all .3s ease-in 0s;
	-webkit-print-color-adjust: exact;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
  	margin-left: 0;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
  	right: 0px; 
  	background-color: #82BA50; 
	-webkit-print-color-adjust: exact;
}

.onoffswitch-trailing-icon {
	width: 25px;
    height: auto;
    margin-left: 10px;
}

/* End: onoffswitch filters (Home status filter) */

/* Begin: Listing */

.home-listing-item {
	display: flex;
  	min-height: 160px;
    margin: 12px 0;
  	position: relative;
}

.home-listing-item figure img{
  width: 186px;
  height: 100%;
  object-fit: cover;
}

.home-listing-item figure {
    min-width: 186px;
}

.home-info {
	background-color: #F8F8F8;
  	padding: 20px;
  	font-size: 14px;
  	width: 100%;
}

.home-info p.title-and-price{
  	font-size: 16px;
  	display: flex;
  	font-weight: 800;
    margin-bottom: 10px;
}

.home-info p.home-type{
    margin-bottom: 5px;
}

.home-info p.title-and-price .home-price {
	margin-left: 30px;
}

.home-actions{
	display: flex;
  	flex-wrap: wrap;
}

.home-info i {
    color: #7db24c;
}

a.home-details, a.home-sharer {
	padding: 8px 15px;
  	color: black;
 	background: #FFFFFF;
	border: 1px solid #E1E1E1;
  	margin: 1px;
}

a.home-details i, a.home-sharer i{
	color: black;
}

@media (max-width: 425px){
	.home-listing-item figure {
        width: 100%;
  	}
  	.home-listing-item {
      flex-direction: column;
  	}
    .home-listing-item figure img{
      width: 100%;
      height: 160px;
      object-fit: cover;
    }
}

/* End: Listing */

/* Begin: Listing share overlay */

.home-share-overlay {
	position: absolute;
  	left: 15px;
  	right: 15px;
  	bottom: 0;
  	top: 0;
  	background: rgba(0,0,0,0.5);
  	display: flex;
    justify-content: center;
    align-items: center;
  	visibility: hidden;
  	opacity: 0;
  	transition: all .5s ease;
}

.home-listing-item.with-sharer-overlay .home-share-overlay{
	visibility: visible;
  	opacity: 1;	
}

.home-share-overlay a {
	background: #FFFFFF;
	box-shadow: 0px 0px 12px rgba(29, 50, 59, 0.5);
  	border-radius: 50%;
	width: 45px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    margin: 0 5px;
}

/* End: Listing share overlay */

/* Begin: Home filters */

.home-filter {
	margin: 0 5px;
}

.home-status-inline-switch{
	margin: 10px;
    display: flex;
	align-items: center;
}

/* End: Home filters */

.justify-content-center {
    justify-content: center!important;
}

.d-flex {    
    display: flex!important;
}

.text-center {
    text-align: center!important;	
}

input[type=email], input[type=number], input[type=password], input[type=reset], input[type=search], input[type=tel], input[type=text], input[type=url], select, textarea {
    color: #666;
    padding: .75em;
    height: auto;
    border-width: 1px;
    border-style: solid;
    border-color: #eaeaea;
    border-radius: 2px;
    background: #fafafa;
    box-shadow: none;
    box-sizing: border-box;
    transition: all .2s linear;
}

input[type=email], input[type=password], input[type=search], input[type=tel], input[type=text], input[type=url], textarea {
    color: #666;
    border: 1px solid #ccc;
    border-radius: 2px;
    -webkit-appearance: none;
}

.salto {page-break-inside: avoid}

figure {
    margin: 0;
}

.fl-row, .fl-row-content {
    margin-left: auto;
    margin-right: auto;
}

.fl-node-5e4d58d2f3a13 .fl-row-content {
    max-width: 686px;
}

fl-node-5e4d58d2f3a18 > .fl-module-content {
	margin-top: 20px;
    margin-bottom: 10px;
}

.fl-node-5e4d58d2f3a18.fl-module-heading .fl-heading {
    font-size: 25px;
    line-height: 40px;
    text-align: center;
    text-transform: uppercase;
    font-weight: normal!important;
}

</style>  
</head>
<body>
<div class="grid-container">
  <div>
    <div style="background: black;-webkit-print-color-adjust: exact;">
        <img style="margin: 10px 20px;" class="fl-photo-img wp-image-6567 size-thumbnail" src="https://www.morgantaylorhomes.com/wp-content/uploads/2019/09/Morgan-Taylor-Homes-Logo-w.svg" alt="Morgan-Taylor-Homes - Logo (w)" itemprop="image" height="auto" width="150" srcset="https://www.morgantaylorhomes.com/wp-content/uploads//2019/09/Morgan-Taylor-Homes-Logo-w.svg 150w, https://www.morgantaylorhomes.com/wp-content/uploads//2019/09/Morgan-Taylor-Homes-Logo-w.svg 1536w, https://www.morgantaylorhomes.com/wp-content/uploads//2019/09/Morgan-Taylor-Homes-Logo-w.svg 2048w, https://www.morgantaylorhomes.com/wp-content/uploads//2019/09/Morgan-Taylor-Homes-Logo-w.svg 1280w" sizes="(max-width: 150px) 100vw, 150px" title="Morgan-Taylor-Homes - Logo (w)">
    </div>
  </div>

<div class="fl-row fl-row-full-width fl-row-bg-none fl-node-5e4d58d2f3a13" data-node="5e4d58d2f3a13">
	<div class="fl-row-content-wrap">
						<div class="fl-row-content fl-row-fixed-width fl-node-content">
		
<div class="fl-col-group fl-node-5e4d58d2f3a16" data-node="5e4d58d2f3a16">
			<div class="fl-col fl-node-5e4d58d2f3a17" data-node="5e4d58d2f3a17">
	<div class="fl-col-content fl-node-content">
	<div class="fl-module fl-module-heading fl-node-5e4d58d2f3a18" data-node="5e4d58d2f3a18">
	<div class="fl-module-content fl-node-content">
		<h1 class="fl-heading">
		<span class="fl-heading-text">FIND YOUR PERFECT HOME</span>
	</h1>
	</div>
</div>
	</div>
</div>
	</div>
		</div>
	</div>
</div> 

	<div id="homes-filters" class="container">
		${transformFiltersToHtml()}
	</div>

  <div class="middle">
  
    ${transformInfoToHtml(mapMarkersV2)}
  
  </div>  
</div>
</body>
</html>
 `)
 
    var state2 = state === 'arizona' ? 'Arizona':'Colorado'
    
 var printScript = document.createElement('script')
 printScript.text = `
     let images = document.images,
       totalImages = images.length,
       totalImagesLoaded = 0,
       allImagesLoaded = totalImages.length === 0;
     [].forEach.call( images, function( img ) {
       img.addEventListener( 'load', incrementImagesCounter, false );
     } );
     function incrementImagesCounter() {
       totalImagesLoaded++;
       if ( totalImagesLoaded === totalImages ) {
           allImagesLoaded = true
       }
     }
     const printInterval = setInterval(() => {
       if(allImagesLoaded){           
           clearInterval(printInterval)
           document.title = "Find Your Home | ${state2} Home Builder | Morgan Taylor Homes"
            window.print()
           window.close()
       }
     }, 500)
     `
    singleIncidentPrintWindow.document.body.appendChild(printScript)
}