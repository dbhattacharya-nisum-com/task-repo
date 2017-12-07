define(['backbone','models/employeeListModel'],function(backbone,EmployeeListModel){

    var employeeListCollection= backbone.Collection.extend({
        model:EmployeeListModel,
        //url:"http://localhost:8080/portal/hr/v1/employee/all",
        url:"http://localhost:3030/jsons/employeeList.json"

    })
    return employeeListCollection


})