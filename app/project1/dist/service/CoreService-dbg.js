sap.ui.define(
    ["sap/ui/base/Object"],
    function (Object) {

        "use strict";
        return Object.extend("project1.service.CoreService", {
            constructor: function () { },
            odata: function ({ method, url, data, username, password }) {
                var json = null;
                if (data != undefined) {
                    json = JSON.stringify(data);
                }
                return new Promise(function (resolve, reject) {
                    sap.ui.core.BusyIndicator.show(0);
                    $.ajax({
                        type: method,
                        url: url,
                        data: json,
                        dataType: "json",
                        force_ssl: false,
                        contentType: "application/json; charset=utf-8",
                        crossDomain: true,
                        async:true,
                        // headers: {
                        //     'Accept':'application/json',
                        // },
                        xhrFields: {
                            withCredentials: true,
                        },
                        cors: [
                            {
                                enabled: false,
                            },
                        ],

                        success: function (data, status, xhr) {
                            sap.ui.core.BusyIndicator.hide();
                            // sap.m.MessageToast.show("Data Saved");
                           // console.log(data);
                            var dict = {
                                "code": xhr.status,
                                "data": data,
                                "status": status
                            }
                            resolve(dict);
                        },
                        error: function (oError) {
                            if (oError['responseJSON']) {
                                var code = oError['responseJSON']['error']['code'];
                                var msg = oError['responseJSON']['error']['message'];
                                sap.ui.core.BusyIndicator.hide();
                                console.log("THERE IS ERROR", oError);
                                var dict = {
                                    "code": code,
                                    "msg": msg
                                }
                                resolve(dict);
                                //reject(msg);
                            }else {
                                sap.ui.core.BusyIndicator.hide();
                            }
                        },
                        timeout: 10000,
                    });
                })
            },
        });
    })