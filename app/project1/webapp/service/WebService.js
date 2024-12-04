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
        getViewEmployeeAPI: function (id) {
            const configObject = {
                method: "GET",
                url: `/odata/v4/employee/Employees/${id}`
            }
            return this.odata(configObject);
        },
        postEmployee: function (oData) {
            const configObject = {
                method: "POST",
                url: '/odata/v4/employee/Employees?$orderby=ID desc',
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
        
        getDeptMasterAPI: function () {
            const configObject = {
                method: "GET",
                url: '/odata/v4/employee/MDepartment'
            }
            return this.odata(configObject);
        },
        getViewDeptAPI: function (id) {
            const configObject = {
                method: "GET",
                url: `/odata/v4/employee/MDepartment/${id}`
            }
            return this.odata(configObject);
        },
        postDept: function (oData) {
            const configObject = {
                method: "POST",
                url: '/odata/v4/employee/MDepartment?$orderby=ID desc',
                data: oData
            }
            return this.odata(configObject);
        },
        updateDept: function (oData, id) {
            const configObject = {
                method: "PATCH",
                url: `/odata/v4/employee/MDepartment(${id})`,
                data: oData
            }
            return this.odata(configObject);
        },
        getDashBoardAPI: function () {
            const configObject = {
                method: "GET",
                url: '/odata/v4/employee/Employees'
            }
            return this.odata(configObject);
        },
        getUserListAPI: function () {
            const configObject = {
                method: "GET",
                url: '/odata/v4/employee/MUser'
            }
            return this.odata(configObject);
        },
        deleteEmpList:function(id){
            const configObject = {
                method: "DELETE",
                url: `/odata/v4/employee/Employees/${id}`
            }
            return this.odata(configObject);
        }
    });
    return new WebService();
});