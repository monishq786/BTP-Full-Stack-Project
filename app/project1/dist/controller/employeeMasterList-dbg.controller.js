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
            this.empList();
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
                id: encodeURIComponent(0),
                screenType: 'Add'
            });
        },
        navBack: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDashBoard", {}, true);
        },
        onAction: function (oEvent) {
            var sPath = oEvent.getSource().getBindingContext("EmployeeMasterModel").getPath();
            var iIndex = parseInt(sPath.split("/")[2]);
            var oModel = that.getView().getModel("EmployeeMasterModel");
            var aData = oModel.getData();
            this.getRouter().navTo("RouteEmpMasterAddEdit", {
                id: encodeURIComponent(aData.value[iIndex].ID),
                screenType: 'edit'
            });
        },
        onDelete: async function (oEvent) {
            var sPath = oEvent.getSource().getBindingContext("EmployeeMasterModel").getPath();
            var iIndex = parseInt(sPath.split("/")[2]);
            var oModel = that.getView().getModel("EmployeeMasterModel");
            var aData = oModel.getData();
           await WebService.deleteEmpList(aData.value[iIndex].ID).then(function (response) {
                that.empList();
                console.log(response);
            })
        }
    })
}) 