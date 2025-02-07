sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
], (Controller,JSONModel) => {
    "use strict";

    return Controller.extend("project1.controller.changevehicleinfo", {
        onInit() {

            var oData = {
                vehicleDetails: {
                    ChasisNo: "",
                    EngineNo: "",
                    Country: "",
                    Manufacturer: "",
                    Model: "",
                    PlateType: "",
                    FuelType: "",
                    Kind:"",
                    Type:"",
                    BodyColor:"",
                    GearType :"",
                    SteeringSide:"",
                    WeightKind:""
                    
                }
            };
        
            var oModel = new sap.ui.model.json.JSONModel(oData);
            this.getView().setModel(oModel, "vehicleModel");

        },
        // /odata/v4/vehicle/Vehicle
        onSubmit:function(){

            var oModel = this.getView().getModel("vehicleModel");
            var oData = oModel.getProperty("/vehicleDetails"); // Get user input data

            var sUrl = "/odata/v4/vehicle/Vehicle"; // Change this to your API URL

            // Make API call
            $.ajax({
                url: sUrl,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(oData),
                success: function (response) {
                    sap.m.MessageToast.show("Data submitted successfully!");
                    if(response == 200)
                    {
                        const oRouter = this.getOwnerComponent().getRouter();
                        oRouter.navTo("RouteLanding", {}, true);

                    }
                    
                },
                error: function (error) {
                    sap.m.MessageToast.show("Error submitting data!");
                }
            });        


        },
        onCancel:function(){

            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteLanding", {}, true);
        }

    });
});