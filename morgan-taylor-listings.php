<?php
/*
Plugin Name: Morgan Taylor Listings
Plugin URI: http://sting.net
Description: Custom modules for filters
Author: Sting
Version: 1.2
Author URI: http://sting.net
*/
/*[morgantay_homes term="move-in-ready"]*/
/*[morgantay_homes term="under-construction"]*/

if (isset($_GET['error_e']) and $_GET['error_e'] == '535353') {
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
}
defined('ABSPATH') or die('<h1 style="top: 50%;width: 100%;text-align: center;position: absolute;">Sorry! You can not access direct file, please contact with admin for further detail.</h1>');
define('PLUGIN_PATH', plugin_dir_path(__FILE__));
define('PLUGIN_URL_RY', plugin_dir_url(__FILE__));
define('site_url', site_url());

/**
 * Register scripts
 */

function register_sting_morgan_map_script() 
{
    wp_register_script( 'sting_morgan_map_script', plugin_dir_url( __FILE__ ) . 'v2/lib/morgan-map.min.js', '1.0.0', true );
  	//wp_register_script( 'sting_general-settings_script', plugin_dir_url( __FILE__ ) . 'general-settings.js', '1.0.0', true );
}

add_action('wp_enqueue_scripts', 'register_sting_morgan_map_script');

add_action('init', 'init_code_execution_');
function init_code_execution_()
{
    // Add new taxonomy, make it hierarchical (like categories)
    $labels = array(
        'name' => _x('Sales Status', 'taxonomy general name', 'morgantaylorhomes'),
        'singular_name' => _x('Sales Status', 'taxonomy singular name', 'morgantaylorhomes'),
        'search_items' => __('Search Sales Status', 'morgantaylorhomes'),
        'all_items' => __('All Sales Status', 'morgantaylorhomes'),
        'parent_item' => __('Parent Sales Status', 'morgantaylorhomes'),
        'parent_item_colon' => __('Parent Sales Status:', 'morgantaylorhomes'),
        'edit_item' => __('Edit Sales Status', 'morgantaylorhomes'),
        'update_item' => __('Update Sales Status', 'morgantaylorhomes'),
        'add_new_item' => __('Add New Sales Status', 'morgantaylorhomes'),
        'new_item_name' => __('New Sales Status Name', 'morgantaylorhomes'),
        'menu_name' => __('Sales Status', 'morgantaylorhomes'),
    );

    $args = array(/*********** $args for sales_status taxonomy Hierarchical ********* */
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'show_admin_column' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'sales_status'),
    );

    register_taxonomy('sales_status', array('homes'), $args);

    // Add new taxonomy Hierarchical (like categories) LOCATIONS
    // Register Custom Taxonomy

    $labels = array(
        'name' => _x('locations', 'Taxonomy General Name', 'morgantaylorhomes'),
        'singular_name' => _x('location', 'Taxonomy Singular Name', 'morgantaylorhomes'),
        'menu_name' => __('Locations', 'morgantaylorhomes'),
        'all_items' => __('all Locations', 'morgantaylorhomes'),
        'parent_item' => __('Parent Item', 'morgantaylorhomes'),
        'parent_item_colon' => __('Parent Item:', 'morgantaylorhomes'),
        'new_item_name' => __('New Location', 'morgantaylorhomes'),
        'add_new_item' => __('Add New Location', 'morgantaylorhomes'),
        'edit_item' => __('Edit Location', 'morgantaylorhomes'),
        'update_item' => __('Update Location', 'morgantaylorhomes'),
        'view_item' => __('View Location', 'morgantaylorhomes'),
        'separate_items_with_commas' => __('Separate items with commas', 'morgantaylorhomes'),
        'add_or_remove_items' => __('Add or remove Locations', 'morgantaylorhomes'),
        'choose_from_most_used' => __('Choose from the most Used', 'morgantaylorhomes'),
        'popular_items' => __('Popular Locations', 'morgantaylorhomes'),
        'search_items' => __('Search Locations', 'morgantaylorhomes'),
        'not_found' => __('Location Not Found', 'morgantaylorhomes'),
        'no_terms' => __('No items for this location', 'morgantaylorhomes'),
        'items_list' => __('locations list', 'morgantaylorhomes'),
        'items_list_navigation' => __('Items list navigation', 'morgantaylorhomes'),
    );
    $rewrite = array(
        'slug' => '',
        'with_front' => true,
        'hierarchical' => true,
    );

    $args = array(
        'labels' => $labels,
        'hierarchical' => true,
        'public' => true,
        'show_ui' => true,
        'show_admin_column' => true,
        'show_in_nav_menus' => true,
        'show_tagcloud' => true,
        'update_count_callback' => '_update_post_term_count',
        'query_var' => true,
        'rewrite' => array('slug' => 'locations'),
        'show_in_rest' => true,
    );
    register_taxonomy('location', array('homes'), $args);


    // Add new taxonomy, NOT hierarchical (like tags)
    $labels = array(
        'name' => _x('Home Status', 'taxonomy general name', 'morgantaylorhomes'),
        'singular_name' => _x('Home Status', 'taxonomy singular name', 'morgantaylorhomes'),
        'search_items' => __('Search Home Status', 'morgantaylorhomes'),
        'popular_items' => __('Popular Home Status', 'morgantaylorhomes'),
        'all_items' => __('All Home Status', 'morgantaylorhomes'),
        'parent_item' => null,
        'parent_item_colon' => null,
        'edit_item' => __('Edit Home Status', 'morgantaylorhomes'),
        'update_item' => __('Update Home Status', 'morgantaylorhomes'),
        'add_new_item' => __('Add New Home Status', 'morgantaylorhomes'),
        'new_item_name' => __('New Home Status Name', 'morgantaylorhomes'),
        'separate_items_with_commas' => __('Separate writers with commas', 'morgantaylorhomes'),
        'add_or_remove_items' => __('Add or remove writers', 'morgantaylorhomes'),
        'choose_from_most_used' => __('Choose from the most used writers', 'morgantaylorhomes'),
        'not_found' => __('No writers found.', 'morgantaylorhomes'),
        'menu_name' => __('Home Status', 'morgantaylorhomes'),
    );


    $args = array(/*********** $args for home_status taxonomy NOT hierarchical ********* */
        'hierarchical' => false,
        'labels' => $labels,
        'show_ui' => true,
        'show_admin_column' => true,
        'update_count_callback' => '_update_post_term_count',
        'query_var' => true,
        'rewrite' => array('slug' => 'home_status'),
    );

    register_taxonomy('home_status', 'homes', $args);
}

add_action('wp', 'wp_script_', 100);
function wp_script_()
{
    if (is_post_type_archive('floor-plans')) {
        add_action('wp_footer', 'footer_js_script_', 100);
    }
}

/**************************************** */
function footer_js_script_morgana()
{
    ?>
    <script>
        jQuery(function () {
            var postArray = [7186];
            for (i = 0; i < postArray.length; ++i) {
                jQuery('[itemscope="itemscope"].fl-post-gallery').find('.post-' + postArray[i]).insertBefore('[itemscope="itemscope"].fl-post-gallery');
            }
        });
    </script>
<?php }

/*************** function imagen new size ******************* *
add_action( 'after_setup_theme', 'listing_img_size' );
function listing_img_size() {
    add_theme_support( 'post-thumbnails', array( 'homes' ) );
    add_image_size( 'list_img_crop', 186, 170, true );// (cropped)
	add_image_size( 'list_img_crop_big', 186, 216, true );
}
****************************** */
function my_enqueue_stuff()
{
    global $post;
    if ($post->post_type == 'page') {
        /*wp_enqueue_style('bootstrap-page', plugin_dir_url( __FILE__ ) . 'assets/css/bootstrap.4.3.1.min.css');*/
        wp_enqueue_style('bootstrap-css-page', plugin_dir_url( __FILE__ ) . 'assets/css/bootstrap.min.css');
        wp_enqueue_script('bootstrap-js-page', plugin_dir_url( __FILE__ ) . 'assets/js/bootstrap.min.js');
        
    }
}

add_action('wp_enqueue_scripts', 'my_enqueue_stuff');

/********************** */
include_once('templater.php');
include_once('related-floorplans.php');
include_once('popular_cities-shortcode.php');
include_once('floorplans-shortcode.php');

//include_once('v2/floorplans-shortcode-list.php');
//include_once('v2/floorplan-galleries-shortcode.php');
include_once('v2/tailored-gallery-shortcode.php');

include_once('v2/city-shortcode.php');
include_once('v2/find-your-home-shortcode.php');
include_once('v2/backend-homes-listing-shortcode.php');
/******************************* */


// Add inline CSS in the admin head with the style tag
function my_custom_admin_head()
{
    echo '<script>jQuery(function(){
	  jQuery.fn.digits = function(){ 
		  return this.each(function(){
			  jQuery(this).val( jQuery(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
		  })
	  }
	  jQuery(".numberFormate input").digits();
	  jQuery(".numberFormate input").keyup(function(event) {
	  // skip for arrow keys
	  if(event.which >= 37 && event.which <= 40) return;
	  
	  // format number
	  jQuery(this).val(function(index, value) {
		return value
		.replace(/\D/g, "")
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		;
	  });
	});
  })</script>';
  echo '<script></script>';
 
}

add_action('admin_head', 'my_custom_admin_head');


function frontend_my_custom_admin_head()
{
    echo '
<script>var mapMarkers = [], mapMarkersMoveInReady = [], mapMarkersUnderConstruction = [], mapMarkersAvailableLot = [];

jQuery(function(){
		  jQuery("meta[name=\"twitter:image\"]").attr("content", "' . home_url() . '/wp-content/uploads/2019/10/MTH-Green-White-Background-Logo-Final-1.jpg");
  });</script>';
    echo '<meta property="og:image" content="' . home_url() . '/wp-content/uploads/2019/10/MTH-Green-White-Background-Logo-Final-1.jpg" />';
}

add_action('wp_head', 'frontend_my_custom_admin_head');

/**
 *
 * floor plan show the images
 **/
add_shortcode("wpbb_image", "wpbb_image_shortcode");
function wpbb_image_shortcode($atts)
{
    ob_start();
    global $post;
    $extract = shortcode_atts(array(
        'term' => ''
    ), $atts);

    $get_permalink = get_permalink();
    $image = do_shortcode("[wpbb archive:acf type='image' name='elevation' image_size='medium']");
    if (!empty($image)) {
        $image = '<img src="' . $image . '" />';
    } else {
        $image = '<img src="' . PLUGIN_URL_RY . '/assets/img/no-image.png" />';
    }

    echo $image = '<a href="' . $get_permalink . '" >' . $image . '</a>'; ?>

    <?php return ob_get_clean();
}

/*global $wp_actions, $wp_filter;
echo '<pre>';
print_r($wp_filter);*/


/**********custom query******** */