sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","../service/WebService","sap/ui/core/UIComponent"],function(e,t,o,n){let a;"use strict";return e.extend("project1.controller.employeeMasterList",{onRouteMatched:function(e){this.empList()},onInit:function(){a=this;var e=n.getRouterFor(this);e.getRoute("RouteEmpMaster").attachMatched(this.onRouteMatched,this);var t=jQuery.sap.getModulePath("project1","/model/employeeMaster.json");var o=new sap.ui.model.json.JSONModel(t);this.getView().setModel(o,"EmployeeMasterModel")},empList:function(){o.getEmployeeMasterAPI().then(function(e){if(e.code==200){var t=a.getView().getModel("EmployeeMasterModel");if(e.data.value.length>0){t.setData(e.data)}a.getView().setModel(t,"EmployeeMasterModel")}console.log(e)})},getRouter:function(){return sap.ui.core.UIComponent.getRouterFor(this)},onRouterClick:function(){this.getRouter().navTo("RouteEmpMasterAddEdit",{id:encodeURIComponent(0),screenType:"Add"})},navBack:function(){const e=this.getOwnerComponent().getRouter();e.navTo("RouteDashBoard",{},true)},onAction:function(e){var t=e.getSource().getBindingContext("EmployeeMasterModel").getPath();var o=parseInt(t.split("/")[2]);var n=a.getView().getModel("EmployeeMasterModel");var r=n.getData();this.getRouter().navTo("RouteEmpMasterAddEdit",{id:encodeURIComponent(r.value[o].ID),screenType:"edit"})},onDelete:async function(e){var t=e.getSource().getBindingContext("EmployeeMasterModel").getPath();var n=parseInt(t.split("/")[2]);var r=a.getView().getModel("EmployeeMasterModel");var i=r.getData();await o.deleteEmpList(i.value[n].ID).then(function(e){a.empList();console.log(e)})}})});
//# sourceMappingURL=employeeMasterList.controller.js.map