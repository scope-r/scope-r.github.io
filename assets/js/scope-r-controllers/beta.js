window.scoper.beta.formhandler = function (endpoint) {
    debugger;
    $("#beta_submit").click(function (event) {
      event.stopImmediatePropagation();
      event.preventDefault(); 

      debugger;
  
      // Make sure that the captcha button was clicked
      var response = grecaptcha.getResponse();
      if (response != "") {
  
        $.post({
          url: endpoint,
          data: window.scoper.slack.assembleMessage(),
          success: window.scoper.contactus.formsuccess,
          error: window.scoper.contactus.formerror
        });
      } else {
        alert('Please verify that you are not a robot.');
      }
    });
  };