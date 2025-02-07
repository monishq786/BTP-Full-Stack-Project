sap.ui.define(["sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
], (Controller,JSONModel) => {
    "user strict"

    return Controller.extend("project1.controller.salesorder", {
        onInit() {
            var oPath = jQuery.sap.getModulePath(
                "project1",
                "/model/multitests.json"
            );
            var oModel = new sap.ui.model.json.JSONModel(oPath);
            this.getView().setModel(oModel);
            // this.getView().setModel(oModel);
            // var oData = {
                
            // };
            // // set explored app's demo model on this sample
            // var oModel = new JSONModel(oData);
            // this.getView().setModel(oModel);
        },
        backToLanding: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteADMobility", {}, true);
        },
        getFullWidth: function () {
            return new sap.m.FlexItemData({ growFactor: 1 });
        },
        onSavePress: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteADMobility", {}, true);
        }
    })
}) 