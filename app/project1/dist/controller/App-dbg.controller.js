sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller) => {
  "use strict";

  return Controller.extend("project1.controller.App", {
    onInit() {
    },

    onMenuButtonPress: function () {
      const oSideNavigation = this.byId("sideNavigation"),
        bExpanded = oSideNavigation.getExpanded();

      oSideNavigation.setExpanded(!bExpanded);
    },
    getBundleText: function (sI18nKey, aPlaceholderValues) {
      return this.getBundleTextByModel(sI18nKey, this.getOwnerComponent().getModel("i18n"), aPlaceholderValues);
    },
    onNavItemSelect: function (oEvent) {
      const oSelectedItem = oEvent.getParameter("item");
      const sKey = oSelectedItem.getKey();

      // Hardcoded tile data
      const aTiles = [
        { key: "Home", menuPath: "RouteLanding" },
        { key: "Search", menuPath: "RouteADMobility" },
        { key: "Visual", menuPath: "RouteServiceTest" },
        { key: "Open Service Request", menuPath: "RouteCustomerCreate" },
        { key: "PendingPayment", menuPath: "path3" },
        { key: "Sales Order", menuPath: "RouteSalesOrder" }
      ];

      // Find the tile with the matching key
      const oTile = aTiles.find(tile => tile.key === sKey);

      if (oTile && oTile.menuPath) {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo(oTile.menuPath);
      } else {
        console.error("No navigation path found for key:", sKey);
      }
    },

    // onPressADMobility: function () {
    //   const oRouter = this.getOwnerComponent().getRouter();
    //   oRouter.navTo("RouteADMobility", {}, true);
    // },

    // onPressVisualTest: function () {
    //   const oRouter = this.getOwnerComponent().getRouter();
    //   oRouter.navTo("RouteServiceTest", {}, true);
    // },
    // onPressCustomerCreation: function () {
    //   const oRouter = this.getOwnerComponent().getRouter();
    //   oRouter.navTo("RouteCustomerCreate", {}, true);
    // },

    // onPressSalesOrder: function () {
    //   const oRouter = this.getOwnerComponent().getRouter();
    //   oRouter.navTo("RouteSalesOrder", {}, true);
    // }

  });
});