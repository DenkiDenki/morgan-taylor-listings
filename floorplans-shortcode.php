<?php
defined('ABSPATH') or die('<h1 style="top: 50%;width: 100%;text-align: center;position: absolute;">Sorry! You can not access direct file, please contact with admin for furthor detail.</h1>');
/**
 * create shortcode for morgan home page listing
 **/
add_shortcode("morgan_floorplans", "morgan_floorplans_shortcode");
function morgan_floorplans_shortcode($atts)
{   
    ob_start();
    global $wpdb;
    global $post;
    wp_enqueue_style( 'morgan_listing' );
   
// WP_Query arguments
$args = array(
	'post_type'              => array( 'floor-plans' ),
    'post_status'            => array( 'publish' ),
    'post__not_in' => array(11637),
	'posts_per_page' => -1,
        'meta_key'			=> 'sq_foot',
	    'orderby'			=> 'meta_value_num',
	    'order'				=> 'DESC',
);
echo'<div id="full-img-floorplan"></div>';
// The Query
$query_plans = new WP_Query( $args );
$floorplan = array();
// The Loop
if ( $query_plans->have_posts() ) {
    foreach ($query_plans->posts as $post) {
    setup_postdata($post);
    $id= get_the_ID();
    $beds= get_field('beds');
    $bathroom= get_field('baths');
    $description= get_field('fp_rel_description');
    $permalink = get_permalink();
    $title = get_the_title();
    $title_und = strtolower($title);
   $title_upp =  ucwords($title_und); 
   $model= get_field('model_name');
   $sqft= get_field('sq_foot');
   $facebook_url = 'https://www.facebook.com/sharer/sharer.php?u='.get_permalink();
   $pinterest_url = 'https://pinterest.com/pin/create/bookmarklet/?media=_media&url='.get_permalink(); /*_media will be replaced with Javascript in a future process*/
   $twitter_url = 'https://twitter.com/share?url='.get_permalink();
   $type= get_field('type-construct');
   $type_string = !empty($type) ? join(" / ",$type) : '';
   $img_florplan= get_field('floor_plan_img');
   $img_florplan_url= $img_florplan[0]['sizes']['large'];
    $images = get_field('gallery');
    
    $elevation= get_field('mobile_header');
    $thumb= get_field('floor_plan_img_copy');
    $thumb_img = $thumb['sizes']['thumbnail'];
    $imgurl = $images[0]['sizes']['medium'];
    if (empty($images[0]['sizes']['medium'])) {
        $imgurl = PLUGIN_URL_RY . '/assets/img/no-image.jpg';
    }
  
/**** */
/**** */
    echo '
    <div class="wrapper">
    <section id="floor-'.$id.'" class="floor-listing-item col-lg-6" style="position: relative;">
    <div class="elevation-f"><a href="'.$permalink.'"">
        <img loading="lazy" class="home lazy" data-src="'.$elevation.'" src="'.$elevation.'"/>
        </a> 
    </div>
    <figure class="floor-p-f">
		    <ul class="lb-album">
			<li>
        <a href="'.$img_florplan_url.'" class="lightbox_trigger">
        <img loading="lazy" class="lazy" data-src="'.$thumb_img.'" src="'.$thumb_img.'" alt="image'.$id.'" />
        </a> 
            </li>
            </ul>
    </figure>
    <div class="floor-info">
        <span class="title-and-price">
            <b class="floor-title">'.$model.'</b>
        </span>
        <p class="home-type"><i class="icon-residential"></i>'.$type_string.'</p>
        <p>
            <span class="home-bed"><i class="icon-bed"></i>'.$beds.'</span>
            <span class="home-bath"><i class="icon-bath"></i>'.$bathroom.'</span>
            <span class="home-sqft"><i class="icon-sin-título-1-copia"></i>'.$sqft.' Sqft'.'</span>
        </p>
        <div class="floor-actions">
        <a class="floor-details" href="'.$permalink.'" title="Get details" target="_blank">More Info<span>></span></a>
    </div>
    </div>
    
    </section>
    </div>';
}
    wp_reset_postdata();
} else {
    // no posts found
    echo 'no posts found';
}

// Restore original Post Data
  return ob_get_clean();
  
}
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

 
}

/******** */
