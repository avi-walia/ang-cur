(function () {
    'use strict';
    return angular.module("evolution")
        .constant("BASE_URL", "http://localhost:3000")
        .constant("CONTEXT_ROOT", "/evolution")
        .constant("ENDPOINT_URI", "/api/v1")//http://evoweb-dev.corporate.ciglobe.net/api/v1
        .constant("GOOGLE_MAPS_URL", "https://maps.googleapis.com/maps/api/js?key=AIzaSyD6y9w2sHNaVOAQN3ESPmYe_tSxCBE6d-Q&libraries=geometry,places&region=CA&language=")
        .constant("ASSANTE_URL", "https://assantedev.corporate.ciglobe.net")
        .constant("PROFILE_PICTURE_BASE_PATH", "/advisors-profile-pictures/")
        .constant("MOCK_API", [
  "/tests/1",
  "/tests/2",
  "/tests/3",
  "/tests/4",
  "/tests/5",
  "/tests/6"
]);

})();