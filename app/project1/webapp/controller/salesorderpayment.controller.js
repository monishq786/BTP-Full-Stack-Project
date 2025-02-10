sap.ui.define(["sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast'
], (Controller, JSONModel, MessageToast) => {
    "user strict"

    return Controller.extend("project1.controller.salesorderpayment", {
        onInit() {
            var oPath = jQuery.sap.getModulePath(
                "project1",
                "/model/multitests.json",
            );
            var oModel = new sap.ui.model.json.JSONModel(oPath);
            this.getView().setModel(oModel);

            this._oCurrentP13nData = null;
        },

        backToLanding: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteADMobility", {}, true);
        },
        getFullWidth: function () {
            return new sap.m.FlexItemData({ growFactor: 1 });
        },
        onExitPress: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteADMobility", {}, true);
        },
    })

});