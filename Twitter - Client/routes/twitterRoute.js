var soap = require('soap');
var baseURL = "http://localhost:8080/TwitterServer/services";
var profile={};

function twitterRoute(app,passport){
	
	this.app=app;
	this.passprt=passport;
	this.routeTable= [];
	this.init();
}

twitterRoute.prototype.init = function(){
	
	var self = this;
	this.addRoutes();
	this.processRoutes();
}


twitterRoute.prototype.processRoutes = function(){
	
	var self = this;
	self.routeTable.forEach(function(route){
		
		if(route.requestType == 'get'){
			self.app.get(route.requestUrl,route.callbackFunction);
		}
		else if(route.requestType == 'post'){
			self.app.post(route.requestUrl,route.callbackFunction);
		}
		
	});
}

twitterRoute.prototype.addRoutes = function(){
	
	var self =  this;
self.routeTable.push({
	
	requestType : 'get',
    requestUrl  : '/',
    callbackFunction : function (req,res){
    	
    	res.render('login',{ title: 'Twitter' });
    	}
    
});


self.routeTable.push({
	
	requestType : 'get',
    requestUrl  : '/getTweets',
    callbackFunction : function (req,res){
    	
    	res.render('home');
    	}
    
});

self.routeTable.push({
	
	requestType : 'get',
    requestUrl  : '/profile',
    callbackFunction : function (req,res){
    	
    	res.render('about');
    	}
    
});



self.routeTable.push({
	
	requestType : 'get',
    requestUrl  : '/getProfileDetails',
    callbackFunction : function (req,res){
    	
    	res.send({"about":req.session.searchProfile,"followers":req.session.followers,"status":req.session.status});
    	}
    
});
    
self.routeTable.push({
	
	requestType : 'get',
    requestUrl  : '/home',
    callbackFunction : function (req,res){
    
    	if(req.session.username){
    
    		res.render('home',{"username":req.session.username});
    	}
    	else{
    		res.render('index');
    	}
    	}
    
}); 

self.routeTable.push({
	
	requestType : 'get',
    requestUrl  : '/getTweets',
    callbackFunction : function (req,res){
    	var email = req.session.username;
    	var option = {ignoredNamespaces : true};
   	 var url = baseURL+"/Tweets?wsdl";
   	  var args = {email: req.session.username};
   	  soap.createClient(url,option, function(err, client) {
   		  
   	      client.getNewsFeed(args, function(err, result) {
   	    
   	    	  var data = JSON.parse(result.getNewsFeedReturn);
   	    	  res.send(data);
   	      });
   	  });
    	
    	}
    
}); 


self.routeTable.push({
	
	requestType : 'post',
    requestUrl  : '/postTweet/:desc',
    callbackFunction : function (req,res){
    	var email = req.session.username;
    	var option = {ignoredNamespaces : true};
   	 var url = baseURL+"/Tweets?wsdl";
   	  var args = {"email": req.session.username,"desc":req.params.desc,"firstname":req.session.userProfile[0].firstname};
   	  soap.createClient(url,option, function(err, client) {
   		  
   	      client.postFeed(args, function(err, result) {
   	    	  
   	    	  var data = JSON.parse(result.postFeedReturn);
   	    	  res.send({"firstname":req.session.userProfile[0].firstname});
   	      });
   	  });
    	
    	}
    
}); 


self.routeTable.push({
	
	requestType : 'post',
    requestUrl  : '/Follow/:email',
    callbackFunction : function (req,res){
    	
    	var option = {ignoredNamespaces : true};
   	 var url = baseURL+"/Followers?wsdl";
   	  var args = {userEmail: req.session.username,fEmail:req.params.email};
   	  soap.createClient(url,option, function(err, client) {
   		  
   	      client.follow(args, function(err, result) {
   	    	 
   	    	  var data = JSON.parse(result.followReturn);
   	    	 
   	    	  res.send(data);
   	      });
   	  });
    	
    	}
    
}); 


self.routeTable.push({
	
	requestType : 'post',
    requestUrl  : '/checkLogin/:email/:password',
    callbackFunction : function (req,res){
    	
    	
    	var option = {ignoredNamespaces : true};
    	 var url = baseURL+"/Login?wsdl";
    	  var args = {username: req.param('email'),password: req.param('password')};
    	  soap.createClient(url,option, function(err, client) {
    	      client.loginCheck(args, function(err, result) {
    	    	  var data = JSON.parse(result.loginCheckReturn);
    	    	  req.session.userProfile=data.userProfile;
    	    	  req.session.username=data.email;
    	    	  res.send(data);
    	      });
    	  });
    	
    }
});


self.routeTable.push({
	
	requestType : 'post',
    requestUrl  : '/signup/:email/:firstname/:lastname/:password/:gender/:dob',
    callbackFunction : function (req,res){
    	
    	
    	var option = {ignoredNamespaces : true};
    	 var url = baseURL+"/Login?wsdl";
    	  var args = {email: req.param('email'),firstname:req.param('firstname'),lastname:req.param('lastname'),password: req.param('password'),gender:req.param('gender'),dob:req.param('dob')};
    	  soap.createClient(url,option, function(err, client) {
    		
    	      client.signup(args, function(err, result) {
    	  
    	    	  var data = JSON.parse(result.signupReturn);
    	    	  res.send(data);
    	      });
    	  });
    	
    }
});




self.routeTable.push({
	
	requestType : 'post',
    requestUrl  : '/searchResults/:searchTerm',
    callbackFunction : function (req,res){
    	
    	var option = {ignoredNamespaces : true};
    	 var url = baseURL+"/Find?wsdl";
    	  var args = {"searchTerm":req.params.searchTerm};
    	  soap.createClient(url,option, function(err, client) {
    	      client.getSearchResults(args, function(err, result) {
    	    	  var data = JSON.parse(result.getSearchResultsReturn);
    	    	  
    	    	  res.send(data);
    	      });
    	  });
    	
    }
});


self.routeTable.push({
	
	requestType : 'post',
    requestUrl  : '/getProfile/:email',
    callbackFunction : function (req,res){
    	var option = {ignoredNamespaces : true};
    	 var url = baseURL+"/Profile?wsdl";
    	  var args = {"uEmail":req.session.username,"fEmail":req.params.email};
    	  var args1={"email":req.params.email};
    	  soap.createClient(url,option, function(err, client) {
    	      client.getProfile(args, function(err, result) {
    	    	  var data = JSON.parse(result.getProfileReturn);
    	    	  
    	    	  
    	    	  
    	    	  req.session.searchProfile=data.profile;
    	    	  req.session.status = data.status;
    	    	  
    	      });
    	      client.getFollowers(args1,function(err,result){
	    		   var followers = JSON.parse(result.getFollowersReturn);
        	    	  

          	    	req.session.followers=followers;
          	    	res.send({statusCode:200});
    	    	  });
    	  });
    	
    }
});


self.routeTable.push({
	
	requestType : 'get',
    requestUrl  : '/LogOut',
    callbackFunction : function (req,res){
    	
    	req.session.destroy();
    	res.send({title:""});
    	}
    
}); 
}
module.exports = twitterRoute;