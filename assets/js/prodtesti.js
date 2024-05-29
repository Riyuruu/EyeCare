document.addEventListener('DOMContentLoaded', function () {
    // Initialize Swiper
    var swiper = new swiper('.testimonial-carousel', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 5000, // Autoplay delay in milliseconds
            disableOnInteraction: false, // Autoplay still works when user manually changes slide
        },
        on: {
            slideChange: function () {
                var moveIndicator = document.querySelector('.move-indicator');
                if (moveIndicator) {
                    moveIndicator.style.opacity = '0';
                    setTimeout(function () {
                        moveIndicator.style.opacity = '1';
                    }, 300);
                }
            },
        },
    });

    // Show move indicator on hover
    var swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.addEventListener('mouseenter', function () {
        var moveIndicator = document.querySelector('.move-indicator');
        if (moveIndicator) {
            moveIndicator.style.opacity = '1';
        }
    });

    swiperWrapper.addEventListener('mouseleave', function () {
        var moveIndicator = document.querySelector('.move-indicator');
        if (moveIndicator) {
            moveIndicator.style.opacity = '0';
        }
    });

    // Show swipe button on load and set its behavior
    var swipeButton = document.getElementById('swipeButton');
    swipeButton.style.display = 'block'; // Initially hidden in CSS, now show it

    swipeButton.addEventListener('click', function () {
        swiper.slideNext();
    });
});
