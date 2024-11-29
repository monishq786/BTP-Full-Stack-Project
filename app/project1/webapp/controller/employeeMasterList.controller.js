sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../service/WebService",
    "sap/ui/core/UIComponent",
], function (Controller, JSONModel, WebService, UIComponent) {
    let that;
    'use strict';
    return Controller.extend("project1.controller.employeeMasterList", {
        onRouteMatched: function (oEvent) {

        },
        onInit: function () {
            that = this
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteEmpMaster").attachMatched(this.onRouteMatched, this)

            var oPath = jQuery.sap.getModulePath(
                "project1",
                "/model/employeeMaster.json"
            );
            var oModel = new sap.ui.model.json.JSONModel(oPath);
            this.getView().setModel(oModel, "EmployeeMasterModel");

            this.empList();
        },

        empList: function () {
            WebService.getEmployeeMasterAPI().then(function (response) {
                if (response.code == 200) {
                    var oModel = that.getView().getModel("EmployeeMasterModel");
                    if (response.data.value.length > 0) {
                        oModel.setData(response.data);
                    }
                    that.getView().setModel(oModel, "EmployeeMasterModel");
                }
                console.log(response);
            })
        },

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        onRouterClick: function () {
            this.getRouter().navTo("RouteEmpMasterAddEdit", {
                data: encodeURIComponent(0),
                type: 'add'
            });
        },
        navBack: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteEmpMaster", {}, true);
        },
        onAction: function (oEvent) {
            var sPath = oEvent.getSource().getBindingContext("EmployeeMasterModel").getPath();
            var iIndex = parseInt(sPath.split("/")[2]);
            var oModel = that.getView().getModel("EmployeeMasterModel");
            var aData = oModel.getData();
            var oRouter = UIComponent.getRouterFor(this);
            var sData = aData.value[iIndex].UserID;
            oRouter.navTo("RouteEmpMasterAddEdit", {
                data: encodeURIComponent(sData),
                type: 'edit'
            });
        },
    })
}) 