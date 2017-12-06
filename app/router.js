define(['backbone', 'backbone.marionette','views/loginView','views/homeView', 'views/navbarView','views/addEmpView','views/aboutView','views/sidePanelView'], function(Backbone,Marionette,LoginView,HomeView,NavbarView, AddEmpView,AboutView,SidePanelView) {  
var Router = Marionette.AppRouter.extend({
   
    routes: {          
        '': 'loginRoute',
        'home': 'homeRoute',
        'about': 'aboutRoute', 
        'addEmp': 'addEmpRoute',
        'loginHandler:code': 'loginHandler'
    },
    loginRoute:function(){

        var loginView = new LoginView(); 
    },
    loginHandler: function (code) {

    },
    homeRoute: function () {
        var homeView = new HomeView();

    },
    aboutRoute: function () {
        var navbarView = new NavbarView();
        var aboutView = new AboutView();
          
    },
    addEmpRoute: function(){
    	var navbarView = new NavbarView();
        var addEmpView = new AddEmpView();
        addEmpView.progressTab();
    }
  });
return Router;
});