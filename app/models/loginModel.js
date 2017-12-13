define(['backbone'], function (Backbone) {
   let LoginModel = Backbone.Model.extend({

       defaults: {
           error_type: "",
           error_class: "",
           error_message: ""
       }
   });
   return LoginModel;
});