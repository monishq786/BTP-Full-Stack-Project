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
        postEmployee: function (oData) {
            const configObject = {
                method: "POST",
                url: '/odata/v4/employee/Employees',
                data: oData
            }
            return this.odata(configObject);
        },
        updateEmployee: function (oData, id) {
            const configObject = {
                method: "PATCH",
                url: `/odata/v4/employee/Employees(${id})`,
                data: oData
            }
            return this.odata(configObject);
        },
    });
    return new WebService();
});