var date = new Date();
var this_year = date.getFullYear();

var copyright_text = $("#valid_date").html();

// Replace the year with the current year
$("#valid_date").html(
    copyright_text.replace("$date", this_year));

$("#contactform").submit(function(event){
  event.stopImmediatePropagation();
  event.preventDefault();

  // Make sure that the captcha button was clicked
  var response = grecaptcha.getResponse();
  if (response != "") {
    $.ajax({
        url: "https://hooks.slack.com/services/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",
        method: "POST",
        contentType: "application/json",
        data: '{"text":"Hello, World!"}', //TODO
        success: function(response){
          alert("Thank you for your message");
        },
        error: function(response){
          alert("Error");
          console.log(response);
        }
    });
  }
  else {
    alert('Please verify that you are not a robot.');
  }
});
