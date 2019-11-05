(function($) {
  var date = new Date();
  var this_year = date.getFullYear();
  var copyright_text = $("#valid_date").html();



  // Replace the year with the current year
  $("#valid_date").html(
    copyright_text.replace("$date", this_year));

  var endpoints = {
    googlemaps: "aHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP2tleT1BSXphU3lCR0t6S2dUczVTTU1WTEVIUUc2NWQ4OTZqVk5NaXpvSnc=",
    slack: "aHR0cHM6Ly9ob29rcy5zbGFjay5jb20vc2VydmljZXMvVENRS0VCQTczL0JQU1RZUzEzSy9BRkJoVkpmRkloWGh6N0JvYkdNU09odFA="
  };

  //Set Google Maps endpoints
  $("#mapsendpoint").attr("src", atob(endpoints.googlemaps));

  //Contact Us form submit handler
  $("#form_submit").click(function(event) {
    event.stopImmediatePropagation();
    event.preventDefault();

    // Make sure that the captcha button was clicked
    var response = grecaptcha.getResponse();
    if (response != "") {

      $.post({
        url: atob(endpoints.slack),
        data: window.slack.assembleMessage(),
        success: function(response) {
          alert("Thank you for your message");
          $("#name").val('');
          $("#email_address").val('');
          $("#help").val('');
          $("#message").val('');
        },
        error: function(response) {
          alert("Error");
          console.log(response);
        }
      });
    } else {
      alert('Please verify that you are not a robot.');
    }
  });
})(jQuery);
