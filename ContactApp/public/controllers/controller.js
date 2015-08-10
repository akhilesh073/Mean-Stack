var AppCtrl = function($scope,$http) {
	var refresh=function(){
		$http.get('/contactlist').success(function(responce){
		$scope.contactlist=responce;
			$scope.contact="";
		});
	};
	
	refresh();

	$scope.addContact=function(){
		$http.post('/contactlist',$scope.contact).success(function(response){
			//console.log(response);
			refresh();
		});
	};
	
	$scope.remove=function(id){
		$http.delete('/contactlist/' + id).success(function(response){
			refresh();
		});
	};
	
	$scope.edit=function(id){
		
		$http.get('contactlist/' + id).success(function(response){
			$scope.contact=response;
		});
	};
	
	$scope.update=function(){
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});
	};
	
	$scope.deselect=function(){
		$scope.contact="";
	};
}


/*var myApp=angular.module('myApp',[]);
myApp.controller('appCtrl',['$scope','$http',
							function($scope,$http){
								console.log("hello from angular controller");
							}]);*/