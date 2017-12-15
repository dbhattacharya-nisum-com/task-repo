
define(['backbone','backbone.marionette','Templates','handlebars','collections/employeeListCollection','views/addEmpView','backbonePageable','views/formColumns'],function(backbone,marionette, templates,handlebars,EmployeeCollection,addEmpView,backbonePageable,columns){
			var HomeView = marionette.View.extend({
			el:'#main-content',
			template:templates.homeItemView,
			initialize: function(options) {
				this.collection = options.collection;
				this.render();
			   },
			   render: function() {
				var self=this;
				//this.$el.html(pageableGrid.render().el);
				this.collection.fetch({reset: true})
				// Set up a grid to use the pageable collection
				var pageableGrid = new Backgrid.Grid({
					columns: columns,
					collection: this.collection
				  });
				var vi = this.$el.html(this.template({}));
				var filter = new Backgrid.Extension.ClientSideFilter({
				collection: this.collection,
				fields: ['firstName', 'id']
				});
				$(filter.el).css({float: "right", margin: "20px"});			
				
				
				var paginator = new Backgrid.Extension.Paginator({
				collection: this.collection
				});
				// Render the filter
				vi.find("#gridReg").append(filter.render().el);
				vi.find("#gridReg").append(pageableGrid.render().el);
				vi.find("#gridReg").append(paginator.render().el);
			} 
			
			});
			return HomeView;
	})

