define(['backbone','backbone.marionette','Templates', 'views/employeeView','views/experienceView','models/experienceModel','views/addressView','models/addressModel','views/salaryBreakUpView','models/salaryBreakUpModel','Router'],function(backbone,marionette,templates, EmployeeView,ExperienceView,ExperienceModel,AddressView,AddressModel,SalaryBreakUpView,SalaryBreakUpModel,Router){
	
	var AddEmpView = marionette.LayoutView.extend({
	    el:'#main-content',
			template:templates.addEmpItemView,
			regions: {
				menu: "#step1"
			},
	    initialize: function () {
					console.log(Router);
	        this.render();
	    },
	    render: function () {

					this.$el.html(this.template(this.model.attributes));
	       // this.$el.html(this.template);
	    },
	    events:{
			"click #steptwosubmit":"addEmployee",
			"focusout input,select,textarea" :  "contentChanged"
		},
		
		contentChanged: function(e) {
			if($(e.currentTarget).val()==undefined || $(e.currentTarget).val()=='')
					$(e.currentTarget).addClass('error');
			else
					$(e.currentTarget).removeClass('error');		
		},

		//Function to Save Employee Data
		addEmployee: function(e){
			e.preventDefault();
		
			var employeeDetails={};
			$.map($('#empForm').serializeArray(),function(n,i){
				employeeDetails[n['name']]=n['value'];
			})
			
			this.model.set(employeeDetails,{validate:true});
			var self=this;
			if(this.model.validationError){
					this.showErrors(this.model.validationError);
			}else{
						this.model.save(this.model.attributes,{success:function(response){
							localStorage.setItem("empDetails", JSON.stringify(employeeDetails));
							self.hideErrors(self.model.validationError);
							alert('Employee added Successfully');
							var addressModel = new AddressModel();
							self.menu.show(new AddressView({model:addressModel}));
							self.progressTab();
							
						},error:function(err){
							self.hideErrors(self.model.validationError);
							alert('Error in adding employee');
						}
					});
			} 
	
		},

		childEvents: {
			'AddressView:submitAdd': 'submitAddress',
			'ExperienceView:submitExperience' :'submitExperience',
			'SalaryBreakUpView:submitSalary':'submitSalary'
		},


		submitAddress : function(ChildView){
			var self=this;
			this.model = ( ChildView ? ChildView.model : undefined )|| this.model;
			var employeeAddress={};
			$.map($('#addressForm').serializeArray(),function(n,i){
				employeeAddress[n['name']]=n['value'];
			});
			
			this.model.set(employeeAddress, {validate: true});
			if(this.model.validationError){
					this.showErrors(this.model.validationError);
			}else{
						this.model.save(this.model.attributes,{success:function(response){
							self.hideErrors(self.model.validationError);
							localStorage.setItem("empAddress", JSON.stringify(employeeAddress));
							alert('Addrress added Successfully');
							var experienceModel = new ExperienceModel();
							self.menu.show(new ExperienceView({model:experienceModel}));
							self.progressTab();
						},error:function(err){
							self.hideErrors(self.model.validationError);
							alert('Addrress added Successfully');
							var experienceModel = new ExperienceModel();
							self.menu.show(new ExperienceView({model:experienceModel}));
							self.progressTab();
						}
					});
			} 
		},



	submitExperience : function(ChildView){
			var self=this;
			this.model = ( ChildView ? ChildView.model : undefined )|| this.model;
			var employeeExp={};
			$.map($('#expForm').serializeArray(),function(n,i){
				employeeExp[n['name']]=n['value'];
			});
		
			this.model.set(employeeExp, {validate: true});
			if(this.model.validationError){
					this.showErrors(this.model.validationError);
			}else{
						this.model.save(this.model.attributes,{success:function(response){
							self.hideErrors(self.model.validationError);
							localStorage.setItem("empExp", JSON.stringify(employeeExp));
							alert('Experience added Successfully');
							var salaryModel = new SalaryBreakUpModel();
							self.menu.show(new SalaryBreakUpView({model:salaryModel}));
							self.progressTab();
						},error:function(err){
							self.hideErrors(self.model.validationError);
							alert('Experience added Successfully');
							var salaryModel = new SalaryBreakUpModel();
							self.menu.show(new SalaryBreakUpView({model:salaryModel}));
							self.progressTab();
						}
					});
			} 
		},

	

		submitSalary:function(ChildView){
			var self=this;
			this.model = ( ChildView ? ChildView.model : undefined )|| this.model;
			var employeeSalary={};
			$.map($('#salaryForm').serializeArray(),function(n,i){
				employeeSalary[n['name']]=n['value'];
			});
			
			this.model.set(employeeSalary, {validate: true});
			if(this.model.validationError){
					this.showErrors(this.model.validationError);
			}else{
						this.model.save(this.model.attributes,{success:function(response){
							self.hideErrors(self.model.validationError);
							localStorage.setItem("empExp", JSON.stringify(employeeSalary));
							alert('Salary added Successfully');
							Backbone.history.navigate('home');
						},error:function(err){
							self.hideErrors(self.model.validationError);
							alert('Salary added Successfully');
							window.location.href = '/#home';
							
							
						}
					});
			} 
		},

		//Function to show Errors
		showErrors: function(errors) {
			this.$('.control-group').find('input,select,textarea').removeClass('error');
			this.$('.help-inline').text('');
			_.each(errors, function (value,key) {
					var controlGroup = this.$('.' + value.name);	
					controlGroup.find('input,select,textarea').addClass('error');
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