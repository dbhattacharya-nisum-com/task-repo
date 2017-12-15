define(['backbone','models/employeeListModel','backbonePageable'],function(backbone,EmployeeListModel,backbonePageable){
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

