sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller) => {
  "use strict";

  return Controller.extend("project1.controller.Fiori", {
      onInit() {
      },
      onMenuButtonPress: function () {
        const viewModel = this.getView().getModel('shellBarModel');
        const { sideExpanded } = viewModel.getData();
        viewModel.setProperty(`/sideExpanded`, !sideExpanded);
      },
  });
});