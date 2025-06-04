$(function(){
    let $slider = $('.carousel');
    let $slideContainer = $('.carousel-image-container');
    let $slides = $('.carousel-items');

    let $prevButton = $('#left-arrow');
    let $nextButton = $('#right-arrow');

    let currentIndex = 0;
    let totalSlides = $slides.length;
    let slideWidth = $slider.width();

    $slides.css('width', slideWidth + 'px');
    updateArrowStates();

    let animationSpeed = 500;
    let easingFunction = 'ease-in-out';
    
    function goToSlide(index){
        if(index<0){
            index = 0;
        } else if (index >= totalSlides){
            index = totalSlides-1;
        }

        $slideContainer.css('transition', 'transform ' + (animationSpeed / 1000) + 's ' + easingFunction);
        $slideContainer.css('transform', 'translateX(' + (-index * slideWidth) + 'px');
        currentIndex = index;
        updateArrowStates();
    }

    function updateArrowStates(){
        if(currentIndex === 0){
            $prevButton.css('opacity', '0');
            $prevButton.css('cursor', 'default');
        } else {
            $prevButton.css('opacity', '1');
            $prevButton.css('cursor', 'pointer');
        }

        if(currentIndex === totalSlides-1){
            $nextButton.css('opacity', '0');
            $nextButton.css('cursor', 'default');
        } else {
            $nextButton.css('opacity', '1');
            $nextButton.css('cursor', 'pointer');
        }
    }
    
    $nextButton.on('click', function(){
         if (currentIndex < totalSlides - 1) {
            goToSlide(currentIndex + 1);
        }
    });

    $prevButton.on('click', function(){
        if (currentIndex != 0) {
            goToSlide(currentIndex - 1);
        }
    })

    setupSlider();
})