define(['backbone','backbone.marionette','Templates', 'views/homeView', 'views/navbarView','views/sidePanelView', 'cryptojs'],function(backbone,marionette,templates,HomeView,NavbarView,SidePanelView, CryptoJS){

	var loginView = marionette.View.extend({
        el:'#main-content',
        template: _.template(templates.loginPageItemView),
        initialize: function () {
            this.render();
            this.hideNavAndSidePanel();
            // Loading GAPI
            gapi.load('client:auth2', this.initClient);
        },
        render: function () {
            this.$el.html(this.template);
        },
        hideNavAndSidePanel: function (){
        	var navBarView = new NavbarView();
        	navBarView.$el.hide();
        	var sidePanelView = new SidePanelView();
            sidePanelView.$el.hide();
            $(".content-area").addClass("login");
        },
        events:{
            'click #login-btn':'handleSignInClick',
        },
        initClient: function () {
            // Initializing the client
            gapi.client.init({
                apiKey: "AIzaSyD4swrOLLYbcI54A_PmkLfLbcIpO_vGk_Q",
                discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
                clientId: "545604378019-4msm2qi82vbsqiga80clmqf3fkdv4ms2.apps.googleusercontent.com",
                scope: "profile",
                hostedDomain: "nisum.com"
            }).then(function () {
                // Listen for sign-in state changes.
                gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

                // Handle the initial sign-in state.
                updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

                // Create a function to handle the state
                function updateSigninStatus (isSignedIn) {
                    let googleUser = gapi.auth2.getAuthInstance().currentUser.get();
                    let basicProfile = googleUser.getBasicProfile();
                    if(isSignedIn) {
                        gapi.client.people.people.get({
                            'resourceName': 'people/me',
                            'requestMask.includeField': 'person.names'
                        }).then(function (response) {
                            if (googleUser.getHostedDomain() === "nisum.com") {
                                var homeView = new HomeView();
                                backbone.history.navigate('home',true);
                                $(".content-area").removeClass("login");
                                localStorage.setItem("loggedIn", true);
                                localStorage.setItem("userId", CryptoJS.MD5(basicProfile.getId()));
                                localStorage.setItem("userName", basicProfile.getName());
                                localStorage.setItem("userEmail", basicProfile.getEmail());
                                localStorage.setItem("userImage", basicProfile.getImageUrl());

                            }

                        }, function (reason) {
                            console.log('Error: ' + reason.result.error.message);
                        })
                    }
                }
            });
        },
        handleSignInClick: function(event) {
            gapi.auth2.getAuthInstance().signIn();
        }
    });

    return loginView;
});