sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
    "user strict"

    return Controller.extend("project1.controller.salesorder", {
        onInit() {

        },
        backToLanding: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteLanding", {}, true);
        },
        getFullWidth: function () {
            return new sap.m.FlexItemData({ growFactor: 1 });
        }
    })
}) 