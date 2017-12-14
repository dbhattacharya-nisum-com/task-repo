define(['backbone','backbone.marionette','Templates'],function(backbone,marionette,templates){
	
	var SalaryBreakUpView = marionette.ItemView.extend({
        template:templates.salaryBreakUpsView,
        initialize:function(options){
        },
      
        triggers : {
            'click #submitSalary':'SalaryBreakUpView:submitSalary'
        }
    })
        return SalaryBreakUpView;
})   