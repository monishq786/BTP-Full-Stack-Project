sap.ui.define([
    'sap/ui/model/json/JSONModel',
    'sap/ui/core/mvc/Controller'
], function (JSONModel, Controller) {
    'use strict';

    return Controller.extend('logincontroller.login', {
        onInit: function () {
            // var oImage = new sap.m.Image({
            //     src: "./images/bg.jpg",
            //     width: "100%",
            //     height: "100%",
            //     opacity: "0.5",
            //     decorative: false
            // });
            // oImage.placeAt("content");
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