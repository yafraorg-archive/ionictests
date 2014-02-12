angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pets = PetService.all();
})

/**
 * A simple example service that returns some data.
 */
.controller('HelpCtrl', function($scope) {
	// Help controller, giving some about infos
	if (ionic.Platform.device()) {
		$scope.device = ionic.Platform.device();
		}
})


// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pet = PetService.get($stateParams.petId);
});
