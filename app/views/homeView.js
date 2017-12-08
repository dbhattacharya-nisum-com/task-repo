define(['backbone','backbone.marionette','Templates','handlebars'],function(backbone,marionette, templates,handlebars){


var HomeView = marionette.View.extend({
    el:'#main-content',
    template:templates.homeItemView,
    initialize: function (options) {
		var self=this;		
				
				this.collection=options.collection;
				this.collection.fetch({
					success: function(data,response){
						self.render();
					},error: function(data,response){
						console.log("error");
						console.log(response);
					}
				});
				this.listenTo( this.collection, 'add');
    },		
    render: function () {
        this.$el.html(this.template({empList: this.collection.models[0].attributes}));
    },
    
    events:{
		"click #editEmp" : "editEmployee",
		"click #delEmp" : "delEmployee"
	},
    editEmployee: function(e){
    	var emp = empList.get($(e.target).data("id"));
    	var EditEmpView = marionette.View.extend({
    	    el:'#main-content',
    	    template: _.template(templates.editEmpItemView),
    	    initialize: function () {
    	        this.render();
    	    },
    	    render: function () {
    	        this.$el.html(this.template(this.model.toJSON()));
    	    },
    	    events:{
    			"click #updateEmpl":"updateEmployee"
    		},
    		updateEmployee: function(e){
    			e.preventDefault();
    			var id = this.$el.find("#updatedId").val();
    			var name = this.$el.find("#updatedName").val();
    			var age = this.$el.find("#updatedAge").val();
    			if(name != undefined && age != undefined){
    				empList.add({id: id, name: name, age: age}, { merge: true });
    				var homeView = new HomeView();
    			}
    		}
    	});
    	new EditEmpView({model: emp});
	},
	delEmployee: function(e){
		var emp = empList.get($(e.target).data("id"));
		empList.remove(emp);
	}
});
	return HomeView;
})