angular.module('starter.factories', [])

.factory('stuffs', function($http, $q, $ionicLoading) {

  return  $http.get('http://192.168.0.175:8085/rest-api/rest' + '/stuff/list');

  return obj;
  // // $ionicLoading.show({
  // //   template: 'Loading...'
  // // });



  // $http.get('http://192.168.0.175:8085/rest-api/rest' + '/stuff/list')
  //     .then(function (response) {
  //       return stuff = response.data;

  //     })
  

  // // stuff.ready = $q.all([stuff.add()])
  // //   .then(function() {
  // //     $ionicLoading.hide();
  // //   })
    
  // return;

})

.service('data', function(){
  this.data = {};
  this.save = function(data) {
    this.data = data;
  }
  
});
