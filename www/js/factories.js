angular.module('starter.factories', [])

.factory('Products', function($ionicLoading, $resource) {

  // return  $http.get('http://192.168.0.175:8085/rest-api/rest' + '/stuff/list');
  return $resource('/js/data.json');


})

