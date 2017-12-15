define(['backbone'],function(backbone){
    var SalaryBreakUpModel= Backbone.Model.extend({
        urlRoot:"http://localhost:3000/Salary",
        defaults:{
            baseSalary:"",
            hra:"",
            reimbursment : "",
            providentFund : ""
  
        },
        validate: function(attributes) {    // Predefined function from Model Object
            var errors = [];    // Creating an array to store all the errors

            for (var prop in attributes) {
                if(!attributes[prop])            
                    errors.push({name:prop,message:'Please Enter value for '+prop+' field'});
                
            }
            
            return errors.length > 0 ? errors : false;    //returning the array to the calling function
        }
    })
    return SalaryBreakUpModel;
})