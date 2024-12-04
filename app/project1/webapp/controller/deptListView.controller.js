sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../service/WebService",
    "sap/ui/core/UIComponent",
], function (Controller, JSONModel, WebService, UIComponent) {
    let that;
    'use strict';
    return Controller.extend("project1.controller.deptListView", {
        onRouteMatched: function (oEvent) {
            this.deptList();
        },
        onInit: function () {
            that = this
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteDeptMaster").attachMatched(this.onRouteMatched, this)

            var oPath = jQuery.sap.getModulePath(
                "project1",
                "/model/deptMaster.json"
            );
            var oModel = new sap.ui.model.json.JSONModel(oPath);
            this.getView().setModel(oModel, "DeptMasterModel");

           
        },

        deptList: function () {
            WebService.getDeptMasterAPI().then(function (response) {
                if (response.code == 200) {
                    var oModel = that.getView().getModel("DeptMasterModel");
                    if (response.data.value.length > 0) {
                        oModel.setData(response.data);
                    }
                    that.getView().setModel(oModel, "DeptMasterModel");
                }
                console.log(response);
            })
        },

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        onRouterClick: function () {
            this.getRouter().navTo("RouteDeptMasterAddEdit", {
                id: encodeURIComponent(0),
                screenType: 'Add'
            });
        },

        navBack: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteLanding", {}, true);
        },

        onAction: function (oEvent) {
            var sPath = oEvent.getSource().getBindingContext("DeptMasterModel").getPath();
            var iIndex = parseInt(sPath.split("/")[2]);
            var oModel = that.getView().getModel("DeptMasterModel");
            var aData = oModel.getData();
            this.getRouter().navTo("RouteDeptMasterAddEdit", {
                id: encodeURIComponent(aData.value[iIndex].ID),
                screenType: 'edit'
            });
        },

       
    })
}) 