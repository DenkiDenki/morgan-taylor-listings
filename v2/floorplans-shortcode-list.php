<?php
defined('ABSPATH') or die('<h1 style="top: 50%;width: 100%;text-align: center;position: absolute;">Sorry! You can not access direct file, please contact with admin for furthor detail.</h1>');
/**
 * create shortcode for morgan home page listing
 **/
add_shortcode("morgan_floorplans_list", "morgan_floorplans_list_shortcode");
function morgan_floorplans_list_shortcode($atts)
{   
    ob_start();
    get_all_floorplans();
   /*global $wpdb;
    global $post;*/
    wp_enqueue_style( 'morgan_listing' );
    return ob_get_clean();
}

function get_all_floorplans() { 
// WP_Query arguments
$args = array(
	'post_type'              => 'floor-plans',
    'post_status'            => 'publish',
    'post__not_in' => array(11637),
	'posts_per_page' => 100,
        'orderby' => 'post_title',
        'order' => 'asc',
);

echo'<div id="full-img-floorplan"></div>';
// The Query
$query_plans_list = new WP_Query( $args );

$floorplans = array();
// The Loop
if ( $query_plans_list->have_posts() ) {
    while ($query_plans_list->have_posts()) {
    $query_plans_list->the_post();
/**** */
$floorplan = array(
    'id'=> get_the_ID(),
    'beds'=> get_field('beds'),
    'bathroom'=> get_field('baths'),
    'description'=> get_field('fp_rel_description'),
    'permalink' => get_permalink(),
    'title' => get_the_title(),
    'title_und' => strtolower($title),
    'title_upp' =>  ucwords($title_und), 
    'model'=> get_field('model_name'),
    'sqft'=> get_field('sq_foot'),
    'facebook_url' => 'https://www.facebook.com/sharer/sharer.php?u='.get_permalink(),
    'pinterest_url' => 'https://pinterest.com/pin/create/bookmarklet/?media=_media&url='.get_permalink(), /*_media will be replaced with Javascript in a future process*/
    'twitter_url' => 'https://twitter.com/share?url='.get_permalink(),
    'type'=> get_field('type-construct'),
    'type_string' => !empty($type) ? join(" / ",$type) : '',
    'img_florplan'=> get_field('floor_plan_img'),
    'img_florplan_url'=> $img_florplan[0]['sizes']['large'],
    'images' => get_field('gallery'),
    
    'elevation'=> get_field('mobile_header'),
    'thumb'=> get_field('floor_plan_img_copy'),
    'thumb_img' => $thumb['sizes']['thumbnail'],
    'imgurl' => $images[0]['sizes']['medium'] ? $images[0]['sizes']['medium'] : PLUGIN_URL_RY . '/wp-content/uploads/2021/11/Pending-Refresh-II.jpeg',
    'gallery_url' => '/gallery/?id=' . $id, /** send id the gallery page */
    
); 

array_push($floorplans, $floorplan);
/**** */
}
    wp_reset_postdata();
}
echo '<div id="floor-json" style="display: none;">'.json_encode($floorplans, true).'</div>';
}
file_put_contents( 'floors-data.js', 'var floors = '.json_encode($floorplans, true));
/*
function toggleshare_floorplans_admin_head()
{
    ?>
    <script>
        jQuery(document).on("click", "a.floor-sharer", function(event){
        event.preventDefault();
          let floorId = jQuery(this).data("floor-id");
        jQuery(`#floor-${floorId}`).addClass("with-sharer-overlay");
    })
    
    jQuery(document).on("click", "section.home-share-overlay", function(event){  
        let homeId = jQuery(this).data("floor-id");
        jQuery(`#floor-${floorId}`).removeClass("with-sharer-overlay");
    })
    </script>
<?php 

 
}*/

/******** */
