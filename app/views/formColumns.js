define(['backbone','backbone.marionette','Templates','handlebars','collections/employeeListCollection','views/addEmpView','backbonePageable'],function(backbone,marionette, templates,handlebars,EmployeeCollection,addEmpView,backbonePageable){
    
var EditCell = Backgrid.Cell.extend({
    template: _.template('<a id="editEmp" class="right small add-employee" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Edit</a>'),
    events: {
      "click": "editRow"
    },
    editRow: function (e) {
      console.log(this.model.attributes);
      this.$el.html(new addEmpView({model: this.model}));
      
    //  e.preventDefault();
     // this.model.collection.edit(this.model);
    },
    render: function () {
      this.$el.html(this.template());
      this.delegateEvents();
      return this;
    }
  });
  
  var DeleteCell = Backgrid.Cell.extend({
    template: _.template('<a id="deleteEmp" class="right small add-employee" ><i class="fa fa-times" aria-hidden="true"></i>Delete</a>'),
    events: {
      "click": "deleteRow"
    },
    deleteRow: function (e) {
      console.log(this.model.attributes);
     
      console.log("deleteModel");
      this.model.destroy({
          success: function() {
            console.log("Successfully deleted");
            
          }
      });
  
    },
    render: function () {
      this.$el.html(this.template());
      this.delegateEvents();
      return this;
    }
  });
  var columns = [{
    name: "id", 
    label: "Employee ID", 
    cell: "string",
    editable: false, 
  }, 
  {
    name: "firstName",
    label: "Name",
    cell: "string",
    editable: false 
  }, 
   {
    name: "designation",
    label: "Designation",
    cell: "string",
    editable: false 
  }, 
  {
    name: "emailId",
    label: "EmailId",
    cell: "string",
    editable: false 
  },
  {
    name: "Edit",
    label: "Edit",
    cell: EditCell,
    editable: false 
  },
  {
    name: "Delete",
    label: "Delete",
    cell: DeleteCell,
    editable: false 
  }
  ];
  return columns;
});