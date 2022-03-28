var mappedFields = [];
function mapCustomFields() {
    var gallerySlyder; 
    var floorplanCol;
    var description;
    function galleryVisibility() {
        if (individualHome.image.length == 0) {
            gallerySlyder = document.querySelector('.row___gallery-slider');
            gallerySlyder.classList.add("gallerySlyder___hidden");
            //gallerySlyder.style.display = 'none!important';
        }
    }

    function floorplansVisibility() {
        if (individualHome.floorplans.length == 0) {
            floorplanCol = document.querySelector(".col___floorplan");
            //floorplanCol.style.display = 'none!important';
            floorplanCol.classList.add("floorplanCol___hidden");
            description = document.querySelector(".col___description");
            //description.style.width = '100%!important';
            description.classList.add("description___hidden");
            console.log('si se aplica');
        }
    }
    galleryVisibility();

    floorplansVisibility();
  }
  mapCustomFields();