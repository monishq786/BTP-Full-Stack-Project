sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "../service/WebService",
    "sap/ui/model/json/JSONModel",

], function (Controller, UIComponent, MessageToast, WebService, JSONModel) {
    let that;
    let id;
    let screenType='Add';
    "use strict";

    return Controller.extend("project1.controller.employeeMasterAddEdit", {

        onRouteMatched: function (oEvent) {
            let oArguments = oEvent.getParameter("arguments");
            this.id = decodeURIComponent(oArguments.id);
            this.screenType = decodeURIComponent(oArguments.screenType);
            var oPath = jQuery.sap.getModulePath(
                "project1",
                "/model/employeeMaster.json"
            );
            var oModel = new sap.ui.model.json.JSONModel(oPath);
            this.getView().setModel(oModel, "EmployeeMasterModel");
            if (this.screenType == 'edit') {
                let oView = this.getView();
                oView.byId('btnSave').setVisible(false);
                oView.byId('btnUpdate').setVisible(true);
                this.onEdit();
            } else {
                let oView = this.getView();
                oView.byId('btnSave').setVisible(true);
                oView.byId('btnUpdate').setVisible(false);
            }
          
        },

        onInit: function () {
            that = this;
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteEmpMasterAddEdit").attachMatched(this.onRouteMatched, this)
        },

        onEdit: function () {
            // let oModel = this.getView().getModel("EmployeeMasterModel");
            // let oData = oModel.getData();
            WebService.getViewEmployeeAPI(this.id).then(function (response) {
                if (response.code == 200) {
                    var oModel = that.getView().getModel("EmployeeMasterModel");
                    oModel.setData(response.data);
                    that.getView().setModel(oModel, "EmployeeMasterModel");
                }
                console.log(response);
            })
        },

        onSave: function () {
            let oModel = this.getView().getModel("EmployeeMasterModel");
            let oData = oModel.getData();
            let body = {
                "ID": oData.ID,
                "Name": oData.Name,
                "Age": oData.Age,
                "Salary": oData.Salary
            }
            if (that.screenType == 'Add') {
                WebService.postEmployee(body).then(function (response) {
                    if (response.code === 200 || response.code === 201) {
                        MessageToast.show("Employee Created Successfully");
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
                WebService.updateEmployee(body, this.id).then(function (response) {
                    if (response.code === 200 || response.code === 201) {
                        MessageToast.show("Employee Updated Successfully");
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
            oRouter.navTo("RouteEmpMaster", {}, true);
        }
    })
})