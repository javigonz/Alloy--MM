function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function show() {
        Alloy.Globals.ActualContainer = $.viewCustomer;
        Alloy.Globals.ActualSection = "customerService";
        Alloy.Globals.Header.children[0].children[1].text = L("text_17");
        Ti.App.addEventListener("loadSCustomoerService", loadSCustomoerService);
        managment_Data.LoadWebService_CustomerService();
    }
    function loadSCustomoerService() {
        Ti.App.removeEventListener("loadSCustomoerService", loadSCustomoerService);
        $.viewWeb.html = Alloy.Collections.model__CustomerService[3].value;
        Ti.App.fireEvent("closeLoading");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "customerService";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.viewCustomer = Ti.UI.createView({
        width: Alloy.CFG.WidthDeviceAndroid,
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        left: 0,
        id: "viewCustomer"
    });
    $.__views.viewCustomer && $.addTopLevelView($.__views.viewCustomer);
    $.__views.viewWeb = Ti.UI.createWebView({
        width: Ti.UI.FILL,
        top: 0,
        id: "viewWeb",
        enableZoomControls: "false"
    });
    $.__views.viewCustomer.add($.__views.viewWeb);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("managment_View");
    var managment_Data = require("managment_Data");
    show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;