<?php

defined('ABSPATH') or die('<h1 style="top: 50%;width: 100%;text-align: center;position: absolute;">Sorry! You can not access direct file, please contact with admin for furthor detail.</h1>');

add_shortcode("morgan_floorplan_gallery", "morgan_floorplan_gallery_shortcode");

function morgan_floorplan_gallery_shortcode($atts)
{	
    ob_start();
    get_floorplan_gallery();

  wp_enqueue_script( 'morgan_backend_homes_listing' );
  wp_enqueue_script( 'morgan_homes_export' );
  wp_enqueue_script( 'morgan_bootbox' );
  wp_enqueue_style( 'morgan_listing' );

  return ob_get_clean();
}


function get_floorplan_gallery() {
    isset($_GET["id"]) ? $id_fp = $_GET["id"] : ""; /* check */
    $args = array(
        'post_type' => 'floor-plans',
        'post_status' => 'publish',
        'p' => $id_fp,
    );
    $query = new WP_Query( $args );
   
  	$floorplans = array();
  	if( $query->have_posts() ){
      while ( $query->have_posts() ){
        $query->the_post();
        $titlef= get_the_title();
        $floorplan = array(
          'title' => get_the_title(),
          'permalink' => get_permalink(),
          'images' => get_field('gallery'),
          'images_thumb' => $images['sizes']['thumbnail'],
        );
        array_push($floorplans, $floorplan);
      }
      wp_reset_postdata();
    }
    
    echo '<div id="floor2-json" style="display: none;">'.json_encode($floorplans, true).'</div>';
    file_put_contents( 'floors-data2.js', 'var floors2 = '.json_encode($floorplans, true));
}

/**
 * Load scripts
 */

function load_morgan_gallery_scripts() 
{   
    wp_register_style( 'slick_gallery_stylesheet', 'https://www.morgantaylorhomes.com/wp-content/plugins/morgan-taylor-listings/assets/slick-1.8.1/slick/slick.css', '1.0.0', true );
    wp_register_script( 'slick_gallery_script', 'https://www.morgantaylorhomes.com/wp-content/plugins/morgan-taylor-listings/assets/slick-1.8.1/slick/slick.js', '1.0.0', true );
}

add_action('wp_enqueue_scripts', 'load_morgan_gallery_scripts');

function load_morgan_floorplans_scripts2() 
{   
  wp_register_script( 'slick-slider-gallery-js', 'https://www.morgantaylorhomes.com/wp-content/plugins/morgan-taylor-listings/v2/slider-gallery-floorplan.js', '1.0.0', true );
}

add_action('wp_enqueue_scripts', 'load_morgan_floorplans_scripts2');
/*
wp_enqueue_script( 'slick-slider-gallery-js' );
wp_enqueue_script( 'slick_gallery_script' );
wp_enqueue_script( 'slick_gallery_stylesheet' ); */