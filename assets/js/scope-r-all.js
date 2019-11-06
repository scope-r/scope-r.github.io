(function($) {
  //Set namespaces
  window.scoper = window.scoper || {};
  window.scoper.slack = window.scoper.slack || {};
  window.scoper.contactus = window.scoper.contactus || {};

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
  
  window.scoper.contactus.formhandler(atob(endpoints.slack));
})(jQuery);

window.scoper.contactus.formhandler = function(endpoint){

  $("#form_submit").click(function(event) {
    event.stopImmediatePropagation();
    event.preventDefault();

    // Make sure that the captcha button was clicked
    var response = grecaptcha.getResponse();
    if (response != "") {

      $.post({
        url: endpoint,
        data: window.scoper.slack.assembleMessage(),
        success: window.scoper.contactus.formsuccess(response),
        error: window.scoper.contactus.formerror(response)
      });
    } else {
      alert('Please verify that you are not a robot.');
    }
  });
};

window.scoper.contactus.formsuccess = function(response){
  alert("Thank you for your message");
  $("#name").val('');
  $("#email_address").val('');
  $("#help").val('');
  $("#message").val('');
};

window.scoper.contactus.formerror = function(response){
  alert("Error");
  console.log(response);
};

window.scoper.slack.payload = {
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*NEW CONTACT REQUEST*"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": ":loudspeaker: A new message was sent to you via the https://scope-r.app website.",
				"verbatim": false
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Contact Details:* \n\n Name: _$name_ \n\n Email: _$email_ \n\n How we can help: _$help_"
			}
		},
        {
			"type": "divider"
		},
        {
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Message:* \n\n _$message_"
			}
		}
	]
};

window.scoper.slack.assembleMessage = function(){

	var message = JSON.stringify(window.scoper.slack.payload);

	return message.replace("$name", $("#name").val())
								.replace("$email", $("#email_address").val())
								.replace("$help", $("#help").val())
								.replace("$message", $("#message").val());
};
