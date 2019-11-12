window.scoper.contactus.formhandler = function (endpoint) {
  $("#form_submit").click(function (event) {
    event.stopImmediatePropagation();
    event.preventDefault();

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

window.scoper.contactus.formsuccess = function (response) {
  $('#submit-success').toast({
    autohide: false
  });
  $('#submit-success').css('display', 'block');
  $('#submit-success').toast('show');
  window.scoper.contactus.resetFormFields();
};

window.scoper.contactus.formerror = function (response) {
  $('#submit-failure').toast({
    autohide: false
  });
  $('#submit-failure').css('display', 'block');
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
}