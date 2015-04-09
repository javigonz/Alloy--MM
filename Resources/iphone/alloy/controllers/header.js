function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function handlerMenu() {
        managment_View.handlerMenu();
    }
    function handlerBack() {
        managment_View.closeActualSection();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "header";
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
    var __defers = {};
    $.__views.viewHeader = Ti.UI.createView({
        backgroundColor: Alloy.CFG.GREY3,
        height: Alloy.Globals.Height_Header,
        width: Ti.UI.FILL,
        top: 20,
        id: "viewHeader"
    });
    $.__views.viewHeader && $.addTopLevelView($.__views.viewHeader);
    $.__views.viewLogo = Ti.UI.createView({
        top: 0,
        left: 0,
        width: Alloy.CFG.WidthDeviceIphone,
        id: "viewLogo"
    });
    $.__views.viewHeader.add($.__views.viewLogo);
    $.__views.__alloyId0 = Ti.UI.createImageView({
        left: 0,
        width: 81,
        height: 30,
        image: "/images/logo.png",
        id: "__alloyId0"
    });
    $.__views.viewLogo.add($.__views.__alloyId0);
    handlerMenu ? $.__views.__alloyId0.addEventListener("click", handlerMenu) : __defers["$.__views.__alloyId0!click!handlerMenu"] = true;
    $.__views.id_header_title = Ti.UI.createLabel({
        color: Alloy.CFG.GREEN,
        font: {
            fontFamily: Alloy.CFG.MYRIAD_REGULAR,
            fontSize: 17,
            fontWeight: "normal"
        },
        left: 100,
        id: "id_header_title"
    });
    $.__views.viewLogo.add($.__views.id_header_title);
    $.__views.__alloyId1 = Ti.UI.createView({
        right: 0,
        height: Alloy.Globals.Height_Header,
        width: 50,
        id: "__alloyId1"
    });
    $.__views.viewLogo.add($.__views.__alloyId1);
    handlerBack ? $.__views.__alloyId1.addEventListener("click", handlerBack) : __defers["$.__views.__alloyId1!click!handlerBack"] = true;
    $.__views.id_header_back = Ti.UI.createImageView({
        right: 10,
        height: 35,
        width: 18,
        id: "id_header_back",
        image: "/images/backButton.png"
    });
    $.__views.__alloyId1.add($.__views.id_header_back);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var managment_View = require("managment_View");
    Titanium.UI.createAnimation({
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
        opacity: 1,
        duration: 300,
        left: 250
    });
    Alloy.Globals.Header = $.viewHeader;
    __defers["$.__views.__alloyId0!click!handlerMenu"] && $.__views.__alloyId0.addEventListener("click", handlerMenu);
    __defers["$.__views.__alloyId1!click!handlerBack"] && $.__views.__alloyId1.addEventListener("click", handlerBack);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;