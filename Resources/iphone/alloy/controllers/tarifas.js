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
        Alloy.Globals.ActualContainer = $.viewScheduler;
        Alloy.Globals.ActualSection = "tarifas";
        Alloy.Globals.Header.children[0].children[1].text = L("text_30");
        Ti.App.addEventListener("loadTarifas", loadTarifas);
        managment_Data.LoadWebService_Tarifas();
    }
    function loadTarifas() {
        Ti.App.removeEventListener("loadTarifas", loadTarifas);
        $.viewWeb.html = Alloy.Collections.model__Tarifas[3].value;
        Ti.App.fireEvent("closeLoading");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tarifas";
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
    $.__views.viewScheduler = Ti.UI.createView({
        width: Alloy.CFG.WidthDeviceIphone,
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        left: 0,
        id: "viewScheduler"
    });
    $.__views.viewScheduler && $.addTopLevelView($.__views.viewScheduler);
    $.__views.viewWeb = Ti.UI.createWebView({
        top: 0,
        id: "viewWeb",
        enableZoomControls: "false"
    });
    $.__views.viewScheduler.add($.__views.viewWeb);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("managment_View");
    var managment_Data = require("managment_Data");
    show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;