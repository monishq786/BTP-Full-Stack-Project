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
            this.userList();
        },
        onInit: function () {
            that = this
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteUserMaster").attachMatched(this.onRouteMatched, this)

            var oPath = jQuery.sap.getModulePath(
                "project1",
                "/model/userMaster.json"
            );
            var oModel = new sap.ui.model.json.JSONModel(oPath);
            this.getView().setModel(oModel, "UserMasterModel");

           
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
            this.getRouter().navTo("RouteUserMasterAddEdit", {
                data: encodeURIComponent(0),
                type: 'Add'
            });
        },
        navBack: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDashBoard", {}, true);
        },
        onAction: function (oEvent) {
            var sPath = oEvent.getSource().getBindingContext("UserMasterModel").getPath();
            var iIndex = parseInt(sPath.split("/")[2]);
            var oModel = that.getView().getModel("UserMasterModel");
            var aData = oModel.getData();
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("RouteUserMasterAddEdit", {
                data: encodeURIComponent(aData.value[iIndex].UserID),
                type: 'edit'
            });
        },
    })
}) 