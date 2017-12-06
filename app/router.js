define(['backbone', 'backbone.marionette','views/loginView','views/homeView', 'views/navbarView','views/addEmpView','views/aboutView','views/sidePanelView'], function(Backbone,Marionette,LoginView,HomeView,NavbarView, AddEmpView,AboutView,SidePanelView) {  
var Router =Marionette.AppRouter.extend({
   navbarView :null,
   sidePanelView: null,
    routes: {          
        '': 'loginRoute',
        'home': 'homeRoute',
        'about': 'aboutRoute', 
        'addEmp': 'addEmpRoute'
    },
    initialize : function(Router){
    console.log(this,"Router")
    },

    loginRoute:function(){
          if(this.navbarView!==null && this.sidePanelView!==null){
            this.navbarView.$el.hide();
            this.sidePanelView.$el.hide();
        }
        var loginView = new LoginView(); 
       
    },
    homeRoute: function () {
        this.checkNavBar();
        var homeView = new HomeView();

    },
    aboutRoute: function () {
       this.checkNavBar();
        var aboutView = new AboutView();
          
    },
    addEmpRoute: function(){
    	this.checkNavBar();
        var addEmpView = new AddEmpView();
        addEmpView.progressTab();
    },
    checkNavBar:function(){
        if(this.navbarView==null || this.sidePanelView==null){
            this.navbarView = new NavbarView();
            this.sidePanelView = new SidePanelView();
        }
        else{
            this.navbarView.$el.show();
            this.sidePanelView.$el.show();
        }
    }
  });
return Router;
});