sap.ui.define([
    'sap/ui/model/json/JSONModel',
    "sap/ui/core/mvc/Controller",
], function (JSONModel, Controller) {
    'use strict';
    return Controller.extend('landingcontroller.landing', {
        onInit: function () {
        },
        onBeforeShow: function () {
            let oObjectPageLayout = this.byId('goalsSection');
            let oSection = this.byId('goalsSection');
            oObjectPageLayout.setSelectedSection(oSection);
        },

        initialize: async function () {
            //this.getAllTiels();

        },

        getAllTiels: function () {
            // Define tile data
            let oTileData = {
                tiles: [
                    { title: "Search Vehicle", icon: "sap-icon://search", press: "onPressSearchVehicle" },
                    { title: "Open Service Request", icon: "sap-icon://detail-view", press: "onPressServiceRequest" },
                    { title: "Visual Test", icon: "sap-icon://inspection", press: "onPressVisualTest" },
                    { title: "Customer Creation", icon: "sap-icon://customer", press: "onPressCustomerCreation" },
                    { title: "Sales Order", icon: "sap-icon://customer", press: "onPressSalesOrder" }
                ]
            };

            // Set model
            let oModel = new JSONModel(oTileData);
            this.getView().setModel(oModel, "tileModel");
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

        goToEmployee: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteEmpMaster", {}, true);
        },
        goToDashBoard: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDashBoard", {}, true);
        },

        goToDept: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDeptMaster", {}, true);
        },

        goToUser: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteUserMaster", {}, true);
        },

        onPressADMobility: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteADMobility", {}, true);
        },
        
        onPressVisualTest: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteServiceTest", {}, true);
        },
        onPressCustomerCreation: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteCustomerCreate", {}, true);
        },

        onPressSalesOrder: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteSalesOrder", {}, true);
        },

        onPressCamera: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteCamera", {}, true);
        },
        onPressOpenService: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteOpenService", {}, true);
        },
        onPressChangeVehicle: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteChangeVehicleInfo", {}, true);
        }






    });
});
