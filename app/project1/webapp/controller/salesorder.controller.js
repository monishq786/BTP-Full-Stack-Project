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
            this.getGroupHeader();
        },
        getGroupHeader: function (oGroup) {
            let sTitle = (oGroup && oGroup.key === true) ? "Most Frequent Fresh-Test" : "Other Fresh Tests";
            return new sap.m.GroupHeaderListItem({
                title: sTitle,
                upperCase: true
            });
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