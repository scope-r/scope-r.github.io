var date = new Date();
var this_year = date.getFullYear();

var copyright_text = $("#valid_date").html();

// Replace the year with the current year
$("#valid_date").html(
  copyright_text.replace("$date", this_year));

$("#form_submit").click(function (event) {
  event.stopImmediatePropagation();
  event.preventDefault();

  // Make sure that the captcha button was clicked
  var response = grecaptcha.getResponse();
  if (response != "") {

    var payload = {
      "text": "`Name` " + $("#name").val() +
        " `Email` " + $("#email_address").val() +
        " `Message` " + $("#message").val()
    };

    $.post({
      url: "https://hooks.slack.com/services/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",
      data: JSON.stringify(payload),
      success: function (response) {
        alert("Thank you for your message");
        $("#name").val('');
        $("#email_address").val('');
        $("#message").val('');
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
