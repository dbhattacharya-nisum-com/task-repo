define(['backbone','backbone.marionette','Templates', 'views/homeView', 'views/navbarView','views/sidePanelView'],function(backbone,marionette,templates,HomeView,NavbarView,SidePanelView){
	
	var loginView = marionette.View.extend({
        el:'#main-content',
        template: _.template(templates.loginPageItemView),
        initialize: function () {
            this.render();
            this.hideNavAndSidePanel();
        },
        render: function () {
            this.$el.html(this.template);
        },
        hideNavAndSidePanel: function (){
        	var navBarView = new NavbarView();
        	navBarView.$el.hide();
        	var sidePanelView = new SidePanelView();
        	sidePanelView.$el.hide();
        },
        events:{
            'click #login-btn':'onLoginAttempt'
        },
        onLoginAttempt:function(event){
//            var self=this;
            if (event) event.preventDefault();
            console.log(this.$('#inputEmail').val());
            console.log(this.$('#inputPassword').val());
            backbone.history.navigate('home',true);
           /* var navbarView = new NavbarView();
            var headerRegion = navbarView.getRegion('headerRegion');
            headerRegion.show(new NavbarView());*/
            var homeView = new HomeView();
//            homeView.dispNavAndSP();
            homeView.generateTable();
        }
    });

    return loginView;
})