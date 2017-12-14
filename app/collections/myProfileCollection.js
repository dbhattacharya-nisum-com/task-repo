define(['backbone', 'models/myProfileModel'],function(backbone, myProfileModel ){
    var profileCollection = Backbone.Collection.extend({
        model: myProfileModel,
        url:"http://localhost:3000/myProfile"
    });
    return profileCollection;
});