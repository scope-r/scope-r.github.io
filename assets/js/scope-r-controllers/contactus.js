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
        success: window.scoper.contactus.formsuccess,
        error: window.scoper.contactus.formerror
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
  $("#email_consent").prop("checked", false);
  $("#help").val('');
  $("#message").val('');
};

window.scoper.contactus.formerror = function(response){
  alert("Error");
  console.log(response);
};
