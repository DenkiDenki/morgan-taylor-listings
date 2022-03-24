<?php

defined('ABSPATH') or die('<h1 style="top: 50%;width: 100%;text-align: center;position: absolute;">Sorry! You can not access direct file, please contact with admin for furthor detail.</h1>');

add_shortcode("morgan_city_listing", "morgan_city_listing_shortcode");

function morgan_city_listing_shortcode( $atts )
{
    ob_start();
  	extract(shortcode_atts(array(
      'city'        => 'any',
      'region'      => 'any',
      'home_status' => 'all',
    ), $atts));
    get_city_homes( $city, $region );
    map_filter_fields_cities($home_status);
    //get_marker_cities($home_status);

?>
    <div id="homes-map-wrapper"></div>
	<div id="homes-listing" class="container"></div>
	<div id="homes-paginator" class="container text-center"></div>

<?php  
 echo '<div id="cta-locations-link" style=""><a href="#cta-locations"><h3>Stay alerted of new homes in <span class="cta-locations-name">' . $city . '</span></h3></a></div>';
 /**** */
  wp_enqueue_script( 'sting_morgan_map_script' );//scripmapa google
  //wp_enqueue_script( 'morgan_find_your_home_map' );/*-- mapa revisar*/
  wp_enqueue_script( 'morgan_find_your_home_map_cities' );//maps
  
  //wp_enqueue_script( 'morgan_find_your_home_listing' );/**--* */
  wp_enqueue_script( 'morgan_homes_export' );
  //wp_enqueue_script( 'morgan_find_your_home_filters' );/**-- */
  wp_enqueue_script( 'morgan_find_your_home_filters_cities' );//filtros
  wp_enqueue_script( 'morgan_city_listing' );//listado
  wp_enqueue_style( 'morgan_listing' );//css def en find-your-home

  return ob_get_clean();
}
/***************** */
function map_filter_fields_cities( $home_status )
{
?>
  <div id="homes-filters" class="container">
      <!--section id="state-filter" class="text-center">
          <label class="check-container form-check form-check-inline"><span class="filter-label">Arizona</span><input
                  type="radio" name="state" value="arizona" checked><span class="checkmark"></span></label>
          <label class="check-container form-check form-check-inline"><span class="filter-label">Colorado</span><input
                  type="radio" name="state" value="colorado"><span class="checkmark"></span></label>
      </section-->
      <!--br-->
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
      <!--br-->
      <!--section id="fields-filter" class="d-flex justify-content-center flex-wrap">
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
      </section-->
  </div>
  <!--br-->
<?php
}
/***************** */


function get_marker_cities($home_status) {
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
/***************** */
function morgan_slugify($text)
{
  // replace non letter or digits by -
  $text = preg_replace('~[^\pL\d]+~u', '-', $text);

  // transliterate
  $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

  // remove unwanted characters
  $text = preg_replace('~[^-\w]+~', '', $text);

  // trim
  $text = trim($text, '-');

  // remove duplicate -
  $text = preg_replace('~-+~', '-', $text);

  // lowercase
  $text = strtolower($text);

  if (empty($text)) {
    return 'n-a';
  }

  return $text;
}

function get_city_homes($city, $region)
{
    $args = array(/**trae a todos los homes publicados que no tengan status sold */
        'post_type'      => 'homes',
        'post_status'    => 'publish',
        'posts_per_page' => -1,
        'tax_query'      => array(
            array(
                'taxonomy' => 'sales_status',
                'field'    => 'slug',
                'terms'    => 'sold',
                'operator' => 'IN', /* not in*/
            ),
        ),
        'meta_query'     => array(),
    );
   
    if ($city !== 'any') {/** si city es diferente de any trae todos los que coincidan con $city*/
        $args['meta_query'][] = array(
            'key'     => 'city',
            'value'   => $city,
            'compare' => '=',
        );
    }
   // var_dump($args);
    $queryAttempt1 = new WP_Query($args); // only using the city
    //print_r($queryAttempt1);/* resultado de la query raro. Revisar a partir de acá*/
    $homesbycity = array();
    
    if ($queryAttempt1->have_posts()) {
        while ($queryAttempt1->have_posts()) {
            $queryAttempt1->the_post();
            $homecity = array(
                'id' => get_the_ID(),
                'title' => get_the_title(),
                'permalink' => get_permalink(),

                'marker' => get_marker(get_field('const-status_rel')->slug),
                'description' => apply_filters('the_content', get_the_content()),
                'date' => get_field('date') ?? 'N/A',
                'pretty_price' => number_format(get_field('price_v'), 0, '.', ','),
                'price' => get_field('price_v') == 0 ? 'Coming Soon' : number_format(get_field('price_v'), 0, '.', ','),
                'sqft' => get_field('sq_foot') ? number_format(get_field('sq_foot'), 0, '', ',') . ' sqft' : 'N/A',

                'facebook_url' => 'https://www.facebook.com/sharer/sharer.php?u=' . get_permalink(),
                'pinterest_url' => 'https://pinterest.com/pin/create/bookmarklet/?media=_media&url=' . get_permalink(), // _media will be replaced with Javascript in a future process
                'twitter_url' => 'https://twitter.com/share?url=' . get_permalink(),
          'floorplans' => format_floorplan_correctly(get_field('related_floor_plan_with_price')),

                'custom_fields' => get_fields(),
            );

            array_push($homesbycity, $homecity);
            //print_r($homecity['title']);
            //echo('<br>');
            
        }
      	wp_reset_postdata();
    } else if ($region !== 'any') { // if we have not results, then we try to see whether a region was provided and to try it again
        $queryAttempt2 = new WP_Query(
            array(
                'post_type'      => 'homes',
                'post_status'    => 'publish',
                'posts_per_page' => -1,
                'meta_key'     => 'region',
                'meta_value'   => $region,
            )
        );
        if ($queryAttempt2->have_posts()) {
            while ($queryAttempt2->have_posts()) {
                $queryAttempt2->the_post();
                $homecity = array(
                    'id' => get_the_ID(),
                    'title' => get_the_title(),
                    'permalink' => get_permalink(),

                    'marker' => get_marker(get_field('const-status_rel')->slug),
                    'description' => apply_filters('the_content', get_the_content()),
                    'date' => get_field('date') ?? 'N/A',
                    'pretty_price' => number_format(get_field('price_v'), 0, '.', ','),
                    'price' => get_field('price_v') == 0 ? 'Coming Soon' : number_format(get_field('price_v'), 0, '.', ','),
                    'sqft' => get_field('sq_foot') ? number_format(get_field('sq_foot'), 0, '', ',') . ' sqft' : 'N/A',

                    'facebook_url' => 'https://www.facebook.com/sharer/sharer.php?u=' . get_permalink(),
                    'pinterest_url' => 'https://pinterest.com/pin/create/bookmarklet/?media=_media&url=' . get_permalink(), // _media will be replaced with Javascript in a future process
                    'twitter_url' => 'https://twitter.com/share?url=' . get_permalink(),
          'floorplans' => format_floorplan_correctly(get_field('related_floor_plan_with_price')),

                    'custom_fields' => get_fields(),
                );

                array_push($homesbycity, $homecity);
               // print_r($homecity);
            }
          	wp_reset_postdata();
        }
    }    
   // print_r( $homesbycity);
    echo '<div id="home-json" style="display: none;">' . json_encode($homesbycity, true) . '</div>';
  // $city_slug = morgan_slugify($city);
   //$region_slug = morgan_slugify($region);
  //  echo '<input type="hidden" id="city-hidden" value="'.$city_slug.'" />';
    //echo '<input type="hidden" id="region-hidden" value="'.$region_slug.'" />';
    //if (!is_dir('/map-data')) {
    //   dir doesn't exist, make it
      // mkdir('/map-data');
     //}
//   file_put_contents( "/homesbycity-data-$city_slug-$region_slug.js", 'var homesbycity = '.json_encode($homesbycity, true));
}


/**
 * Load scripts
 */

function load_morgan_city_listing_scripts() 
{   wp_register_script( 'morgan_find_your_home_filters_cities', plugin_dir_url( __FILE__ ) . 'filters-cities.js', '1.0.0', true ); 
    wp_register_script( 'morgan_find_your_home_map_cities', plugin_dir_url( __FILE__ ) . 'map-cities.js', '1.0.0', true );
  	wp_register_script( 'morgan_city_listing', plugin_dir_url( __FILE__ ) . 'listing-cities.js', '1.0.0', true );
}

add_action('wp_enqueue_scripts', 'load_morgan_city_listing_scripts');
