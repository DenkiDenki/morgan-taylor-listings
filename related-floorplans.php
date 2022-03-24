<?php
/**
 *create shortcode for related floor plans for lots.
 *
 * 
 */
function add_my_pageBuileerstylesheet2() 
{
    wp_enqueue_style( 'shortcodeStylefloors', PLUGIN_URL_RY . 'css/style-carousel.css' );
}

add_action('wp_enqueue_scripts', 'add_my_pageBuileerstylesheet2');
add_shortcode("morgantay_rel_lots", "morgantay_rel_lots_shortcode");
function morgantay_rel_lots_shortcode($atts)
{
    ob_start();
    global $wpdb;
    global $post;

/*$product_terms = wp_get_object_terms($post->ID,  'model_type');
if ( ! empty( $product_terms ) ) {
	if ( ! is_wp_error( $product_terms ) ) {
		echo '<ul>';
			foreach( $product_terms as $term ) {
				echo '<li><a href="' . get_term_link( $term->slug, 'model_type' ) . '">' . esc_html( $term->name ) .'</a></li>'.  esc_html( $term->term_id ) ; 
			}
        echo '</ul>';
	}
}*/

$posts = get_field('relation_floor_plans');
echo '<div>
<div class="carousel_rel_floor-plan">
    <ul class="slides">';
$slds=1;
if( $posts ){ 
    
    foreach( $posts as $post){ // variable must be called $post (IMPORTANT) 
         setup_postdata($post);
         $beds= get_field('beds');
         $description= get_field('fp_rel_description');
         $permalink = get_permalink();
         $title = get_the_title();
         $title_und = strtolower($title);
        $title_upp =  ucwords($title_und); 
         $images = get_field('gallery');
         $elevation= get_field('mobile_header');
         $imgurl = $images[0]['sizes']['medium'];
         if (empty($images[0]['sizes']['medium'])) {
             $imgurl = PLUGIN_URL_RY . '/wp-content/uploads/2021/11/Pending-Refresh-II.jpeg';
         }
        
         $img_prev=$slds-1;
         $img_next=$slds+1;
         if($slds==1){
             
         }
         echo '
                        <input type="radio" name="radio-buttons" id="img-'.$slds.'" checked/>
                        <li class="slide-container">
                            <div class="slide-image">
                            <h1 class="rltd_fp-title">'.$title_upp .'</h1>
                            
                        <p class="rltd_fp-desc">'.$description.'</p>
                                <img src="'. $elevation.'">
                                <p class="rltd_fp-link"><a href="'. $permalink .'">Learn More About '.$title_upp.' </a></p>
                            </div>
                            
                            <div class="carousel-controls">
                                <label for="img-'.$img_prev.'" class="prev-slide">
                                    <span>&lsaquo;</span>
                                </label>
                                <label for="img-'.$img_next.'" class="next-slide">
                                  <span>&rsaquo;</span>
                                </label>
                                </div>
                        </li>';
        $slds++;
    }
   
   echo'   <div class="carousel-dots">';
   for($i=1; $i< $slds; $i++){
   	echo' <label for="img-'.$i.'" class="carousel-dot" id="img-dot-'.$i.'"></label>';
   }
    wp_reset_postdata(); // IMPORTANT - reset the $post object so the rest of the page works correctly 
} else {
  	 $post = get_post( 7325 ); //THIS IS THE ID FOR THE AGAVE FLOORPLAN
     $title = get_the_title();
     $description= get_field('related_description');
     $elevation= get_field('mobile_header');
     $permalink = get_permalink();
   	echo '
                        	<input type="radio" name="radio-buttons" id="img-default" checked/>
                        	<li class="slide-container">
                            	<div class="slide-image">
                                <h1 class="rltd_fp-title">'.$title .'</h1>
                                <p class="rltd_fp-desc">'.$description.'</p>
                                <img src="'. $elevation.'">
                                <p class="rltd_fp-link"><a href="'. $permalink .'">See More Homes with Floor Plan '.$title.' </a></p>
                              </div>
                            </li>';
   }
  echo'
</div></ul>
</div>';
            return ob_get_clean();

}
