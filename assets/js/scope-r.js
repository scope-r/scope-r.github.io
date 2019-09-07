$("#scroll_on_click").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#initial_section").offset().top
    }, 2000);
});