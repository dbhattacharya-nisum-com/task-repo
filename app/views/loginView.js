define(['backbone', 'backbone.marionette', 'Templates'], function (backbone, marionette, templates) {

    var loginView = marionette.View.extend({
        el: '#main-content',

        template: templates.loginPageItemView,
        
        initialize: function () {
            this.render();
            $(".content-area").addClass("login");
            // Loading GAPI
            gapi.load('client:auth2', this.initClient);
            this.listenTo(this.model, "change:error_type", this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
        },

        events: {
            'click #login-btn': 'handleSignInClick',
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
                function updateSigninStatus(isSignedIn) {
                    let googleUser = gapi.auth2.getAuthInstance().currentUser.get();
                    let basicProfile = googleUser.getBasicProfile();
                    if (isSignedIn) {
                        gapi.client.people.people.get({
                            'resourceName': 'people/me',
                            'requestMask.includeField': 'person.names'
                        }).then(function () {
                            let profile = {
                                emailId: basicProfile.getEmail(),
                                userName: basicProfile.getName(),
                                imageUrl: basicProfile.getImageUrl()
                            };
                            localStorage.setItem("userObj", JSON.stringify(profile));
                            // localStorage.setItem("userId", CryptoJS.MD5(basicProfile.getId()));
                            backbone.history.navigate('home', true);
                            $(".content-area").removeClass("login");

                        }, function (reason) {
                            console.log('Error: ' + reason.result.error.message);
                        })
                    }
                }
            });
        },

        handleSignInClick: function (event) {
            // Catching the error thrown by the signIn Promise
            let localScope = this;
            gapi.auth2.getAuthInstance().signIn().then(function (response) {
                if (response) {
                    localScope.model.set({"error_type": ""}, {silent: true});
                }
            }).catch(function (error) {
                if (error.type) {
                    localScope.model.set("error_message", "Please login with Nisum account credentials");
                    localScope.model.set("error_class", "alert");
                    localScope.model.set("error_type", "Unauthorized User");
                } else if (error.error === "popup_closed_by_user") {
                    // localScope.model.set("error_message", "Please login again");
                    // localScope.model.set("error_class", "warning");
                    // localScope.model.set("error_type", "Oops! You closed the signin window");
                }
            });
        }
    });

    return loginView;
});