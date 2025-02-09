sap.ui.define([
    "./CoreService",
], function (CoreService) {
    "use strict";

    var WebService = CoreService.extend("project1.service.WebService", {
        getEmployeeMasterAPI: function () {
            const configObject = {
                method: "GET",
                url: '/odata/v4/employee/Employees'
            }
            return this.odata(configObject);
        },
    });
    return new WebService();
});