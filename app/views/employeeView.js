define(['backbone','backbone.marionette','Templates'],function(backbone,marionette,templates){
	
	var EmployeeView = marionette.ItemView.extend({
        template:templates.employeeItemView,
        intialize:function(){

        },
        
    })
        return EmployeeView;
})   