sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "../service/WebService",
    "sap/ui/model/json/JSONModel",

], function (Controller, UIComponent, MessageToast, WebService, JSONModel) {
    "use strict";
    let that;
    let id;
    let screenType = 'Add';
    return Controller.extend("project1.controller.employeeMasterAddEdit", {
        
        onRouteMatched: function (oEvent) {
            let sData = decodeURIComponent(oEvent.getParameter("arguments").data);
            screenType = decodeURIComponent(oEvent.getParameter("arguments").type);
            id = sData;
        },

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

        onSave: function () {
            let oModel = this.getView().getModel("EmployeeMasterModel");
            let oData = oModel.getData();
            let body = {
                "ID": oData.ID,
                "Name": oData.Name,
                "Age": oData.Age,
                "Salary": oData.Salary
            }
            if (screenType = 'Add') {
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
                WebService.updateEmployee(body, id).then(function (response) {
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