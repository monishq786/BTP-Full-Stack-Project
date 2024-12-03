sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel",
   "../service/WebService"

], function (Controller, JSONModel, WebService) {
   let that;
   "use strict";

   return Controller.extend("project1.controller.dashboard", {
      onInit: function () {
         that = this
         // Create JSON Model
         let oPath = jQuery.sap.getModulePath(
            "project1",
            "/model/dashBoard.json"
         );
         let oModel = new sap.ui.model.json.JSONModel(oPath);
         this.getView().setModel(oModel, "dashBoardModel");
         // let oModel = new JSONModel();
         // oModel.loadData("model/dashBoard.json");
         this.getView().setModel(oModel);
         this.dashboardList();
      },
      navBack: function () {
         const oRouter = this.getOwnerComponent().getRouter();
         oRouter.navTo("RouteLanding", {}, true);
      },
      dashboardList: function () {
         WebService.getDashBoardAPI().then(function (response) {
            if (response.code == 200) {
               var oModel = that.getView().getModel("dashBoardModel");
               if (response.data.value.length > 0) {
                  oModel.setData(response.data);
               }
               that.getView().setModel(oModel, "dashBoardModel");
            }
            console.log(response);
         })
      },
   });
});

