<?php
/**
 * Template Name: Edit Homes Frontend Form
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

add_action( 'wp_print_styles', 'tsm_deregister_admin_styles', 999 );
function tsm_deregister_admin_styles() {
 // Bail if not logged in or not able to post
if ( is_user_logged_in() || current_user_can('publish_posts') ) { // Execute code if user is logged in
    acf_form_head();
}
wp_deregister_style( 'wp-admin' );
}
//the code above does not protect the route, so:
if ( ! is_user_logged_in() || ! current_user_can('administrator') ) {
  wp_redirect( '/' );
}

 get_header(); ?>
 <?php
$post_id = isset($_GET["post"]) ? $_GET["post"] : "new_post";
/*if ($post_id === 'new_post') { 
	//THIS AVOID ACCESS TO BEAVER BUILDER EDITOR
	wp_redirect( '/create-home' );
	exit;
}*/
 ?>
	<div id="primary">
		<div id="content" role="main">
              <?php /* The loop */ ?>
              <?php while ( have_posts() ) : the_post(); ?>

              <?php the_content(); ?>
                  <?php acf_form(array(
              'post_id'  => $post_id,
              'new_post' => array(
                  'post_type'   => 'homes',
                  'post_status' => 'publish',
                  'field_groups' => array('group_id'   => '6786')
              ),
              'html_submit_button'  => '<div class="container"><input type="submit" class="acf-button button button-primary button-large" value="%s" /></div>',
              'post_title'  => true,
              'post_content'=> false,
              'html_before_fields' => '<div class="container">',
              'html_after_fields'  => '</div>',
              'return' => site_url().'/edit-home?post='.$post_id,
              //'return' => '%post_url%',
              'submit_value'       => 'Update Home',
              'updated_message'    => 'Updated!'
              )); ?>

              <?php endwhile; ?>
		</div><!-- #content -->
	</div><!-- #primary -->

<?php get_footer(); ?>
