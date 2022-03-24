<?php
/**
 * Template Name: test posts.
 * The template for displaying the new home form in Front .
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Astra
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
acf_form_head(); 
/*
* Deregister the admin styles outputted when using acf_form
*/
add_action( 'wp_print_styles', 'read_styles_wp', 999 );
function read_styles_wp() {

}
// Let's register a new field for returning the script srcs
add_action( 'rest_api_init', 'wpse320065_register_rest_field' );

function wpse320065_register_rest_field() {

    register_rest_field( 
      'post', 
      'your-field-name', 
      [
        'get_callback'    => 'wpse320065_fetch_post_cont',
        'schema'          => null,
      ]
    );
}

// Callback function to actually retrieve the data
function wpse320065_fetch_post_cont( $object ) {

    // Get the id of the post object array
    $post_id = $object['id'];

    // Let's get the content of post number 123
    $response = wp_remote_get( "https://www.morgantaylorhomes.com/?p={$post_id}" );

    if ( is_array( $response ) ) {

      $content = $response['body'];

      // Extract the src attributes. You can also use preg_match_all
      $document = new DOMDocument();
      $document->loadHTML( $content );

      // An empty array to store all the 'srcs'
      $scripts_array = [];

      // Store every script's source inside the array
      foreach( $document->getElementsByTagName('script') as $script ) {
        if( $script->hasAttribute('src') ) {
          $scripts_array[] = $script->getAttribute('src');
        }
      }
    }

    return $scripts_array;

}
//the code above does not protect the route, so:
if ( ! is_user_logged_in() || ! current_user_can('administrator') ) {
  wp_redirect( '/' );
}
 get_header(); ?>
	<div id="primary">
		<div id="content" role="main">
              <?php /* The loop */ ?>
              <?php while ( have_posts() ) : the_post(); ?>
              <?php the_content(); ?>
              
              <?php endwhile; ?>    

		</div><!-- #content -->
	</div><!-- #primary -->
<?php get_footer(); ?>