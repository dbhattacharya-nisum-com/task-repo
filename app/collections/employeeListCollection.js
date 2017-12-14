define(['backbone','models/employeeListModel','backbonePageable','views/editEmp'],function(backbone,EmployeeListModel,backbonePageable,editEmpView){
    var EmployeeCollection = Backbone.PageableCollection.extend({
            model: EmployeeListModel,
            url: "http://localhost:3000/Success",
            state: {
              pageSize: 15
            },
            mode: "client" // page entirely on the client side
          });
          return EmployeeCollection;
        })

