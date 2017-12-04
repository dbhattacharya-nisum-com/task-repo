define(['backbone','backbone.marionette','Templates', 'cryptojs'],function(backbone,marionette,templates, CryptoJS){
	
	var loginView = marionette.View.extend({
        el:'#main-content',
        template: _.template(templates.loginPageItemView),
        initialize: function () {
            this.render();
            gapi.load('client:auth2', this.initClient);

        },
        render: function () {
            this.$el.html(this.template);
        },
        events:{
            'click #login-btn':'handleSignInClick',
        },
        initClient: function () {
            // let context = this;
            gapi.client.init({
                apiKey: "AIzaSyD4swrOLLYbcI54A_PmkLfLbcIpO_vGk_Q",
                discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
                clientId: "545604378019-4msm2qi82vbsqiga80clmqf3fkdv4ms2.apps.googleusercontent.com",
                scope: "profile",
                // hostedDomain: "nisum.com"
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
                                localStorage.setItem("loggedIn", true);
                                localStorage.setItem("userId", CryptoJS.MD5(basicProfile.getId()));
                                localStorage.setItem("userName", basicProfile.getName());
                                localStorage.setItem("userEmail", basicProfile.getEmail());
                                localStorage.setItem("userImage", basicProfile.getImageUrl());
                                backbone.history.navigate('home',true);
                            } else {
                                console.error("You are not authorised to access the portal. Please request access from the administrator or login with correct credentials");
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