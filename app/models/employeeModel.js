define(['backbone'],function(backbone){
    var EmployeeModel= Backbone.Model.extend({
        urlRoot:"http://localhost:3000/Employees",
            defaults:{
                empId: '',
				firstName:  '',
				lastName: '',
				email : '',
				gender : '',
				dob : '',
				maritalStatus : '',
				bloodGroup : '',
				dateOfJoining : '',
                dateOfReleiving : '',
                designation : '',
                location : '',
				passportNo : '',
				passportIssueDate : '',
				passportExpDate : '',
				aadharCard : '',
				panCard : ''

            },
            validate: function(attributes) {    // Predefined function from Model Object
                var errors = [];    // Creating an array to store all the errors

                for (var prop in attributes) {
                    if(attributes[prop]){
                        if(prop=="email" && !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(attributes[prop]))
                            errors.push({name:prop,message:'Please Enter a valid email'});
                        if(prop=="empId" && (attributes[prop].length< 6 || attributes[prop].length>6)) 
                            errors.push({name:prop,message:'Employee ID must be 6 Characters long'});
                            
                    }else{
                        errors.push({name:prop,message:'Please Enter value for '+prop+' field'});
                    } 
                }
                
                return errors.length > 0 ? errors : false;    //returning the array to the calling function
            }
    })
    return EmployeeModel;
})