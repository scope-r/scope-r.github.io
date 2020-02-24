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
