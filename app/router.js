define(['backbone', 'backbone.marionette','views/loginView','views/homeView', 'views/navbarView','views/addEmpView'], function(Backbone,Marionette,LoginView,HomeView,NavbarView, AddEmpView) {  
var Router = Marionette.AppRouter.extend({
   
    routes: {          
        '': 'loginRoute',
        'home': 'homeRoute',
        'about': 'aboutRoute', 
        'addEmp': 'addEmpRoute'
    },
    loginRoute:function(){
    	var navbarView = new NavbarView();
    	navbarView.$el.hide();
        var loginView = new LoginView(); 
    },
    homeRoute: function () {
        var homeView = new HomeView();
        homeView.generateTable(); 
        var navbarView = new NavbarView();
        navbarView.$el.show();
    },
    aboutRoute: function () {
        var aboutView = new AboutView();          
    },
    addEmpRoute: function(){
    	var navbarView = new NavbarView();
    	var addEmpView = new AddEmpView();
    }
  });
return Router;
});