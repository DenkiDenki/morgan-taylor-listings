<?php
defined('ABSPATH') or die('<h1 style="top: 50%;width: 100%;text-align: center;position: absolute;">Sorry! You can not access direct file, please contact with admin for furthor detail.</h1>');
/**
 * create shortcode for morgan home page listing
 **/
add_shortcode("morgan_tailored_gallery", "morgan_tailored_shortcode");
function morgan_tailored_shortcode($atts)
{   
    ob_start();
    global $wpdb;
    global $post;
    gallery_floorplans_destroy();
     ?> 

    <div id="content-wrap-slide" >
    <button id="openscreen" onclick="launchFullScreen();"> Full Screen </button>
<button id="closescreen" onclick="exitFullScreen();"> close </button>
          <div id="slider-gallery" class="slideshow-gallery-wrapper">
          <?php  get_tailored_gallery();?> 
            </div> 
             </div><!-- #content-wrap --> 
             <?php 
}

function  get_tailored_gallery() {

   // isset($_GET["id"]) ? $id_fp = $_GET["id"] : ""; /* check */
   $id_fp = get_the_ID();

    $args = array(
        'post_type' => 'tailored_home',
        'post_status' => 'publish',
        'p' => $id_fp,
    );
 
    $query = new WP_Query( $args );
  	if( $query->have_posts() ){
      while ( $query->have_posts() ){
             $query->the_post();
             $images = get_field('gallery');

            if( $images ){
                /* $images_string = implode( ',', $images['id'] );*/
                foreach( $images as $image ){
                   $imgurl = esc_url($image['url']);
                   $imgurl_alt = esc_attr($image['alt']);
                    echo'<img src="'.$imgurl.'" alt="'.$imgurl_alt.'" />';
                }
            };
      wp_reset_postdata();
    }
    
  }
}
  function load_morgan_tailored_scripts() 
    {   
      wp_register_script( 'slick-slider-gallery-tailored-js', 'https://www.morgantaylorhomes.com/wp-content/plugins/morgan-taylor-listings/v2/slider-gallery-tailored.js', '1.0.0');
    }
    add_action('wp_enqueue_scripts', 'load_morgan_tailored_scripts');
/**** */
function gallery_floorplans_destroy() {
  ?>
  <script>
  <!-- slick -->
  $(document).ready(function(){
  
    $('.slideshow-gallery-wrapper').slick('destroy');
      
});

</script>
  <?php 
}