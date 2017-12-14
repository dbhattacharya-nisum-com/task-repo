define(['backbone','backbone.marionette','Templates'],function(backbone,marionette,templates){
	
	var ExperienceView = marionette.ItemView.extend({
        template:templates.experienceItemView,
        intialize:function(){

        },
        triggers : {
            'click #submitExperience':'ExperienceView:submitExperience'
        }
    })
        return ExperienceView;
})   