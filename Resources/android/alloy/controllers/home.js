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
        Alloy.Globals.ActualContainer = $.viewHome;
        Alloy.Globals.ActualSection = "home";
        Alloy.Globals.Header.children[0].children[1].text = L("text_1");
        Ti.App.addEventListener("loadAlert", loadAlert);
        managment_Data.LoadWebService_Alert();
        require("managment_Push");
    }
    function loadAlert() {
        Ti.App.removeEventListener("loadAlert", loadAlert);
        $.textAlert.text = Alloy.Collections.model__Alert[3].value;
        $.textAlert.applyProperties(textAlertGreen);
        $.trafficGreen.image = "/images/trafficGreen_on.png";
        Ti.App.fireEvent("closeLoading");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "home";
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
    $.__views.viewHome = Ti.UI.createView({
        width: Alloy.CFG.WidthDeviceAndroid,
        backgroundColor: Alloy.CFG.WHITE,
        backgroundImage: "/images/backgroundHome.png",
        backgroundRepeat: "false",
        top: 0,
        left: 0,
        layout: "vertical",
        id: "viewHome"
    });
    $.__views.viewHome && $.addTopLevelView($.__views.viewHome);
    $.__views.viewRoundedContainerLogo = Ti.UI.createView({
        top: 10,
        width: "100%",
        height: 265,
        id: "viewRoundedContainerLogo"
    });
    $.__views.viewHome.add($.__views.viewRoundedContainerLogo);
    $.__views.__alloyId2 = Ti.UI.createImageView({
        image: "/images/bigLogo.png",
        id: "__alloyId2"
    });
    $.__views.viewRoundedContainerLogo.add($.__views.__alloyId2);
    $.__views.viewRoundedContainerTraffic = Ti.UI.createView({
        top: 10,
        height: 300,
        layout: "vertical",
        id: "viewRoundedContainerTraffic"
    });
    $.__views.viewHome.add($.__views.viewRoundedContainerTraffic);
    $.__views.viewTraffic = Ti.UI.createView({
        width: Alloy.CFG.WidthDeviceAndroid,
        top: 10,
        height: 85,
        layout: "horizontal",
        left: Alloy.CFG.leftTraffic,
        id: "viewTraffic"
    });
    $.__views.viewRoundedContainerTraffic.add($.__views.viewTraffic);
    $.__views.trafficGreen = Ti.UI.createImageView({
        height: 77,
        width: 75,
        right: 10,
        image: "/images/trafficGreen.png",
        id: "trafficGreen"
    });
    $.__views.viewTraffic.add($.__views.trafficGreen);
    $.__views.trafficOrange = Ti.UI.createImageView({
        height: 77,
        width: 75,
        right: 10,
        image: "/images/trafficOrange.png",
        id: "trafficOrange"
    });
    $.__views.viewTraffic.add($.__views.trafficOrange);
    $.__views.trafficRed = Ti.UI.createImageView({
        height: 77,
        width: 75,
        right: 10,
        image: "/images/trafficRed.png",
        id: "trafficRed"
    });
    $.__views.viewTraffic.add($.__views.trafficRed);
    $.__views.textAlert = Ti.UI.createLabel({
        color: Alloy.CFG.BLACK,
        font: {
            fontFamily: Alloy.CFG.MYRIAD_REGULAR,
            fontSize: 15,
            fontWeight: "normal"
        },
        left: 10,
        right: 10,
        textAlign: "center",
        id: "textAlert"
    });
    $.__views.viewRoundedContainerTraffic.add($.__views.textAlert);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("managment_View");
    var managment_Data = require("managment_Data");
    $.createStyle({
        classes: [ "textAlertOrange" ]
    });
    $.createStyle({
        classes: [ "textAlertRed" ]
    });
    var textAlertGreen = $.createStyle({
        classes: [ "textAlertGreen" ]
    });
    show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;