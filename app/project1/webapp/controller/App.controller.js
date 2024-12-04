sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller) => {
  "use strict";

  return Controller.extend("project1.controller.Fiori", {
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
  });
});