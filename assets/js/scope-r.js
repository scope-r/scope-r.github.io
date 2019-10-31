var date = new Date();
var this_year = date.getFullYear();

var copyright_text = $("#valid_date").html();

// Replace the year with the current year
$("#valid_date").html(
  copyright_text.replace("$date", this_year));

$("#contactform").submit(function (event) {
  event.stopImmediatePropagation();
  event.preventDefault();

  // Make sure that the captcha button was clicked
  var response = grecaptcha.getResponse();
  if (response != "") {

    var payload = {
      "text": $("#name").val() + $("#email_address").val() + $("#message").val()
    };

    var result = JSON.stringify(payload);

    debugger;
    $.ajax({
      url: "https://hooks.slack.com/services/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",
      method: "POST",
      contentType: "application/json",
      data: result,
      success: function (response) {
        alert("Thank you for your message");
      },
      error: function (response) {
        alert("Error");
        console.log(response);
      }
    });
  }
  else {
    alert('Please verify that you are not a robot.');
  }
});
