sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
 ], function (Controller, JSONModel) {
    "use strict";
 
    return Controller.extend("project1.controller.dashboard", {
       onInit: function () {
          // Create JSON Model
          var oModel = new JSONModel();
          oModel.loadData("model/data.json"); 
          this.getView().setModel(oModel);
       }
    });
 });
 
