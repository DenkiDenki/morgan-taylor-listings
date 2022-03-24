//talk button
$(document).on('click', '.talkShare > .talkBox', function() {
  const shareOption = document.querySelectorAll('.share-option');
  for (let i = 0; i < shareOption.length; i++) {
    
    element.addEventListener('click', (e) => {
      var more = document.querySelector(e.target.dataset.toggle);
      more.style.visibility = 'visible';   
  }, false);
  var self = $('.socialBox');
  var element = $('.talkGallery a');
  var c = 0;

  if (self.hasClass('animate')) {
    return;
  }

  if (!self.hasClass('open')) {

    self.addClass('open');

    TweenMax.staggerTo(element, 0.3, {
        opacity: 1,
        visibility: 'visible'
      },
      0.075);
    TweenMax.staggerTo(element, 0.3, {
        top: -12,
        ease: Cubic.easeOut
      },
      0.075);

    TweenMax.staggerTo(element, 0.2, {
        top: 0,
        delay: 0.1,
        ease: Cubic.easeOut,
        onComplete: function() {
          c++;
          if (c >= element.length) {
            self.removeClass('animate');
          }
        }
      },
      0.075);

    self.addClass('animate');

  } else {

    TweenMax.staggerTo(element, 0.3, {
        opacity: 0,
        onComplete: function() {
          c++;
          if (c >= element.length) {
            self.removeClass('open animate');
            element.css('visibility', 'hidden');
          };
        }
      },
      0.075);
  }
}
}
);
//------------------------------
const shareOption = document.querySelectorAll('.share-option');
for (let i = 0; i < shareOption.length; i++) {
    var element = shareOption[i];

    element.addEventListener('click', (e) => {
        var more = document.querySelector(e.target.dataset.toggle);
        more.style.display = 'block';   
    }, false);
}

const shareBtn = document.querySelectorAll('.talkShare');
for (let i = 0; i < shareBtn.length; i++) {
    var element = shareBtn[i];

    element.addEventListener('click', (e) => {
        var more = document.querySelector(e.target.dataset.toggle);
        var talkbselec = more+" .talkGallery a";
        talkbselec.style.visibility = 'visible!important';
        talkbselec.style.opacity = '1!important';
    }, false);
}


.more { display:none }
<div id="contenido1" class="more"> Contenido 1 </div>
<div class="expand-button" data-toggle="#contenido1">Expandir</div>

<div id="contenido2" class="more"> Contenido 2 </div>
<div class="expand-button" data-toggle="#contenido2">Expandir</div>

<span class="talkShare">
                <div class="talkBox pointer">
                        <span class="btn-talk icon-group"><span class="n-share">Talk to Us</span></span>
                    <div class="talkGallery">
                        <div class="talkToolBox">
                        <a class="g share-option" href=""><i class="icon-group" title="call"></i></a>
                        <a class="g share-option" href="mailto:?subject=MTH:'. $title . '&body=Hi. Take a look at this property: URL to the corresponding HOMES page ' . $permalink . '" title="Share by Email"><i class="icon-letter"></i></a>
                        <a class="g share-option" href="" title="chat"><i class="icon-chat"></i></a>
                        </div>
                    </div>
                  </div>
                </span>