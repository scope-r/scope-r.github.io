window.slack = window.slack || {};

window.slack.payload = {
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

window.slack.assembleMessage = function(){

	var message = JSON.stringify(window.slack.payload);

	return message.replace("$name", $("#name").val())
								.replace("$email", $("#email_address").val())
								.replace("$help", $("#help").val())
								.replace("$message", $("#message").val());
};
