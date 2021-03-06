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
        Alloy.Globals.ActualContainer = $.viewRegulation;
        Alloy.Globals.ActualSection = "regulation";
        Alloy.Globals.Header.children[0].children[1].text = L("text_18");
        Ti.App.addEventListener("loadRegulation", loadRegulation);
        managment_Data.LoadWebService_Regulation();
    }
    function loadRegulation() {
        Ti.App.removeEventListener("loadRegulation", loadRegulation);
        $.viewWeb.html = Alloy.Collections.model__Regulation[3].value;
        Ti.App.fireEvent("closeLoading");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "regulation";
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
    $.__views.viewRegulation = Ti.UI.createView({
        width: Alloy.CFG.WidthDeviceIphone,
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        left: 0,
        id: "viewRegulation"
    });
    $.__views.viewRegulation && $.addTopLevelView($.__views.viewRegulation);
    $.__views.viewWeb = Ti.UI.createWebView({
        left: 10,
        right: 10,
        top: 0,
        id: "viewWeb",
        enableZoomControls: "false"
    });
    $.__views.viewRegulation.add($.__views.viewWeb);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("managment_View");
    var managment_Data = require("managment_Data");
    show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;