define(['backbone','backbone.marionette','Templates', 'views/homeView'],function(backbone,marionette,templates, HomeView){
	var AddEmpView = marionette.View.extend({
	    el:'#main-content',
	    template:templates.addEmpItemView,
	    initialize: function () {
				console.log("initialized add employee")
			
	        this.render();
	    },
	    render: function () {
	        this.$el.html(this.template);
	    },
	    events:{
			"click #steptwosubmit":"addEmployee"
			"click #steptwosubmit":"addEmployee",
			"focusout input,select":  "contentChanged"
		},
		
		contentChanged: function(e) {
			console.log($(e.currentTarget).val());
			if($(e.currentTarget).val()==undefined || $(e.currentTarget).val()=='')
					$(e.currentTarget).addClass('error');
			else
					$(e.currentTarget).removeClass('error');		
		},
		addEmployee: function(e){

		//Function to Save Employee Data
		addEmployee: function(e){
			e.preventDefault();
			var employeeDetails={};
			var temp = $('#empForm').serializeArray();
			var temp2 = $('#empId').val();
			$.map($('#empForm').serializeArray(),function(n,i){
				employeeDetails[n['name']]=n['value'];
			})
		
			this.model.set(employeeDetails,{validate:true});

			if(this.model.validationError){
					this.showErrors(this.model.validationError);
			}else{
						this.hideErrors(this.model.validationError);
						this.model.save(this.model.attributes,{success:function(response){
							this.hideErrors(this.model.validationError);
							alert('Employee added Successfully');
						},error:function(err){
							this.hideErrors(this.model.validationError);
							alert('Error in adding employee');
						}
					});
			 
			} 
	
		},

	
		//Function to show Errors
		showErrors: function(errors) {
			this.$('.control-group').find('input,select').removeClass('error');
			this.$('.help-inline').text('');
			_.each(errors, function (value,key) {
					console.log(value);
					var controlGroup = this.$('.' + value.name);
					
					controlGroup.find('input,select').addClass('error');
					controlGroup.find('.help-inline').text(value.message);
			}, this);
		},

		//Function to Hide Errors
		hideErrors: function () {
			var chck = this.$('.control-group');
			this.$('.help-inline').text('');
		},
		
		
		progressTab : function(){
			var back = $(".prev");
			var next = $(".next");
			var steps = $(".step");
		  
			next.bind("click", function() {
			  jQuery.each(steps, function(i) {
				if (!$(steps[i]).hasClass('current') && !$(steps[i]).hasClass('done')) {
				  $(steps[i]).addClass('current');
				  $(steps[i - 1]).removeClass('current').addClass('done');
				  return false;
				}
			  })
			});
			back.bind("click", function() {
			  jQuery.each(steps, function(i) {
				if ($(steps[i]).hasClass('done') && $(steps[i + 1]).hasClass('current')) {
				  $(steps[i + 1]).removeClass('current');
				  $(steps[i]).removeClass('done').addClass('current');
				  return false;
				}
			  })
			});
		}
	});
	return AddEmpView;
});