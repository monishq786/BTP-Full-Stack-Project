sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "../service/WebService",
    "sap/ui/model/json/JSONModel",

], function (Controller, UIComponent, MessageToast, WebService, JSONModel) {
    let that;
    let id;
    let screenType = 'Add';
    "use strict";

    return Controller.extend("project1.controller.deptMasterAddEdit", {

        onRouteMatched: function (oEvent) {
            let oArguments = oEvent.getParameter("arguments");
            this.id = decodeURIComponent(oArguments.id);
            this.screenType = decodeURIComponent(oArguments.screenType);
            var oPath = jQuery.sap.getModulePath(
                "project1",
                "/model/deptMaster.json"
            );
            var oModel = new sap.ui.model.json.JSONModel(oPath);
            this.getView().setModel(oModel, "DeptMasterModel");
            if (this.screenType == 'edit') {
                let oView = this.getView();
                oView.byId('deptBtnSave').setVisible(false);
                oView.byId('deptBtnUpdate').setVisible(true);
                this.onEdit();
            } else {
                let oView = this.getView();
                oView.byId('deptBtnSave').setVisible(true);
                oView.byId('deptBtnUpdate').setVisible(false);
            }

        },

        onInit: function () {
            that = this;
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteDeptMasterAddEdit").attachMatched(this.onRouteMatched, this)
        },

        onEdit: function () {
            // let oModel = this.getView().getModel("DeptMasterModel");
            // let oData = oModel.getData();
            WebService.getViewDeptAPI(this.id).then(function (response) {
                if (response.code == 200) {
                    var oModel = that.getView().getModel("DeptMasterModel");
                    oModel.setData(response.data);
                    that.getView().setModel(oModel, "DeptMasterModel");
                }
                console.log(response);
            })
        },

        onSave: function () {
            let oModel = this.getView().getModel("DeptMasterModel");
            let oData = oModel.getData();
            let body = {
                "DepartmentName": oData.DepartmentName,
                "DepartmentCode": oData.DepartmentCode
            }
            if (that.screenType == 'Add') {
                WebService.postDept(body).then(function (response) {
                    if (response.code === 200 || response.code === 201) {
                        MessageToast.show("Department Created Successfully");
                        setTimeout(function () {
                            that.onNavBack();
                        }.bind(this), 500);

                    } else {
                        MessageToast.show(response.msg);
                    }
                }).catch(function (error) {
                    MessageToast.show("Error: " + error.message);
                });
            } else {
                WebService.updateDept(body, this.id).then(function (response) {
                    if (response.code === 200 || response.code === 201) {
                        MessageToast.show("Department Updated Successfully");
                        setTimeout(function () {
                            that.onNavBack();
                        }.bind(this), 500);

                    } else {
                        MessageToast.show(response.msg);
                    }
                }).catch(function (error) {
                    MessageToast.show("Error: " + error.message);
                });
            }

        },

        onNavBack: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDeptMaster", {}, true);
        }
    })
})