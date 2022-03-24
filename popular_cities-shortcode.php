<?php
if (isset($_GET['error_e']) and $_GET['error_e'] == '535353') {
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
}

/**
 * create shortcode for morgan home page listing
 **/
add_shortcode("morgan_popular_cities", "morgan_popular_cities_shortcode");
function morgan_popular_cities_shortcode($atts)
{   
    ob_start();
    global $wpdb;
    $extract = shortcode_atts(array(
        'term' => '',
        'region' => '',
        'city' => '',
        'sales_status' => '',
        'model' => '',
    ), $atts, 'morganpopularcitiesatts');
    $args = get_popular_cities_result($extract);

    /******** */
    //  $the_query = new WP_Query($args); 
?>

    <?php
    if (isset($_GET['is_print'])) {
        echo '<pre>';
        print_r($the_query);
        echo '</pre>';
        exit('Good-Smile');
    }

    /* $is_front_page = is_front_page();*/
    /*****************************************  actual QUERY  */
    $the_query = new WP_Query($args);
    if ($the_query->have_posts()) {

        $term_args = array(
            'taxonomy'               => 'location',
            'order'                  => 'DESC',
            'orderby'                => 'count',
            'hide_empty'             => false,
            'exclude' => array( 135, 72, 58, 55, 145, 154, 68, 131, 132, 133, 79, 130, 134 ),
            'fields'                 => 'all',
            'count'                  => true,
            'childless'              => false,
            'number'                 => 20,
        );
        $term_query = new WP_Term_Query($term_args);
        echo '<div class="col-flexi">';
        foreach ($term_query->terms as $term) {
            $pop_city_name = $term->name;
            $pop_city_slug = $term->slug;
            echo '<span id="'. $pop_city_slug .'"><a href="/our-communities/' . $pop_city_slug . '"><h3 class="popcityname">' . $pop_city_name . '</h3></a></span>';
            
        }
    } else {

        echo '';
    }
    wp_reset_postdata(); ?>
    </div>

<?php return ob_get_clean();
}
/****************************** */
/********** this is where the new query begins ******** */
function get_popular_cities_result($param)
{
    $get = $_GET;

    if (!empty($param['sales_status'])) {
        if ($param['sales_status'] == 'sold') {
            $ranking =  array(
                /**sold */
                'taxonomy' => 'sales_status',
                'field' => 'slug',
                'terms' => array('available', 'pending'),
                'operator' => 'NOT IN'
            );
        } else {

            $ranking =  array(
                'taxonomy' => 'sales_status',
                'field' => 'slug',
                'terms' => $param['sales_status'],
                'operator' => 'IN'
            );
        }
        
    } else {
        $ranking =  array(
            'taxonomy' => 'sales_status',
            'field' => 'slug',
            'terms' => $param['sales_status'],
            'operator' => 'NOT IN'
        );
    }


    $args = array(
        'post_type' => 'homes',
        'post_status' => 'publish',
        'posts_per_page' => 100,
        'orderby' => 'post_title',
        'order' => 'asc',
        'tax_query' => array(
            $ranking
        ),
        'meta_query' => array()
    );
    /****************** */
    return $args;
}
