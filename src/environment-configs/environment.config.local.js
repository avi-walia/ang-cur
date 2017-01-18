(function () {
    'use strict';
    return angular.module("evolution")
        .constant("BASE_URL", "http://localhost:3000")
        .constant("ENDPOINT_URI", "evolutionws")
        .constant("MOCK_API", [
  "/tests/1",
  "/tests/2",
  "/tests/3",
  "/tests/4",
  "/tests/5",
  "/tests/6"
]);

})();