app = angular.module('todo', ['ngResource']);

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = $("meta[name=\"csrf-token\"]").attr("content");
}]);
