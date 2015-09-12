angular.module('starter.factories', [])

.factory('staffs', function($http, $q, $ionicLoading) {

  var staff = {};
  var n = 0;

  $ionicLoading.show({
    template: 'Loading...'
  });

  staff.list = [];
  staff.add = function () {
    return $http.get('http://api.randomuser.me/?q=' + (n++))
      .then(function (response) {
        staff.list.push(response.data.results[0].user);
      })    
  };

  staff.ready = $q.all([
    staff.add(),
    staff.add(),
    staff.add()
     ])
    .then(function() {
      $ionicLoading.hide();
    })

  return staff;

});
