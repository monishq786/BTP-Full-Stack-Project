sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller) => {
  "use strict";

  return Controller.extend("project1.controller.App", {
    onInit() {
      let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.attachRouteMatched(this.onRouteMatched, this);
      this.loadStaticDropdownModel();
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
        { key: "Open Service Request", menuPath: "RouteOpenService" },
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
    onPressLogOut: function () {
      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.navTo("RouteLogin");

    },

    loadStaticDropdownModel: function () {
      try {
        const oViewModel = new sap.ui.model.json.JSONModel({
          menu: false,
          notification: false,
          logout: false,
          sideExpanded: false,
          badge: "2"
        });
        this.getView().setModel(oViewModel, 'shellBarModel');
        console.log("Static Dropdown Model initialized:", oViewModel.getData());
      } catch (error) {
        console.error("Error initializing dropdown model:", error);
      }
    },

    onRouteMatched: function (oEvent) {
      try {
        const sRouteName = oEvent.getParameter('name');
        const sHash = window.location.hash;
        console.log({ sHash, sRouteName });
        if (sRouteName === 'RouteLogin') {
          this.handleRouteLoginMenu();
        } else if (sRouteName === 'RouteLanding') {
          this.handleRouteLandingMenu();
        } else {
          this.handleNotificationAndLogout();
        }

      } catch (error) {
        console.log('onRouteMatched Error :', error);
      }
    },
    handleRouteLoginMenu: function () {
      try {
        const viewModel = this.getView().getModel('shellBarModel');
        viewModel.setProperty(`/menu`, false);
        viewModel.setProperty(`/notification`, false);
        viewModel.setProperty(`/logout`, false);
        viewModel.setProperty(`/badge`, "0");
        viewModel.refresh();
      } catch (error) {
        console.log('handleRouteLoginMenu Error :', error);
      }
    },

    

    handleRouteLandingMenu: async function () {
      try {
        let viewModel = this.getView().getModel('shellBarModel');
        viewModel.setProperty('/menu', true);
        viewModel.setProperty('/notification', true);
        viewModel.setProperty('/logout', true);
        viewModel.setProperty(`/badge`, "0");
        viewModel.refresh();
      } catch (error) {
        console.log('handleRouteLandingMenu Error :', error);
      }
    },

    handleNotificationAndLogout: function () {
      try {
        const viewModel = this.getView().getModel('shellBarModel');
        viewModel.setProperty(`/menu`, false);
        viewModel.setProperty(`/notification`, true);
        viewModel.setProperty(`/logout`, true);
        viewModel.setProperty(`/badge`, "0");
        viewModel.refresh();
      } catch (error) {
        console.log('handleNotificationAndLogout Error :', error);
      }
    }


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