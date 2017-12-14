define(['backbone', 'backbone.marionette', 'Templates', 'collections/myProfileCollection'], function (backbone, marionette, templates, myProfileCollection) {
    var Collection = new myProfileCollection();
    var profileView = marionette.View.extend({
        el: "#main-content",

        template: templates.myProfileEditView,

        initialize: function(){
            //console.log("Initialized Profile View");
            //this.listenTo(this.model, "change", this.render);
            this.render();
        },

        render: function(){
            var self = this;
            Collection.fetch({
                success: function(collection){
                     self.showCollection(collection);
                }
             });
        },

        showCollection: function(collection){
            this.model = collection.get(1);
            this.listenTo(this.model, "change", this.render);
            this.$el.html(this.template(this.model.attributes));
        },
        events:{
            "click #editButton":"editData",
            "click #saveButton":"saveData",
            "click #cancelButton":"cancelData"
        },
        editData: function(){
            this.$el.find("#editButton").attr("style","display:none");
            this.$el.find(".profileInfo").attr("style","display:inline");
            this.$el.find(".profile").attr("style","display:none");
        },
        saveData: function(){   
            this.model.set({
                name : this.$el.find("#fullName").val(),
                eid : this.$el.find("#eid").val(),
                designation : this.$el.find("#designation").val(),
                experience : this.$el.find("#experience").val(),
                email : this.$el.find("#email").val(),
                doj : this.$el.find("#doj").val(),
                dob : this.$el.find("#dob").val(),
            }); 

            if(!this.model.isNew()){
                this.model.save(this.model.attributes,{
                    success: function(){
                        //console.log("saved succesfully")
                    },
                    error: function(){
                        //console.log("error occurred");
                    }
                });
            }
            this.$el.find("#editButton").attr("style","display:inline");
            this.$el.find(".profile").attr("style","display:block");
            this.$el.find(".profileInfo").attr("style","display:none");
        },
        cancelData: function(){
            this.$el.find("#editButton").attr("style","display:inline");
            this.$el.find(".profile").attr("style","display:block");
            this.$el.find(".profileInfo").attr("style","display:none");
        }
    });

    return profileView;
})