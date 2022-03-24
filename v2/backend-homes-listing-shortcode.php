<?php

defined('ABSPATH') or die('<h1 style="top: 50%;width: 100%;text-align: center;position: absolute;">Sorry! You can not access direct file, please contact with admin for furthor detail.</h1>');

add_shortcode("morgan_backend_homes_listing", "morgan_backend_homes_listing_shortcode");

function morgan_backend_homes_listing_shortcode($atts)
{	
  	if ( ! is_user_logged_in() || ! current_user_can('administrator') ) {
    	wp_redirect( '/' );
    }
    ob_start();
    get_all_homes();
?>
	<div id="home-listing-header" class="container" style="display: flex; justify-content: flex-end;">
      <h1 style="margin-right: auto; font-weight: 300; font-size: 30px; text-transform: uppercase;">Homes/Lots Management</h1>
	  <input type="text" id="homes-search" style="height: 50px; margin: 0 9px; font-size: 14px; color: #000000;" placeholder="Search">
      <a href="/create-home" style="margin: 0 9px;" target="_blank">
      	<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="50" height="50" fill="#82BA50"/>
          <path d="M17.8758 23.5053H23.3618V18.0193H26.6378V23.5053H32.1238V26.7813H26.6378V32.2673H23.3618V26.7813H17.8758V23.5053Z" fill="white"/>
        </svg>
      </a>
	</div>
	<div id="homes-listing-page-size" class="container" style="margin-bottom: 10px">
      Show <select id="page-size">
		<option>10</option>
      	<option>20</option>
		<option>30</option>
      	<option>50</option>
      </select>
      Entries
	</div>
	<div id="homes-listing" class="container" style="height: 630px; overflow-y: auto"></div>
	<style>
     #homes-listing::-webkit-scrollbar {
        width: 12px;
      }

      #homes-listing::-webkit-scrollbar-thumb {
        background-color: #CECECE;
        border-radius: 17px;
      }
	</style>
	<br>
	<div id="homes-paginator" class="container text-center"></div>

<?php  
  wp_enqueue_script( 'morgan_backend_homes_listing' );
  wp_enqueue_script( 'morgan_homes_export' );
  wp_enqueue_script( 'morgan_bootbox' );
  wp_enqueue_style( 'morgan_listing' );

  return ob_get_clean();
}


function get_all_homes() {
    $args = array(
        'post_type' => 'homes',
        'post_status' => 'publish',
        'posts_per_page' => -1,
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
          'price' => get_field('price_v') == 0 ? 'Coming Soon' : '$'+ number_format(get_field('price_v'), 0, '.', ','),
          'sqft' => get_field('sq_foot') ? number_format(get_field('sq_foot'), 0, '', ',') . ' sqft' : 'N/A',
          
          'edit_url' => 'https://www.morgantaylorhomes.com/edit-home/?post=' . get_the_ID(),
          'delete_url' => get_delete_post_link( get_the_ID() ),
          
          'custom_fields' => get_fields(),
        );

        array_push( $homes, $home );
      }
      wp_reset_postdata();
    }
    
    echo '<div id="home-json" style="display: none;">'.json_encode($homes, true).'</div>';
}

/**
 * Load scripts
 */

function load_morgan_backend_homes_listing_scripts() 
{   
  	wp_register_script( 'morgan_backend_homes_listing', plugin_dir_url( __FILE__ ) . 'backend-homes-listing.js', '1.0.0', true );
  	wp_register_script( 'morgan_bootbox', plugin_dir_url( __FILE__ ) . 'lib/bootbox.min.js', '1.0.0', true );
}

add_action('wp_enqueue_scripts', 'load_morgan_backend_homes_listing_scripts');