sap.ui.define([
    'sap/ui/model/json/JSONModel',
    "sap/ui/core/mvc/Controller",
], function (JSONModel,Controller) {
    'use strict';
    return Controller.extend('landingcontroller.landing', {
        onInit: function () {
        },

        initialize: async function () {

        },

        onBeforeShow: async function () {
            await this.initialize();

        },

        onMenuButtonPress: function () {
            const toolPage = this.byId('toolPage');
            toolPage.setSideExpanded(!toolPage.getSideExpanded());
        },


        _showProfile: function () {
            sap.m.MessageToast.show('Opening profile...');
        },

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        goToEmployee:function(){
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteEmpMaster", {}, true);
        },
        goToDashBoard:function(){
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDashBoard", {}, true);
        },

        goToDept:function(){
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDeptMaster", {}, true);
        },

        goToUser:function(){
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteUserMaster", {}, true);
        }





    });
});
