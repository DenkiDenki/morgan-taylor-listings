<?php
/**
 * **
 * Template Name: Floor Plans Galleries
 * The template to display the floor plan galleries individually.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Astra
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

 get_header(); 
 ?>

	<div id="primary">
		<div id="content" role="main">
        <?php gallery_floorplans_destroy();?> 
        <?php  gallery_floorplans_init();?> 
        <div id="content-wrap-slide" >
        <button id="openscreen" onclick="launchFullScreen();"> Full Screen </button>
    <button id="closescreen" onclick="exitFullScreen();"> close </button>
              <div id="slider-gallery" class="slideshow-gallery-wrapper">
              <?php get_gallery();?> 
                </div> 
                <div class="slider-nav">
                <?php get_gallery();?> 
                </div>
                </div><!-- #content-wrap -->                 
              <?php /* The loop */ ?>
            
              <?php while ( have_posts() ) : the_post(); ?>
              <?php the_content(); ?>
           
              <?php endwhile; ?> 
             
		</div><!-- #content -->
	</div><!-- #primary -->

<?php
function get_gallery() {
isset($_GET["id"]) ? $id_fp = $_GET["id"] : ""; /* check if id was received* */
//echo $id_fp; /** show id in front */

    $args = array(
        'post_type' => 'floor-plans',
        'post_status' => 'publish',
        'p' => $id_fp,
       /* 'slug' => $id_fp,*/
    );
    $query = new WP_Query( $args );
  /**** */
  if( $query->have_posts() ){
while ( $query->have_posts() ){
 $query->the_post();
$plan_name = get_field('model_name');
 $images = get_field('gallery');
if( $images ): ?>
    
            <?php foreach( $images as $image ): ?>
                    <img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
            <?php endforeach; ?>
 
<?php endif; 
}
wp_reset_postdata();

}

}

/***** */

?>

<?php    
    function load_morgan_floorplans_scripts() 
    {   
      wp_register_script( 'slick-slider-gallery-js', 'https://www.morgantaylorhomes.com/wp-content/plugins/morgan-taylor-listings/v2/slider-gallery-floorplan.js', '1.0.0', false);
    }
   
    add_action('wp_enqueue_scripts', 'load_morgan_floorplans_scripts');

    function load_morgan_gallery_assets() 
{   
    wp_register_style( 'slick_gallery_stylesheet', 'https://www.morgantaylorhomes.com/wp-content/plugins/morgan-taylor-listings/assets/slick-1.8.1/slick/slick.css', '1.0.0', true );
    wp_register_script( 'slick_gallery_script', plugin_dir_url( __FILE__ ) . 'https://www.morgantaylorhomes.com/wp-content/plugins/morgan-taylor-listings/assets/slick-1.8.1/slick/slick.js', '1.0.0', true );
}
add_action('wp_enqueue_scripts', 'load_morgan_gallery_assets');

  
    function gallery_floorplans_init()
{
    ?>
    <!-- slick -->

<script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://www.morgantaylorhomes.com/wp-content/plugins/morgan-taylor-listings/assets/slick-1.8.1/slick/slick.css"/>
<link rel="stylesheet" type="text/css" href="https://www.morgantaylorhomes.com/wp-content/plugins/morgan-taylor-listings/assets/slick-1.8.1/slick/slick-theme.css"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.10/jquery.mask.js"></script>
    <script type="text/javascript" src="https://morgantaylorhomes.com/wp-content/plugins/morgan-taylor-listings/assets/slick-1.8.1/slick/slick.js"></script>
    <script>
   $(document).ready(function(){
    $('.slideshow-gallery-wrapper').slick(
        {   
  infinite: true,
  centerMode: true,
  centerPadding: '60px',
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: false,
  speed: 300,
  lazyLoad: 'ondemand',
  autoplay: true,
  autoplaySpeed: 2000,
  fade: true,
  asNavFor: '.slider-nav',
  responsive: [
    {
      breakpoint: 768,
      settings: {
        lazyLoad: 'ondemand',
        arrows: true,
        centerMode: true,
        centerPadding: '40px',
        autoplay: true,
        slidesToShow: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        lazyLoad: 'ondemand',
        arrows: false,
        centerMode: true,
        autoplay: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
}
    );

    $('.slider-nav').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    asNavFor: '.slideshow-gallery-wrapper',
    centerMode: true,
    lazyLoad: 'ondemand',
    autoplay: true,
    arrows: true,
    focusOnSelect: true
  });
	
});
    </script>
    <script>  
    function launchFullScreen(element) {
      var elem = document.getElementById("content-wrap-slide");
      if(elem.requestFullScreen) {
        elem.requestFullScreen();
      } else if(elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if(elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen();
      }
    }
    //pull fullscreen
    function cancelFullScreen(element) {
      var elem2 = document.getElementById("closescreen");
        if(elem2.cancelFullScreen) {
          elem2.cancelFullScreen();
        } else if(document.mozCancelFullScreen) {
          elem2.mozCancelFullScreen();
        } else if(document.webkitCancelFullScreen) {
          elem2.webkitCancelFullScreen();
        }
    }

        function exitFullScreen(){
    if(document.exitFullscreen){
        document.exitFullscreen();
    }
    else if(document.mozCancelFullScreen){
        document.mozCancelFullScreen();
    }
    else if(document.webkitExitFullscreen){
        document.webkitExitFullscreen();
    }
    else if(document.msExitFullscreen){
        document.msExitFullscreen();
    }

}
    </script>
<?php 
}
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
wp_enqueue_script( 'slick-slider-gallery-js' );
wp_enqueue_script( 'slick_gallery_script' );
?>




<?php get_footer(); ?>