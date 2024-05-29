
    document.addEventListener('DOMContentLoaded', function () {
        var swiper = new swiper('.swiper-container', {
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
                delay: 5000,
                disableOnInteraction: false,
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

        var swipeButton = document.getElementById('swipeButton');
        swipeButton.style.display = 'block';

        swipeButton.addEventListener('click', function () {
            swiper.slideNext();
        });
    });

