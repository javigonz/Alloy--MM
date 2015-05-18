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
        Alloy.Globals.ActualSection = "scheduler";
        Alloy.Globals.Header.children[0].children[1].text = L("text_2");
        Ti.App.addEventListener("loadScheduler", loadScheduler);
        managment_Data.LoadWebService_Scheduler();
    }
    function loadScheduler() {
        Ti.App.removeEventListener("loadScheduler", loadScheduler);
        $.viewWeb.html = Alloy.Collections.model__Scheduler[3].value;
        Ti.App.fireEvent("closeLoading");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "scheduler";
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