(function($) {
  //Set namespaces
  window.scoper = window.scoper || {};
  window.scoper.slack = window.scoper.slack || {};
  window.scoper.contactus = window.scoper.contactus || {};
  window.scoper.beta = window.scoper.beta || {};

  var endpoints = {
    googlemaps: "aHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP2tleT1BSXphU3lCR0t6S2dUczVTTU1WTEVIUUc2NWQ4OTZqVk5NaXpvSnc=",
    contactUsSlack: "aHR0cHM6Ly9ob29rcy5zbGFjay5jb20vc2VydmljZXMvVENRS0VCQTczL0JQU1RZUzEzSy9BRkJoVkpmRkloWGh6N0JvYkdNU09odFA=",
    betaSlack: "aHR0cHM6Ly9ob29rcy5zbGFjay5jb20vc2VydmljZXMvVENRS0VCQTczL0JVNjQzM002Si81Y3NGRU5FRUR2MW9EVXROUE5pRVAwOHc="
  };

  //Set Google Maps endpoints
  $("#mapsendpoint").attr("src", atob(endpoints.googlemaps));

  //Contact Us form submit handler
  $(function() {
    window.scoper.contactus.formhandler(atob(endpoints.contactUsSlack));
    window.scoper.beta.formhandler(atob(endpoints.betaSlack));
  });
})(jQuery);

window.scoper.beta.formhandler = function (endpoint) {
    $("#beta_submit").click(function (event) {
      event.stopImmediatePropagation();
      event.preventDefault(); 

      // Make sure that the captcha button was clicked
      var response = grecaptcha.getResponse();
      if (response != "") {
  
        $.post({
          url: endpoint,
          data: window.scoper.slack.assembleBetaMessage(),
          success: window.scoper.beta.formsuccess,
          error: window.scoper.beta.formerror
        });
      } else {
        alert('Please verify that you are not a robot.');
      }
    });
  };

  window.scoper.beta.formsuccess = function (response) {
    $('#submit-success').toast({
      animation: true,
      delay: 2500
    });
    $('#submit-success-div').removeClass('d-none');
    $('#submit-success').toast('show');
    window.scoper.beta.resetFormFields();
  };
  
  window.scoper.beta.formerror = function (response) {
    $('#submit-failure').toast({
      animation: true,
      delay: 1000
    });
    $('#submit-failure-div').removeClass('d-none');
    $('#submit-failure').toast('show');
    console.error(response);
  
    window.scoper.beta.resetFormFields();
  };
  
  window.scoper.beta.resetFormFields = function() {
    $("#name").val('');
    $("#email").val('');
    $("#career").val('');
    $("#info").val(''); 
    
    // Reset the Google captcha after submission
    grecaptcha.reset(); 
  }
window.scoper.contactus.formhandler = function (endpoint) {
  $("#form_submit").click(function (event) {
    event.stopImmediatePropagation();
    event.preventDefault();

    // Make sure that the captcha button was clicked
    var response = grecaptcha.getResponse();
    if (response != "") {

      $.post({
        url: endpoint,
        data: window.scoper.slack.assembleContactUsMessage(),
        success: window.scoper.contactus.formsuccess,
        error: window.scoper.contactus.formerror
      });
    } else {
      alert('Please verify that you are not a robot.');
    }
  });
};

window.scoper.contactus.formsuccess = function (response) {
  $('#submit-success').toast({
    animation: true,
    delay: 2500
  });
  $('#submit-success-div').removeClass('d-none');
  $('#submit-success').toast('show');
  window.scoper.contactus.resetFormFields();
};

window.scoper.contactus.formerror = function (response) {
  $('#submit-failure').toast({
    animation: true,
    delay: 1000
  });
  $('#submit-failure-div').removeClass('d-none');
  $('#submit-failure').toast('show');
  console.error(response);

  window.scoper.contactus.resetFormFields();
};

window.scoper.contactus.resetFormFields = function() {
  $("#name").val('');
  $("#email_address").val('');
  $("#email_consent").prop("checked", false);
  $("#help").val('');
  $("#message").val('');

  // Reset the Google captcha after submission
  grecaptcha.reset(); 
}
window.scoper.slack.contactUsPayload = {
	"text": "New Contact Request",
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
				"text": ":loudspeaker: @channel A new message was sent to you via the https://scope-r.app website.",
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
				"text": "*Contact Details:* \n\n Name: _$name_ \n\n Email: _$email_ \n\n How we can help: _$help_ \n\n Consent to receive updates: _$consent_"
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

window.scoper.slack.assembleContactUsMessage = function(){

	var message = JSON.stringify(window.scoper.slack.contactUsPayload);

	return message.replace("$name", $("#name").val())
								.replace("$email", $("#email_address").val())
								.replace("$consent", $("#email_consent").prop("checked"))
								.replace("$help", $("#help").val())
								.replace("$message", $("#message").val());
};


window.scoper.slack.betaPayload = {
	"text": "New Beta Request",
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*NEW BETA REQUEST*"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": ":loudspeaker: @channel A new message was sent to you via the https://scope-r.app website.",
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
				"text": "*Contact Details:* \n\n Name: _$name_ \n\n Email: _$email_ \n\n Career Sector: _$career_ \n\n General info: _$info_"
			}
		},
	]
};

window.scoper.slack.assembleBetaMessage = function(){

	var message = JSON.stringify(window.scoper.slack.betaPayload);

	return message.replace("$name", $("#name").val())
								.replace("$email", $("#email").val())
								.replace("$career", $("#career").val())
								.replace("$info", $("#info").val());
};
