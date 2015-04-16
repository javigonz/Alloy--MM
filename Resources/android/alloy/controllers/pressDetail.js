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
        Alloy.Globals.ActualContainer = $.viewPressDetail;
        Alloy.Globals.ActualSection = "press";
        Alloy.Globals.Header.children[0].children[1].text = L("text_6");
        Ti.App.addEventListener("loadNew", loadNew);
        managment_Data.LoadWebService_New(data[0][0].id);
    }
    function loadNew() {
        Ti.App.removeEventListener("loadNew", loadNew);
        if ("ok" == Alloy.Collections.model__New.code) {
            $.viewWeb.html = Alloy.Collections.model__New.result.descripcion;
            console.log(Alloy.Collections.model__New.result.descripcion);
        } else managment_View.OpenInfoWindow(L("text_27"));
        Ti.App.fireEvent("closeLoading");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "pressDetail";
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
    $.__views.viewPressDetail = Ti.UI.createView({
        width: Alloy.CFG.WidthDeviceAndroid,
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        left: 0,
        id: "viewPressDetail"
    });
    $.__views.viewPressDetail && $.addTopLevelView($.__views.viewPressDetail);
    $.__views.viewWeb = Ti.UI.createWebView({
        width: Ti.UI.FILL,
        top: 0,
        id: "viewWeb",
        cacheMode: "true",
        enableZoomControls: "false"
    });
    $.__views.viewPressDetail.add($.__views.viewWeb);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var managment_View = require("managment_View");
    var managment_Data = require("managment_Data");
    var args = arguments[0] || {};
    var data = [];
    data = args;
    show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;