'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', $routeProvider =>
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
]).controller('View1Ctrl', ['$scope', '$location', ($scope, $location) => {
    let people = [
        {name: 'Cathy', title: 'Analyst'},
        {name: 'Alice', title: 'Designer'},
        {name: 'Betty', title: 'Programmer'}
    ];

    $scope.inputData = '';

    $scope.people = people;

    $scope.sortByName = desc => $scope.people.sort((a, b) => a.name > b.name ? (!!desc ? 1 : -1) : (!!desc ? -1 : 1));
    $scope.sortByTitle = desc => $scope.people.sort((a, b) => a.title < b.title ? (!!desc ? 1 : -1) : (!!desc ? -1 : 1));

    $scope.routeInfo = () => $location.path();
}]);