define(function (require,hbars) {
    'use strict';

    return {
        navbarItemView: require('hbars!templates/navbar'),
        loginPageItemView: require('hbars!templates/login'),
        homeItemView : require('hbars!templates/home'),
        addEmpItemView : require('hbars!templates/addEmployee'),
        editEmpItemView : require('hbars!templates/editEmployee'),
        aboutItemView:require('hbars!templates/about'),
        sidePanelView:require('hbars!templates/sidepanel'),
        employeeItemView:require('hbars!templates/employee'),
        experienceItemView:require('hbars!templates/experience'),
        addressItemView: require('hbars!templates/address'),
        myProfileEditView: require('hbars!templates/myProfile'),
        salaryBreakUpsView: require('hbars!templates/salaryBreakUp')
    };
});