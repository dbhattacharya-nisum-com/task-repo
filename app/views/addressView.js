define(['backbone','backbone.marionette','Templates'],function(backbone,marionette,templates){
	
	var AddressView = marionette.ItemView.extend({
        template:templates.addressItemView,
        initialize:function(options){
        },
        
        validations: function(){
            console.log('helo'+ this.validationErrors);
        },
        triggers : {
            'click #submitAddressNext':'AddressView:submitAdd'
        }
    })
        return AddressView;
})   