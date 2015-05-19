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
        Alloy.CFG.HeightDeviceIphone <= 480 && "iphone" == Ti.Platform.osname && ($.viewRoundedContainerLogo.height = 200);
        $.scrollableHomeSlider.height = "iphone" === Ti.Platform.osname ? Ti.Platform.displayCaps.platformHeight - 130 : Titanium.Platform.displayCaps.dpi <= 240 ? Alloy.CFG.HeightDevice - 135 : Alloy.CFG.HeightDevice - 50;
        Ti.App.addEventListener("loadAlert", loadAlert);
        managment_Data.LoadWebService_Alert();
        require("managment_Push");
    }
    function loadAlert() {
        Ti.App.removeEventListener("loadAlert", loadAlert);
        if ("0" == Alloy.Collections.model__Alert[4].value) $.viewRoundedContainerTraffic.visible = "false"; else {
            $.viewRoundedContainerTraffic.visible = "true";
            $.textAlert.text = Alloy.Collections.model__Alert[3].value;
            switch (Alloy.Collections.model__Alert[5].value) {
              case "Verde":
                $.textAlert.applyProperties(textAlertGreen);
                $.viewAlert.applyProperties(viewAlertGreen);
                $.trafficGreen.image = "/images/trafficGreen_on.png";
                break;

              case "ambar":
                $.textAlert.applyProperties(textAlertOrange);
                $.viewAlert.applyProperties(viewAlertOrange);
                $.trafficOrange.image = "/images/trafficOrange_on.png";
                break;

              case "Rojo":
                $.textAlert.applyProperties(textAlertRed);
                $.viewAlert.applyProperties(viewAlertRed);
                $.trafficRed.image = "/images/trafficRed_on.png";
                break;

              case "Ninguno":
                $.textAlert.applyProperties(textAlert);
                $.viewAlert.applyProperties(viewAlert);
                $.trafficRed.image = "/images/trafficRed.png";
                $.trafficOrange.image = "/images/trafficOrange.png";
                $.trafficGreen.image = "/images/trafficGreen.png";
            }
        }
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
        height: Ti.UI.FILL,
        backgroundColor: Alloy.CFG.WHITE,
        backgroundImage: "/images/backgroundHome.png",
        backgroundRepeat: "false",
        top: 0,
        left: 0,
        layout: "vertical",
        id: "viewHome"
    });
    $.__views.viewHome && $.addTopLevelView($.__views.viewHome);
    $.__views.scrollableHomeSlider = Ti.UI.createScrollView({
        height: Ti.UI.FILL,
        contentWidth: Ti.UI.SIZE,
        showVerticalScrollIndicator: "true",
        scrollType: "vertical",
        width: 480,
        verticalBounce: "false",
        layout: "vertical",
        showPagingControl: "false",
        id: "scrollableHomeSlider"
    });
    $.__views.viewHome.add($.__views.scrollableHomeSlider);
    $.__views.viewRoundedContainerLogo = Ti.UI.createView({
        top: 0,
        height: 265,
        id: "viewRoundedContainerLogo"
    });
    $.__views.scrollableHomeSlider.add($.__views.viewRoundedContainerLogo);
    $.__views.__alloyId2 = Ti.UI.createImageView({
        image: "/images/bigLogo.png",
        id: "__alloyId2"
    });
    $.__views.viewRoundedContainerLogo.add($.__views.__alloyId2);
    $.__views.viewRoundedContainerTraffic = Ti.UI.createView({
        top: 10,
        layout: "vertical",
        width: 480,
        height: 180,
        id: "viewRoundedContainerTraffic",
        visible: "false"
    });
    $.__views.scrollableHomeSlider.add($.__views.viewRoundedContainerTraffic);
    $.__views.viewTraffic = Ti.UI.createView({
        left: Alloy.CFG.leftTrafficIphone,
        top: 10,
        height: 85,
        layout: "horizontal",
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
    $.__views.viewAlert = Ti.UI.createView({
        textAlign: "center",
        borderRadius: 5,
        width: 300,
        id: "viewAlert"
    });
    $.__views.viewRoundedContainerTraffic.add($.__views.viewAlert);
    $.__views.textAlert = Ti.UI.createLabel({
        color: Alloy.CFG.BLACK,
        font: {
            fontFamily: Alloy.CFG.MYRIAD_REGULAR,
            fontSize: 16,
            fontWeight: "bold"
        },
        textAlign: "center",
        top: 10,
        bottom: 10,
        id: "textAlert"
    });
    $.__views.viewAlert.add($.__views.textAlert);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("managment_View");
    var managment_Data = require("managment_Data");
    var textAlertOrange = $.createStyle({
        classes: [ "textAlertOrange" ]
    });
    var textAlertRed = $.createStyle({
        classes: [ "textAlertRed" ]
    });
    var textAlertGreen = $.createStyle({
        classes: [ "textAlertGreen" ]
    });
    var textAlert = $.createStyle({
        classes: [ "textAlert" ]
    });
    var viewAlert = $.createStyle({
        classes: [ "viewAlert" ]
    });
    var viewAlertGreen = $.createStyle({
        classes: [ "viewAlertGreen" ]
    });
    var viewAlertOrange = $.createStyle({
        classes: [ "viewAlertOrange" ]
    });
    var viewAlertRed = $.createStyle({
        classes: [ "viewAlertRed" ]
    });
    show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;