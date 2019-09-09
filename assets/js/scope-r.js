$(".scroll-on-click").click(function(object) {
    var location = $(object.currentTarget).data("scrollTarget");
    debugger;
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#" + location).offset().top
    }, 2000);
});
