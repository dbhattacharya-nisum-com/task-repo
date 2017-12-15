define(['backbone'],function(backbone){
    var AddressModel= Backbone.Model.extend({
        urlRoot:"http://localhost:3000/Address",
        defaults:{
            address1:"",
            address2:"",
            city : "",
            state : "",
            zipCode : "",
            phoneNumber : "",
            landlineNumber : "",
            emergencyContactPerson : "",
            emergencyContactNum : ""


        },
        validate: function(attributes) {    // Predefined function from Model Object
            var errors = [];    // Creating an array to store all the errors

            for (var prop in attributes) {
                if(attributes[prop]){
                    if(prop=="zipCode" && attributes[prop].length!=6)
                        errors.push({name:prop,message:'Please Enter a valid zipCode'});
                    if(prop=="phoneNum" && (attributes[prop].length!=10)) 
                        errors.push({name:prop,message:'Please enter valid phone number'});
                        
                }else{
                    errors.push({name:prop,message:'Please Enter value for '+prop+' field'});
                } 
            }
            
            return errors.length > 0 ? errors : false;    //returning the array to the calling function
        }
    })
    return AddressModel;
})