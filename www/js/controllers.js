angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  if ($rootScope.user) {
    $scope.isUser = true;
  } else {
    $scope.isUser = false;
  };
  

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('StuffsCtrl', function($scope, $localstorage, $http) {

  $http.get('http://moon-pro.cloudapp.net/rest-api/rest/stuff/list').then(function(resp) {
    $scope.stuffs = resp.data;
  }, function(err) {
    console.error('ERR', err);
  })

  $scope.hideBackButton = true;

  

})

.controller('StuffCtrl', function($scope, $state, $stateParams, $localstorage, $http, $rootScope) {

  $http.get('http://moon-pro.cloudapp.net/rest-api/rest/stuff/list').then(function(resp) {
    $scope.stuff = resp.data[+$stateParams.stuffId - 1]
    $scope.total = $scope.stuff.price;
  });


  $scope.amount = 1;
  // $scope.total = $scope.stuff.price * $scope.amount;
  $scope.increase = function () {
    $scope.amount = $scope.amount + 1;
    $scope.total = $scope.amount * +$scope.stuff.price;
  };
  $scope.decrease = function () {
    if ($scope.amount >= 1) {
      $scope.amount = $scope.amount - 1;
    };
    
    $scope.total = $scope.amount * $scope.stuff.price;
  };

  $scope.saveDonation = function () {
    $scope.stuff.amount = $scope.amount;


    var obj = {
      id: $scope.stuff.id,
      amount: $scope.total
    };


    $localstorage.setObject('donation', obj);

    console.log($localstorage.getObject('donation'));
    $state.go('app.donationTarget');
  }


  
})

.controller('DonationTargetCtrl', function ($scope, $localstorage, $state, $http, $rootScope) {
  var donation = $localstorage.getObject('donation');
  $scope.addTarget = function (target) {
    var obj = $localstorage.getObject('donation');
    
    var array = [obj.id, obj.amount];
    $localstorage.set('target', target);
    
    // donation.target = target;
    // $localstorage.setObject('donation', donation);
    $http({
      method: 'POST',
      url: 'http://moon-pro.cloudapp.net/rest-api/rest/donation/donate',
      headers: {'Content-Type': 'application/json'},
      data: array
    }).success(function(resp) {
      console.log('works');
    });

    $state.go('app.thankyou');
  }
})

.controller('ThanksCtrl', function ($scope, $localstorage, $state) {
  var donation = $localstorage.getObject('donation');
  $scope.amount = donation.amount;
  $scope.targeting = $localstorage.get('target');

  $scope.goHome = function () {
    $state.go('app.stuffs');
  }

  $scope.hideBackButton = true;


})


.controller('ProfileCtrl', function ($scope, $localstorage) {
  $scope.donationHistoryData = [{
    text: "Education - ElimBasinbi",
    amount: 3,
    date: 1288323623006
  },{
    text: "Sick people - ElimBasinbi",
    amount: 7,
    date: 1288323623006
  },{
    text: "Poverty - ElimBasinbi",
    amount: 5,
    date: 1288323623006
  }];
  $scope.totalAmount = 0;

  for (var i = $scope.donationHistoryData.length - 1; i >= 0; i--) {
    $scope.totalAmount += $scope.donationHistoryData[i].amount;
  };


});
