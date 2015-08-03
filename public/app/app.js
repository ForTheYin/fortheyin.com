(function (){
  'use strict';

  var MainCtrl = function ($http, $scope, $interval) {
   $scope.token = {};
   $scope.inputBlock = '';

   $http.get('/api/user').then(function (res) {
     $scope.token = res.data;
   });

   $interval(function (){
     $scope.inputBlock = $scope.inputBlock ? '' : '#';
   }, 500);

  };

  angular.
    module('fortheyin', ['ngAnimate']).
    controller('MainCtrl', ['$http', '$scope', '$interval', MainCtrl]);
})();
