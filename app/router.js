define(['backbone', 'backbone.marionette','views/loginView','views/homeView', 'views/navbarView','views/addEmpView','views/aboutView','views/sidePanelView','collections/employeeListCollection', 'models/employeeModel', 'models/loginModel'], function(Backbone,Marionette,LoginView,HomeView,NavbarView, AddEmpView,AboutView,SidePanelView,EmployeeList, employeeModel, LoginModel) {

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
    },

    loginRoute:function(){
          if(this.navbarView!==null && this.sidePanelView!==null){
            this.navbarView.$el.hide();
            this.sidePanelView.$el.hide();
        }
        let loginModel = new LoginModel();
        let loginView = new LoginView({model: loginModel});
    },
    homeRoute: function () {
        this.checkNavBar();
        var homeView=new HomeView({collection: new EmployeeList()});

    },
    aboutRoute: function () {
       this.checkNavBar();
        var aboutView = new AboutView();
          
    },
    addEmpRoute: function(){
    	this.checkNavBar();
        var empModel = new employeeModel();
        var addEmpView = new AddEmpView({model:empModel});
        addEmpView.progressTab();
    },
    checkNavBar:function(){
        if(this.navbarView==null || this.sidePanelView==null){
            this.navbarView = new NavbarView({model: localStorage.getItem('userObj')});
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