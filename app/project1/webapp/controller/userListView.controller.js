sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../service/WebService",
    "sap/ui/core/UIComponent",
], function (Controller, JSONModel, WebService, UIComponent) {
    let that;
    'use strict';
    return Controller.extend("project1.controller.userListView", {
        onRouteMatched: function (oEvent) {

        },
        onInit: function () {
            that = this
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteEmpMaster").attachMatched(this.onRouteMatched, this)

            var oPath = jQuery.sap.getModulePath(
                "project1",
                "/model/userMaster.json"
            );
            var oModel = new sap.ui.model.json.JSONModel(oPath);
            this.getView().setModel(oModel, "UserMasterModel");

            this.userList();
        },

        userList: function () {
            WebService.getUserListAPI().then(function (response) {
                if (response.code == 200) {
                    var oModel = that.getView().getModel("UserMasterModel");
                    if (response.data.value.length > 0) {
                        oModel.setData(response.data);
                    }
                    that.getView().setModel(oModel, "UserMasterModel");
                }
                console.log(response);
            })
        },

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        onRouterClick: function () {
            this.getRouter().navTo("TargetUserMasterAddEdit", {
                data: encodeURIComponent(0),
                type: 'add'
            });
        },
        navBack: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteLanding", {}, true);
        },
        onAction: function (oEvent) {
            var sPath = oEvent.getSource().getBindingContext("UserMasterModel").getPath();
            var iIndex = parseInt(sPath.split("/")[2]);
            var oModel = that.getView().getModel("UserMasterModel");
            var aData = oModel.getData();
            var oRouter = UIComponent.getRouterFor(this);
            var sData = aData.value[iIndex].UserID;
            oRouter.navTo("TargetUserMasterAddEdit", {
                data: encodeURIComponent(sData),
                type: 'edit'
            });
        },
    })
}) 