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
        { key: "DashBoard", menuPath: "RouteDashBoard"},
        { key: "Department", menuPath: "RouteDeptMaster"},
        { key: "User", menuPath: "RouteUserMaster"},
        { key: "Employee", menuPath: "RouteEmpMaster"},
        { key: "Customer", menuPath: "path3"}
      ];

      // Find the tile with the matching key
      const oTile = aTiles.find(tile => tile.key === sKey);

      if (oTile && oTile.menuPath) {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo(oTile.menuPath);
      } else {
        console.error("No navigation path found for key:", sKey);
      }
    }

  });
});