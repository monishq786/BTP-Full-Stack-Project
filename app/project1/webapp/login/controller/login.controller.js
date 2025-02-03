sap.ui.define([
    'sap/ui/model/json/JSONModel',
    'sap/ui/core/mvc/Controller'
], function (JSONModel, Controller) {
    'use strict';

    return Controller.extend('logincontroller.login', {
        onInit: function () {

        },

        onBeforeShow: function () {
            this.initialize();
        },

        initialize: function () {

        },

        onPressLogin: async function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo('RouteLanding');
        },


    });
});