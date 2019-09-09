var date = new Date();
var this_year = date.getFullYear();

var copyright_text = $("#valid_date").html();

// Replace the year with the current year
$("#valid_date").html(
    copyright_text.replace("$date", this_year));

$(".scroll-on-click").click(function(object) {
    var location = $(object.currentTarget).data("scrollTarget");
    debugger;
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#" + location).offset().top
    }, 2000);
});
