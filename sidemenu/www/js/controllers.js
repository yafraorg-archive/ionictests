angular.module('starter.controllers', [])

/**
 * HEADER - handle menu toggle
 */
.controller('HeaderCtrl', function($scope) {
	// Main app controller, empty for the example
	$scope.leftButtons = [
		{ 
		type: 'button-clear',
		content: '<i class="icon ion-navicon" hide-back-button="true"></i>',
		tap: function(e) {
			$scope.sideMenuController.toggleLeft();
			}
		}
	];
})

/**
 * MAIN CONTROLLER - handle inapp browser
 */
.controller('LoginCtrl', ['$scope', function($scope) {

}])

/**
 * MAIN CONTROLLER - handle inapp browser
 */
.controller('HomeCtrl', ['$scope', function($scope) {

}])

/**
 * MAIN CONTROLLER - handle inapp browser
 */
.controller('MapsCtrl', ['$scope', function($scope) {

}])
