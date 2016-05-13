var homeAngular = angular.module("homeAngular", ['ui.router']);

homeAngular.controller("homeController", function($http, $scope, $rootScope, $state){
	var $rootScope = [];
	
	
	
	$scope.search=function(){
		var searchTerm = $scope.searchTerm;
		$http.post('/searchResults/').
		  then(function(response) {
				  $scope.userResults = response.data.userResults;
				  $state.go("feed");
			  }, function(response) {
			  });
		};
	
	$scope.viewProfile=function(email){
		
		$http.post('/Profile/').
		  then(function(response) {
				 
				  $state.go("profile",{},{reload:true});
			  }, function(response) {
				 
			  });
		
	}
	
	
});


$state.go("feed");
	$scope.logout=function(){
		$http.get("/adminLogOut").
		  then(function(response) {
				  window.location.assign("/");
			  }, function(response) {
			  });
		
		
	};


	
twModule.config(function($stateProvider, $urlRouterProvider) {


	  $stateProvider
	    .state("feed", {
	    	views: {
	    		"newsFeed" : {
	    			  url         : "/getTweet",
	    			  templateUrl : "/getTweet",
	    			  controller  : function($scope , $http, $state,$rootScope ){
	    				    
	    				  $http.get("/getTweets").
	    				  then(function(response) {
	    						  $scope.newsfeed1= response.data.newsfeed1;	
	    						  $scope.newsfeed2 = response.data.newsfeed2;
	      						  $scope.newsfeed3 = response.data.newsfeed3;
	    						  
	    					  }, function(response) {
	    						  
	    					  });
		    				  
		    				  
	                  $scope.submit=function(){
	                	  var desc=$scope.feed;
	                	  console.log(desc);
	                	  $http.post('/postTweets/'+desc).
	    				  
	                	  then(function(response) {
	    						  $scope.post= true;
	    						  $scope.firstname=response.data.firstname;
	    						  
	    					  }, function(response) {
	    						  
	    					  });
	                  }
	   		  }
	    	}}
	      
	    }).state("profile", {
	    	views: {
	    		"profileView" : {
	    			  url         : "/profile",
	    			  templateUrl : "/profile",
	    			  controller  : function($scope , $http, $state,$rootScope ){
	    				  
	    					  
	    					
	    				  
	    				  $http.get('/getProfile').
	    				  then(function(response) {
	    						  
	    						  $scope.profile=response.data.profile;
	    						  $scope.followers=response.data.follow.followers;
	    						  if(response.data.status=="25"){
		    						  $scope.status5=true;
		    						  }
	    						  if(response.data.status=="nothing"){
		    						  $scope.status1=true;
		    						  }
	    						  
	    						  if(response.data.status=="follower"){
	    						  $scope.status4=true;
	    						  }
	    					
	    						 
	    						  
	    					  }, function(response) {
	    						  console.log(response);
	    					  });
	    				  
	    				  $scope.addtxt="Follow"
	    				  $scope.follow=function(email){
	    					  $http.post('/Follow/'+email)
	    			             .then(function(response){
	    			        	   
	    			        	   
	    			        	   $scope.add=true;
	    			        	  $scope.addtxt="You Followed the user";
	    			            },function(error){
	    			                  alert(error);
	    			        });           
            			  }
            		  }
	    
	    	}}
	      
	    }).state("myProfile", {
	    	views: {
	    		"myProfileView" : {
	    			  url         : "/profileView",
	    			  templateUrl : "/profileView",
	    			  controller  : function($scope , $http, $state,$rootScope ){
	    	
	    				  $http.get('/getMyProfile').
	    				  then(function(response) {
	    						  $scope.profile=response.data.profile;
	    						$scope.status5=true;
	    					  }, function(response) {	    						 
	    					  });
	        				  	  }
	    	}}
	    });
	  })
