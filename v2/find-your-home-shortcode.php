<?php

defined('ABSPATH') or die('<h1 style="top: 50%;width: 100%;text-align: center;position: absolute;">Sorry! You can not access direct file, please contact with admin for furthor detail.</h1>');

add_shortcode("morgan_find_your_home_map", "morgan_find_your_home_map_shortcode");

function morgan_find_your_home_map_shortcode($atts)
{
    ob_start();
  	extract(shortcode_atts(array(
      'home_status' => 'all',
    ), $atts));
    get_homes();
	map_filter_fields( $home_status );
?>
	<div id="homes-map-wrapper"></div>
	<div id="homes-listing" class="container"></div>
	<div id="homes-paginator" class="container text-center"></div>
	<div id="button-print" style="text-align: center; margin-top: 20px;">
      <a style="cursor: pointer; color=#212529; font-weight:bold;" onclick="exportHomesPDF()">[PRINT ALL LISTINGS]</a>
      <!--<button style="background: #82ba50;border-color: #82ba50;color: white;font-weight: bold;" onclick="exportHomesPDF()">TO PRINT</button>-->
	</div>

<?php
  wp_enqueue_script( 'sting_morgan_map_script' );
  wp_enqueue_script( 'morgan_find_your_home_filters' );
  wp_enqueue_script( 'morgan_find_your_home_map' );
  wp_enqueue_script( 'morgan_find_your_home_listing' );
  wp_enqueue_script( 'morgan_homes_export' );
  wp_enqueue_style( 'morgan_listing' );

  return ob_get_clean();
}

function map_filter_fields( $home_status )
{
?>
  <div id="homes-filters" class="container">
      <section id="state-filter" class="text-center">
          <label class="check-container form-check form-check-inline"><span class="filter-label">Arizona</span><input
                  type="radio" name="state" value="arizona" checked><span class="checkmark"></span></label>
          <label class="check-container form-check form-check-inline"><span class="filter-label">Colorado</span><input
                  type="radio" name="state" value="colorado"><span class="checkmark"></span></label>
      </section>
      <br>
      <section id="home-status-filter" class="d-flex justify-content-center flex-wrap">
          <div class="home-status-inline-switch">
              <div class="onoffswitch">
                  <input type="checkbox" name="term" value="available-lot" class="onoffswitch-checkbox" id="available-lot-switch"
                      tabindex="0" <?php echo ($home_status === 'all' || $home_status === 'available-lot' ? ('checked') : '') ?> >
                  <label class="onoffswitch-label" for="available-lot-switch">
                      <span class="onoffswitch-inner"></span>
                      <span class="onoffswitch-switch"></span>
                  </label>
              </div>
              <span class="filter-label">Available Lots</span>
              <?php
 				echo('<img loading="lazy" class="onoffswitch-trailing-icon" src="' . plugins_url( 'img/Available_Lot.png', __FILE__ ) . '"/>');
              ?>
          </div>
          <div class="home-status-inline-switch">
              <div class="onoffswitch">
                  <input type="checkbox" name="term" value="move-in-ready" class="onoffswitch-checkbox" id="move-in-ready-switch"
                      tabindex="0" <?php echo ($home_status === 'all' || $home_status === 'move-in-ready' ? ('checked') : '') ?> >
                  <label class="onoffswitch-label" for="move-in-ready-switch">
                      <span class="onoffswitch-inner"></span>
                      <span class="onoffswitch-switch"></span>
                  </label>
              </div>
              <span class="filter-label">Move-in Ready</span>
              <?php
 				echo('<img loading="lazy" class="onoffswitch-trailing-icon" src="' . plugins_url( 'img/Move_In_Ready.png', __FILE__ ) . '"/>');
              ?>
          </div>
          <div class="home-status-inline-switch">
              <div class="onoffswitch">
                  <input type="checkbox" name="term" value="under-construction" class="onoffswitch-checkbox" id="under-construction-switch"
                      tabindex="0" <?php echo ($home_status === 'all' || $home_status === 'under-construction' ? ('checked') : '') ?> >
                  <label class="onoffswitch-label" for="under-construction-switch">
                      <span class="onoffswitch-inner"></span>
                      <span class="onoffswitch-switch"></span>
                  </label>
              </div>
              <span class="filter-label">Under Construction</span>
              <?php
 				echo('<img loading="lazy" class="onoffswitch-trailing-icon" src="' . plugins_url( 'img/Under_Construction.png', __FILE__ ) . '"/>');
              ?>
          </div>
      </section>
      <br>
      <section id="fields-filter" class="d-flex justify-content-center flex-wrap">
        <div class="home-filter">
          <label for="price" style="font-size: 12px; font-weight: 600;">Price</label><br>
          <span class="icon-f price-s"></span>
          <select id="price" name="price" style="height: 38px; width: 160px; font-size: 13px; font-weight: 600;">
            <option value="all" selected>All</option>
            <option value="a">Under 250K</option>
            <option value="b">250K - 349K</option>
            <option value="c">350K - 449K</option>
            <option value="d">450K - 599K</option>
            <option value="e">600K - 749K</option>
            <option value="f">750K - 1Million</option>
            <option value="g">+1Million</option>
          </select>
        </div>
        <div class="home-filter">
          	<label for="city" style="font-size: 12px; font-weight: 600;">City</label><br>
        	<span class="icon-f city-s"></span>
        	<input type="text" id="city" style="height: 38px; width: 160px; font-size: 13px; font-weight: 600;" placeholder="Type your city">
        </div>
        <div class="home-filter">
          <label for="radio" style="font-size: 12px; font-weight: 600;">Radius</label><br>
          <span class="icon-f city-s"></span>
          <select id="radio" name="radio" style="height: 38px; width: 160px; font-size: 13px; font-weight: 600;">
            <option value="all" selected>All</option>
            <option value="5">5 miles</option>
            <option value="10">10 miles</option>
            <option value="15">15 miles</option>
            <option value="20">20 miles</option>
          </select>
        </div>
      </section>
  </div>
  <br>
<?php
}

function format_floorplan_correctly( $groups ){
	if ( ! isset($groups) || ! $groups ) {
    	return [];
    } else {
    	return empty($groups) ? $groups : array_map(function($group){
          $floorplan = array(
            'title' => $group['related_floor_plan_with_price_group']['floor_plan']->post_title,
            'permalink' => get_permalink( $group['related_floor_plan_with_price_group']['floor_plan']->ID ),
            'price' => number_format($group['related_floor_plan_with_price_group']['price'], 0, '.', ','),
            'tiny_image' => get_field('tiny_image_google_map_popup', $group['related_floor_plan_with_price_group']['floor_plan']->ID),
          );
          
          return $floorplan;
       	},$groups);
    }
}


function get_homes() {   
    $args =  array(
      'posts_per_page' => '-1',
      'post_type' => 'homes',
      'post_status' => 'publish',
      'order' => 'ASC',
      'orderby' => 'ID',
    );
   
    $query = new WP_Query( $args );
   
  	$homes = array();
  	if( $query->have_posts() ){
      while ( $query->have_posts() ){
        $query->the_post();
        $home = array(
          'id' => get_the_ID(),
          'title' => get_the_title(),
          'permalink' => get_permalink(),
          
          'marker' => get_marker(get_field('const-status_rel')->slug),
          'description' => apply_filters('the_content', get_the_content() ),
          'date' => get_field('date') ?? 'N/A',
          'pretty_price' => number_format(get_field('price_v'), 0, '.', ','),
          'price' => get_field('price_v') == 0 ? 'Coming Soon' : number_format(get_field('price_v'), 0, '.', ','),
          'sqft' => get_field('sq_foot') ? number_format(get_field('sq_foot'), 0, '', ',') . ' sqft' : 'N/A',
          
          'facebook_url' => 'https://www.facebook.com/sharer/sharer.php?u='.get_permalink(),
          'pinterest_url' => 'https://pinterest.com/pin/create/bookmarklet/?media=_media&url='.get_permalink(), // _media will be replaced with Javascript in a future process
          'twitter_url' => 'https://twitter.com/share?url='.get_permalink(),
          
          'floorplans' => format_floorplan_correctly(get_field('related_floor_plan_with_price')),
          'construction_status' => get_field('const-status_rel')? get_field('const-status_rel')->slug : 'available',
          'state' => get_field('state')? get_field('state')->slug : 'arizona',
          'custom_fields' => get_fields(),
          'sale_status' => get_field('sale_status')? get_field('sale_status')->slug : 'N/A',
        );
        array_push( $homes, $home );
      }
      wp_reset_postdata();
    } else {
      // no posts found
    }
    
  	file_put_contents( 'homes-data.js', 'var homes = '.json_encode($homes, true));
    //echo '<div id="home-json" style="display: none;">'.json_encode($homes, true).'</div>';
}

function get_marker($home_status) {
	$marker = '';
  	switch($home_status){
      case 'available-lot':
		$marker = plugins_url( 'img/Available_Lot.png', __FILE__ );
        break;
      case 'under-construction':
		$marker = plugins_url( 'img/Under_Construction.png', __FILE__ );
        break;
      case 'move-in-ready':
		$marker = plugins_url( 'img/Move_In_Ready.png', __FILE__ );
        break;
    }
  return $marker;
}

/**
 * Load scripts
 */

function load_morgan_find_your_home_map_filter_scripts() 
{   
  	wp_register_script( 'morgan_find_your_home_filters', plugin_dir_url( __FILE__ ) . 'filters.js', '1.2.0', true ); 
  	wp_register_script( 'morgan_find_your_home_map', plugin_dir_url( __FILE__ ) . 'map.js', '1.0.0', true );
    wp_register_script( 'morgan_find_your_home_listing', plugin_dir_url( __FILE__ ) . 'listing.js', '1.1.0', true );
    wp_register_script( 'morgan_city_listing', plugin_dir_url( __FILE__ ) . 'listing-cities.js', '1.0.0', true );
  	wp_register_script( 'morgan_homes_export', plugin_dir_url( __FILE__ ) . 'export.js', '1.0.0', true );
  	wp_register_style( 'morgan_listing', plugin_dir_url( __FILE__ ) . 'listing.css', '1.0.0', true );
}

add_action('wp_enqueue_scripts', 'load_morgan_find_your_home_map_filter_scripts');