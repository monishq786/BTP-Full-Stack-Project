sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
    "user strict"

    return Controller.extend("project1.controller.customercreate", {
        onInit() {

        },
        backToLanding: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteLanding", {}, true);
        },
        onSaveCustomerCreate: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteADMobility", {}, true);
        },
        onCancel:function(){
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteADMobility", {}, true);
        }
    })
}) 