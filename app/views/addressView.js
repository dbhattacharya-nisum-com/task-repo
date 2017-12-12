define(['backbone','backbone.marionette','Templates'],function(backbone,marionette,templates){
	
	var AddressView = marionette.ItemView.extend({
        template:templates.addressItemView,
        intialize:function(){

        },
    })
        return AddressView;
})   