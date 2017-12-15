define(['backbone','models/employeeListModel','backbonePageable'],function(backbone,EmployeeListModel,backbonePageable){
    var EmployeeCollection = Backbone.PageableCollection.extend({
            model: EmployeeListModel,
            url: "http://localhost:3000/Employees",
            state: {
              pageSize: 15
            },
            parse: function(response){
                return response.Employees;
            },
            mode: "client" // page entirely on the client side
          });
          return EmployeeCollection;
        })

