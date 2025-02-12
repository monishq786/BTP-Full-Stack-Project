sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
    "user strict"

    return Controller.extend("project1.controller.admobility", {
        
        onInit() {

            var oData = {
                vehicleDetails: {
                    ChasisNo: "",
                    EngineNo: "",
                    Country: "",
                    Manufacturer: "",
                    Model: "",
                    PlateType: "",
                    Kind: "",
                    Type: "",
                    BodyColor: "",
                    GearType: "",
                    FuelType: "",
                    SteeringSide: "",
                    WeightKind: "",
                    InitRegYear: "",
                    MfgYear: "",
                    HorsePower: "",
                    NoOfAxies: "",
                    NoOfCylinders: "",
                    NoOfWheels: "",
                    NoOfDoors: "",
                    NoOfPassengers: "",
                    EmptyWeight: "",
                    FullWeight: "",
                    Mileage: "",
                    CubicCapacity: "",
                    Name: "",
                    Email: "",
                    Mobile: "",
                    City: "",
                    Postal: "",
                    Address: ""

                }
            };
            var oModel = new sap.ui.model.json.JSONModel(oData);
            this.getView().setModel(oModel, "vehicleModel");

        },
        backToLanding: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteLanding", {}, true);
        },
        goToCreateVeh:function(){
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteCustomerCreate", {}, true);
        },
        onSaveSO:function(){
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteSalesOrder", {}, true);
        },
        onPressADMobility:function(){
             // Retrieve the model
             var oModel = this.getView().getModel("vehicleModel");
             // Get the data from the model
             var oData = oModel.getData();
 
             // Modify the data as needed
             oData.vehicleDetails.ChasisNo = "C191827364";
             oData.vehicleDetails.EngineNo= "ENG56384",
             oData.vehicleDetails.Country= "Zermany",
             oData.vehicleDetails.Manufacturer= "BMW",
             oData.vehicleDetails.Model="2024",
             oData.vehicleDetails.PlateType="Steel",
             oData.vehicleDetails.Kind= "Normal",
             oData.vehicleDetails.Type= "Type01",
             oData.vehicleDetails.BodyColor= "Black",
             oData.vehicleDetails.GearType="Five",
             oData.vehicleDetails.FuelType= "Petrol",
             oData.vehicleDetails.SteeringSide= "Left",
             oData.vehicleDetails.WeightKind= "1290",
             oData.vehicleDetails.InitRegYear= "2322",
             oData.vehicleDetails.MfgYear="2020",
             oData.vehicleDetails.HorsePower= "1800",
             oData.vehicleDetails.NoOfAxies= "4",
             oData.vehicleDetails.NoOfCylinders= "5",
             oData.vehicleDetails.NoOfWheels= "4",
             oData.vehicleDetails.NoOfDoors= "6",
             oData.vehicleDetails.NoOfPassengers= "7",
             oData.vehicleDetails.EmptyWeight= "21",
             oData.vehicleDetails.FullWeight= "12222",
             oData.vehicleDetails.Mileage= "40",
             oData.vehicleDetails.CubicCapacity= "1500",
             oData.vehicleDetails.Name= "Mohammed Azar",
             oData.vehicleDetails.Email= "m****r@***com",
             oData.vehicleDetails.City= "Abu Dhabi",
             oData.vehicleDetails.Postal= "1656",
             oData.vehicleDetails.Address= "Corniche Road Abu Shabi"
             oData.vehicleDetails.Mobile = "98**********11"
 
             // Set the modified data back to the model
             oModel.setData(oData);
            

        }
    })
}) 