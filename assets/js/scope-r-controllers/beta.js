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
    $("#email_address").val('');
    $("#email_consent").prop("checked", false);
    $("#help").val('');
    $("#message").val('');
  }