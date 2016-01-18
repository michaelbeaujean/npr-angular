var app = angular.module("nprPlayer", []),
		apiKey = 'MDIwMzkwMTEwMDE0NDEzOTAwNDU0Njk2NQ001',
		nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.directive('nprLink', function() {
	return {
		restrict: 'EA',
		require: ['^ngModel'],
		replace: true,
		scope: {
			ngModel: '=',
			play: '&'
		},
		templateUrl: 'views/nprListItem.html',
		link: function(scope, ele, attr) {
			scope.duration = scope.ngModel.audio[0].duration.$text;
		}
	}
});		

app.controller('PlayerController', function($scope, $http) {

	var audio = document.createElement('audio');
	$scope.audio = audio;

	$scope.play = function(program) {
		if ($scope.playing)
		{
			$scope.audio.pause();
		}
		var url = program.audio[0].format.mp4.$text;
		audio.src = url;
		audio.play();
		$scope.playing = true;
	};

	$scope.stop = function() {
		$scope.audio.pause();
		$scope.playing = false;
	};

	$http({
		method: 'JSONP',
		url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
	}).success(function(data, status) {
		$scope.programs = data.list.story;
	}).error(function(data, status) {

	});		

	$scope.audio.addEventListener('ended', function() {
		$scope.$apply(function() {
			$scope.stop();
		});
	});
});

app.controller('RelatedController', ['$scope', function($scope) {

}]);