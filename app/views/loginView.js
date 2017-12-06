define(['backbone','backbone.marionette','Templates', 'views/homeView', 'views/navbarView','views/sidePanelView'],function(backbone,marionette,templates,HomeView,NavbarView,SidePanelView){
	
	var loginView = marionette.View.extend({
        el:'#main-content',
        template: _.template(templates.loginPageItemView),
        initialize: function () {
            this.render();
           
        },
        render: function () {
            this.$el.html(this.template);
        },
       
        events:{
            'click #login-btn':'onLoginAttempt'
        },
        onLoginAttempt:function(event){

            if (event) event.preventDefault();
           
            backbone.history.navigate('home',true);
         
            var homeView = new HomeView();
            $(".content-area").removeClass("login");
        }
    });

    return loginView;
})