define(['backbone','models/employeeListModel'],function(backbone,EmployeeListModel){

    var employeeListCollection= backbone.Collection.extend({
        model:EmployeeListModel,
        url:"http://localhost:8080/portal/hr/v1/employee/all",
        // parse:function(response){
        //     return response.Success
        // }

    })
    return employeeListCollection


})