sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "../service/WebService",
    "sap/ui/model/json/JSONModel",

], function (Controller, UIComponent, MessageToast, WebService, JSONModel) {
    "use strict";
    let that;
    return Controller.extend("project1.controller.employeeMasterAdd", {
        onInit: function () {
            that = this;
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteEmpMaster").attachMatched(this.onRouteMatched, this)

           // var obji18n = this.getOwnerComponent().getModel('i18n').getResourceBundle();
            // var value = obji18n.getText('pageTitle');
            // this.getView().byId('page').setTitle(value);
            var oPath = jQuery.sap.getModulePath(
                "project1",
                "/model/employeeMaster.json"
            );
            var oModel = new sap.ui.model.json.JSONModel(oPath);
            this.getView().setModel(oModel, "EmployeeMasterModel");

        },
    })
})