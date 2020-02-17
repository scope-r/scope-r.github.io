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
