sap.ui.define(["sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast'
], (Controller,JSONModel,MessageToast) => {
    "user strict"

    return Controller.extend("project1.controller.salesorder", {
        onInit() {
            var oPath = jQuery.sap.getModulePath(
                "project1",
                "/model/multitests.json",
            );
            var oModel = new sap.ui.model.json.JSONModel(oPath);
            this.getView().setModel(oModel);
            
            this._oCurrentP13nData = null;
		},
        
        backToLanding: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteADMobility", {}, true);
        },
        getFullWidth: function () {
            return new sap.m.FlexItemData({ growFactor: 1 });
        },
        onExitPress: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteADMobility", {}, true);
        },
        _initialData: {
			columns: [{
					visible: true,
					name: "key1",
					label: "Cash"
				},
				{
					visible: false,
					name: "key2",
					label: "Card"
				},
				{
					visible: false,
					name: "key3",
					label: "Wallet"
				}
			]
		},

		_setInitialData: function() {
			const oView = this.getView();

			const oSelectionPanel = oView.byId("columnsPanel");
			
		

			oSelectionPanel.setP13nData(this._initialData.columns);
			
		
		},

		onPaymentDialogOpen: function(oEvt) {
			const oView = this.getView();
			const oPopup = oView.byId("p13nPopup");
			if (!this._bIsOpen) {
				this._setInitialData();
				this._bIsOpen = true;
			}

			oPopup.open(oEvt.getSource());
		},

		onClose: function(oEvt) {
			const sReason = oEvt.getParameter("reason");
			MessageToast.show("Dialog close reason: " + sReason);
		},

		

		parseP13nState: function(oEvt) {

			if (oEvt) {
				MessageToast.show("P13n panel change reason:" + oEvt.getParameter("reason"));
			}

			const oView = this.getView();
			const oEditor = oView.byId("p13nEditor");

			const oP13nState = {
				columns: oView.byId("columnsPanel").getP13nData(),
			
			};

			oEditor.setValue(JSON.stringify(oP13nState, null, '  '));
		}
    })
}) 