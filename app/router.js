define(['backbone', 'backbone.marionette'], function(Backbone,Marionette) {
var Router =Marionette.AppRouter.extend({

    routes: {          
        '': 'loginRoute',
        'home': 'homeRoute'
    },
    initialize : function(Router){
    },

    loginRoute:function(){
         
    },
    homeRoute: function () {
    
    }
  });
return Router;
});