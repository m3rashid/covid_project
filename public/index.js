    jQuery(document).ready(function($) {
        AOS.init();
        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });
    });