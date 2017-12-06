define(['backbone','backbone.marionette','Templates','handlebars','views/navbarView','views/sidePanelView'],function(backbone,marionette, templates,handlebars,NavbarView,SidePanelView){
var employeeData = {"Success":[{"key":1,"empId":"16398","firstName":"SriHari","lastName":"Prasad","gender":"male","designation":null,"dateOfBirth":"1991 Feb 10 00:00","dateOfJoining":"2017 Jul 16 05:30","dateOfRelieving":null,"maritalStatus":"single","location":null,"panCardNo":"APNJRK3737R","passPortNo":null,"passPortExpiryDate":null,"passPortIssueDate":null,"aadharCardNo":"324394566789","bloodGroup":"A","emailId":"shprasad@nisum.com","createdBy":1,"createdDate":"2017 Nov 22 17:10","updatedBy":1,"updatedDate":"2017 Nov 22 17:10","comments":null,"photo":null,"role":null,"functionalGroup":null,"billable":false,"active":false},{"key":2,"empId":"16303","firstName":"Gopinath","lastName":"Thota","gender":"male","designation":null,"dateOfBirth":"1991 Feb 10 00:00","dateOfJoining":"2017 Aug 10 00:00","dateOfRelieving":"2017 Nov 28 17:10","maritalStatus":"single","location":null,"panCardNo":"APNJRK3737R","passPortNo":null,"passPortExpiryDate":null,"passPortIssueDate":null,"aadharCardNo":"324455656789","bloodGroup":"B","emailId":"gthota@nisum.com","createdBy":1,"createdDate":"2017 Nov 22 17:10","updatedBy":1,"updatedDate":"2017 Nov 22 17:10","comments":null,"photo":null,"role":null,"functionalGroup":null,"billable":false,"active":false},{"key":3,"empId":"16307","firstName":"Hari","lastName":"Krishna","gender":"male","designation":null,"dateOfBirth":"1991 Feb 10 00:00","dateOfJoining":"2017 Aug 16 00:00","dateOfRelieving":"2017 Nov 22 17:10","maritalStatus":"single","location":null,"panCardNo":"APNJRK3737R","passPortNo":null,"passPortExpiryDate":null,"passPortIssueDate":null,"aadharCardNo":"324455656789","bloodGroup":"A","emailId":"hvanapamula@nisum.com","createdBy":1,"createdDate":"2017 Nov 22 17:10","updatedBy":1,"updatedDate":"2017 Nov 22 17:10","comments":null,"photo":null,"role":null,"functionalGroup":null,"billable":false,"active":false},{"key":4,"empId":"16308","firstName":"Rajendra","lastName":"Prasad","gender":"male","designation":null,"dateOfBirth":"1993 Feb 10 00:00","dateOfJoining":"2017 Aug 16 00:00","dateOfRelieving":"2017 Nov 22 17:10","maritalStatus":"single","location":null,"panCardNo":"APNJRK7837R","passPortNo":null,"passPortExpiryDate":null,"passPortIssueDate":null,"aadharCardNo":"324455656789","bloodGroup":"O","emailId":"rdava@nisum.com","createdBy":1,"createdDate":"2017 Nov 22 17:10","updatedBy":1,"updatedDate":"2017 Nov 22 17:10","comments":null,"photo":null,"role":null,"functionalGroup":null,"billable":false,"active":false},{"key":5,"empId":"16306","firstName":"Rakesh","lastName":"Rayapol","gender":"male","designation":null,"dateOfBirth":"1988 Oct 10 00:00","dateOfJoining":"1988 Oct 10 00:00","dateOfRelieving":"2017 Nov 22 17:10","maritalStatus":"Married","location":null,"panCardNo":"APNERRK3737R","passPortNo":null,"passPortExpiryDate":null,"passPortIssueDate":null,"aadharCardNo":"324986560789","bloodGroup":"A","emailId":"rrayapol@nisum.com","createdBy":1,"createdDate":"2017 Nov 22 17:10","updatedBy":1,"updatedDate":"2017 Nov 22 17:10","comments":null,"photo":null,"role":null,"functionalGroup":null,"billable":false,"active":true}]}
var Employee = Backbone.Model.extend({
    // defaults: {
    //     id: '',
    //     name: '',
    //     age: ''
    // }
});

var EmpList =  Backbone.Collection.extend({
	model: Employee,
	url:"http://localhost:8080/portal/hr/v1/employee/all",
	initialize:function(){
	},
	parse : function(response){
		console.log("parse");
		return response.Success;  
}
});
var HomeView = marionette.View.extend({
    el:'#main-content',
    template:templates.homeItemView,
    initialize: function () {
        var self=this;
		this.dispNavAndSidePanel();
		this.collection=new EmpList();
		this.collection.fetch({
			success: function(data){
				// This code block will be triggered only after receiving the data.
				console.log(data.toJSON());
				self.render();
			}
		});
		this.listenTo( this.collection, 'add', this.render());
    },
    render: function () {
        this.$el.html(this.template({empList: this.collection.toJSON()}));
    },
    dispNavAndSidePanel: function(){
    	var navBarView = new NavbarView();
    	navBarView.$el.show();
    	var sidePanelView = new SidePanelView();
    	sidePanelView.$el.show();
    },
    events:{
		"click #editEmp" : "editEmployee",
		"click #delEmp" : "delEmployee"
	},
	fetchCollection: function(){
		return empList;
	},
	
    // generateTable: function(){
    // 	var RowView = marionette.View.extend({
    //   	  tagName: 'tr',
    //   	  template: _.template(templates.rowItemView),
    //   	});

    //     var TableBody = marionette.CollectionView.extend({
    //   	  tagName: 'tbody',
    //   	  childView: RowView
    //   	});

    //   	var TableView = marionette.View.extend({
    //   	  tagName: 'table',
    //   	  className: 'unstriped emp-list',
    //   	  template: _.template(templates.tableItemView),

    //   	  regions: {
    //   	    body: {
    //   	      el: 'tbody',
    //   	      replaceElement: true
    //   	    }
    //   	  },

    //   	  onRender() {
    //   	    this.showChildView('body', new TableBody({
    //   	      collection: this.collection
    //   	    }));
    //   	  }
    //   	});
      	
    //   	var myTable = new TableView({
    //   	  collection: empList
    //   	});

    //   	var myApp = new marionette.Application({
    //   	  region: '#gridReg'
    //   	});
      	
    //   	myApp.showView(myTable);
    // },
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
    				homeView.generateTable();
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