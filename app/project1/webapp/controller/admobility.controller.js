sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"

], (Controller, JSONModel, MessageBox, MessageToast) => {
    "user strict"


    return Controller.extend("project1.controller.admobility", {
        onInit() {

            var oPath = jQuery.sap.getModulePath(
                "project1",
                "/model/admobility.json"
            );


            var oModel = new sap.ui.model.json.JSONModel(oPath);
            this.getView().setModel(oModel, "data");

            var oModel = new JSONModel();
            let carNumber;
            oModel.setData({
                Carcolor: 'White',
                CarCode: '1001',
            });

            this.getView().setModel(oModel);
            var oInput = this.byId("inputField")


            var values = ["OOL1883250", "OOP1883250", ""];
            for (var i = values.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                [values[i], values[j]] = [values[j], values[i]];
            }
            console.log("Shuffled Array:", values);
            var oInput = this.byId("name1");
            var randomValue = values[Math.floor(Math.random() * values.length)];
            oInput.setValue(randomValue);
            this.PurposeDataFromApi();

            let PlateNumber = oInput.getValue();
            
            if (PlateNumber == '' || null || undefined) {

                this.TimeRanges();

            } else {
                
                var oModel = new JSONModel({
                    iTimeLeft: 5
                });

                this.getView().setModel(oModel);
            }



        },
        backToLanding: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteLanding", {}, true);
        },
        goToCreateVeh: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteCustomerCreate", {}, true);
        },
        onSaveSO: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteSalesOrder", {}, true);
        },

        onInfoMessageBoxPress: function (PlateNumber, oEvent) {
            const that = this;
            let dependentOn;
            selectedAction: ""
            var oInput = this.byId("name1");
            var inputValue = oInput.getValue();
            var sUrl = `/odata/v4/employee/GetVehicleDetails?$filter=PlateNumber eq '${inputValue}'`;
            jQuery.ajax({
                url: sUrl,
                method: "GET",
                dataType: "json",
                success: function (data) {
                    console.log("Success:", data.value[0]);

                    if (data.value[0] == null || undefined) {
                        MessageBox.information(
                            "Fetch data from local database.", {
                            actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                            emphasizedAction: MessageBox.Action.OK,
                            onClose: function (sAction) {
                                this.selectedAction = sAction;
                                if (sAction == 'OK') {
                                    that.ADMobility(PlateNumber);
                                }
                                console.log("FetchDataFromBTPForADMobility", sAction);
                            },
                            dependentOn: that.getView()
                        }
                        )
                    }
                    var oModelFromApi = new sap.ui.model.json.JSONModel(data.value[0]);
                    that.getView().setModel(oModelFromApi, "ADMobility");
                },
                error: function (error) {
                    console.log("Error:", error);
                }
            });





        },

        generateCarNumber() {
            var PlateNumber = ["OOL188325021", "OOP188325081", "OOT1883250991"];
            // const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            // const prefix = Array(3).fill(null).map(() => letters.charAt(Math.floor(Math.random() * letters.length))).join('');
            // const number = Math.floor(1000 + Math.random() * 9000);
            // const timestamp = new Date().getFullYear().toString().substr(-2) +
            //     (new Date().getMonth() + 1).toString().padStart(2, '0') +
            //     new Date().getDate().toString().padStart(2, '0');
            // const carNumber = `${prefix}${number}${timestamp}`;
            for (var i = PlateNumber.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                [PlateNumber[i], values[j]] = [PlateNumber[j], PlateNumber[i]]; // Swap the elements
            }
            return carNumber;
        },

        onCallApi: function () {
            var sUrl = "/odata/v4/employee/GetVehicleDetail";
            const that = this;
            jQuery.ajax({
                url: sUrl,
                method: "GET",
                dataType: "json",
                success: function (data) {
                    console.log("Success:", data);
                    // that.getView().getModel("ADMobility").setData(data.value[0]);
                    // console.log("API -> " + apiData);
                },
                error: function (error) {
                    console.log("Error:", error);
                }
            });
        },

        ADMobility(PLateNumber) {
            const that = this;
            var sUrl = `/odata/v4/employee/GetVehicleDetails`;
            jQuery.ajax({
                url: sUrl,
                method: "GET",
                dataType: "json",
                success: function (data) {
                    console.log("Success:", data.value[0]);

                    var oModelFromApi = new sap.ui.model.json.JSONModel(data.value[0]);
                    that.getView().setModel(oModelFromApi, "ADMobility");

                    if (oModelFromApi) {

                        console.log("Model found, setting data...");
                        oModelFromApi.setData(data.value[0]);
                    } else {
                        console.log("Error: Model is not defined!");
                    }
                },
                error: function (error) {
                    console.log("Error:", error);
                }
            });
        },

        PurposeDataFromApi() {
            let data = [];
            const that = this;
            var sUrl = `/odata/v4/employee/MPurpose`;
            jQuery.ajax({
                url: sUrl,
                method: "GET",
                dataType: "JSON",
                success: function (data) {
                    console.log("Success:", data);
                    var oModel = new sap.ui.model.json.JSONModel(data);
                    that.getView().setModel(oModel, "PurposeModel");

                }
            });
        },

        TimeRanges() {
            var oModel = new JSONModel({
                iTimeLeft: 5
            });

            this.getView().setModel(oModel);

            var iTimeLeft = 5;
            var oTimer = setInterval(function () {
                if (iTimeLeft >= 0) {

                    oModel.setProperty("/iTimeLeft", iTimeLeft);
                    iTimeLeft--;
                } else {

                    iTimeLeft = 5;
                }
            }, 1000);
        }


    })
}) 