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
        var widthButton;
        var widthButton = 90 * Alloy.CFG.WidthDeviceAndroid / 100 / 4;
        $.MenuView1.width = widthButton;
        $.MenuView2.width = widthButton;
        $.MenuView3.width = widthButton;
        $.MenuView4.width = widthButton;
        Alloy.Globals.Header.children[0].children[1].text = L("text_1");
        Ti.App.fireEvent("closeLoading");
        require("managment_Push");
    }
    function eventHandler_Press() {
        managment_View.OpenSectionParam("press", [], "", Alloy.Globals.ActualContainer);
    }
    function eventHandler_Scheduler() {
        managment_View.OpenSectionParam("scheduler", [], "", Alloy.Globals.ActualContainer);
    }
    function eventHandler_Lines() {
        managment_View.OpenSectionParam("lines", [], "", Alloy.Globals.ActualContainer);
    }
    function eventHandler_Map() {
        managment_View.OpenSectionParam("map", [], "", Alloy.Globals.ActualContainer);
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
    var __defers = {};
    $.__views.viewHome = Ti.UI.createView({
        width: Alloy.CFG.WidthDeviceAndroid,
        backgroundImage: "/images/backgroundHome.png",
        backgroundRepeat: "true",
        top: 0,
        left: 0,
        layout: "vertical",
        id: "viewHome"
    });
    $.__views.viewHome && $.addTopLevelView($.__views.viewHome);
    $.__views.viewRoundedContainer1 = Ti.UI.createView({
        top: 20,
        width: "100%",
        height: 130,
        id: "viewRoundedContainer1"
    });
    $.__views.viewHome.add($.__views.viewRoundedContainer1);
    $.__views.viewRoundedShadow1 = Ti.UI.createView({
        borderRadius: 5,
        borderWidth: 5,
        borderColor: Alloy.CFG.BLACK,
        backgroundColor: Alloy.CFG.BLACK,
        width: "90%",
        opacity: .2,
        height: 125,
        top: 0,
        id: "viewRoundedShadow1"
    });
    $.__views.viewRoundedContainer1.add($.__views.viewRoundedShadow1);
    $.__views.viewRounded1 = Ti.UI.createView({
        borderRadius: 5,
        borderWidth: 5,
        borderColor: Alloy.CFG.WHITE,
        backgroundColor: Alloy.CFG.WHITE,
        width: "90%",
        height: 120,
        top: 0,
        id: "viewRounded1"
    });
    $.__views.viewRoundedContainer1.add($.__views.viewRounded1);
    $.__views.__alloyId2 = Ti.UI.createImageView({
        height: 55,
        image: "/images/logoHome.png",
        id: "__alloyId2"
    });
    $.__views.viewRounded1.add($.__views.__alloyId2);
    $.__views.viewRoundedContainer2 = Ti.UI.createView({
        top: 20,
        width: "100%",
        height: 130,
        id: "viewRoundedContainer2"
    });
    $.__views.viewHome.add($.__views.viewRoundedContainer2);
    $.__views.viewRoundedShadow2 = Ti.UI.createView({
        borderRadius: 5,
        borderWidth: 5,
        borderColor: Alloy.CFG.BLACK,
        backgroundColor: Alloy.CFG.BLACK,
        width: "90%",
        opacity: .2,
        height: 125,
        top: 0,
        id: "viewRoundedShadow2"
    });
    $.__views.viewRoundedContainer2.add($.__views.viewRoundedShadow2);
    $.__views.viewRounded2 = Ti.UI.createView({
        borderRadius: 5,
        borderWidth: 5,
        borderColor: Alloy.CFG.WHITE,
        backgroundColor: Alloy.CFG.WHITE,
        width: "90%",
        height: 120,
        top: 0,
        id: "viewRounded2"
    });
    $.__views.viewRoundedContainer2.add($.__views.viewRounded2);
    $.__views.viewFooter = Ti.UI.createView({
        height: 90,
        layout: "horizontal",
        id: "viewFooter"
    });
    $.__views.viewRounded2.add($.__views.viewFooter);
    $.__views.MenuView1 = Ti.UI.createView({
        height: 90,
        id: "MenuView1"
    });
    $.__views.viewFooter.add($.__views.MenuView1);
    eventHandler_Scheduler ? $.__views.MenuView1.addEventListener("click", eventHandler_Scheduler) : __defers["$.__views.MenuView1!click!eventHandler_Scheduler"] = true;
    $.__views.__alloyId3 = Ti.UI.createLabel({
        color: Alloy.CFG.GREY5,
        font: {
            fontFamily: Alloy.CFG.MYRIAD_REGULAR,
            fontSize: 13,
            fontWeight: "normal"
        },
        bottom: 5,
        textAlign: "center",
        text: L("text_10").toUpperCase(),
        id: "__alloyId3"
    });
    $.__views.MenuView1.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createImageView({
        top: 10,
        width: 45,
        height: 45,
        image: "/images/homeIcon1.png",
        id: "__alloyId4"
    });
    $.__views.MenuView1.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createView({
        top: 0,
        right: 0,
        backgroundColor: Alloy.CFG.GREY5,
        width: 1,
        height: 125,
        id: "__alloyId5"
    });
    $.__views.MenuView1.add($.__views.__alloyId5);
    $.__views.MenuView2 = Ti.UI.createView({
        height: 90,
        id: "MenuView2"
    });
    $.__views.viewFooter.add($.__views.MenuView2);
    eventHandler_Press ? $.__views.MenuView2.addEventListener("click", eventHandler_Press) : __defers["$.__views.MenuView2!click!eventHandler_Press"] = true;
    $.__views.__alloyId6 = Ti.UI.createLabel({
        color: Alloy.CFG.GREY5,
        font: {
            fontFamily: Alloy.CFG.MYRIAD_REGULAR,
            fontSize: 13,
            fontWeight: "normal"
        },
        bottom: 5,
        textAlign: "center",
        text: L("text_11").toUpperCase(),
        id: "__alloyId6"
    });
    $.__views.MenuView2.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createImageView({
        top: 10,
        width: 42,
        height: 42,
        image: "/images/homeIcon2.png",
        id: "__alloyId7"
    });
    $.__views.MenuView2.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createView({
        top: 0,
        right: 0,
        backgroundColor: Alloy.CFG.GREY5,
        width: 1,
        height: 125,
        id: "__alloyId8"
    });
    $.__views.MenuView2.add($.__views.__alloyId8);
    $.__views.MenuView3 = Ti.UI.createView({
        height: 90,
        id: "MenuView3"
    });
    $.__views.viewFooter.add($.__views.MenuView3);
    eventHandler_Lines ? $.__views.MenuView3.addEventListener("click", eventHandler_Lines) : __defers["$.__views.MenuView3!click!eventHandler_Lines"] = true;
    $.__views.__alloyId9 = Ti.UI.createLabel({
        color: Alloy.CFG.GREY5,
        font: {
            fontFamily: Alloy.CFG.MYRIAD_REGULAR,
            fontSize: 13,
            fontWeight: "normal"
        },
        bottom: 5,
        textAlign: "center",
        text: L("text_12").toUpperCase(),
        id: "__alloyId9"
    });
    $.__views.MenuView3.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createImageView({
        top: 10,
        width: 45,
        height: 38,
        image: "/images/homeIcon3.png",
        id: "__alloyId10"
    });
    $.__views.MenuView3.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createView({
        top: 0,
        right: 0,
        backgroundColor: Alloy.CFG.GREY5,
        width: 1,
        height: 125,
        id: "__alloyId11"
    });
    $.__views.MenuView3.add($.__views.__alloyId11);
    $.__views.MenuView4 = Ti.UI.createView({
        height: 90,
        id: "MenuView4"
    });
    $.__views.viewFooter.add($.__views.MenuView4);
    eventHandler_Map ? $.__views.MenuView4.addEventListener("click", eventHandler_Map) : __defers["$.__views.MenuView4!click!eventHandler_Map"] = true;
    $.__views.__alloyId12 = Ti.UI.createLabel({
        color: Alloy.CFG.GREY5,
        font: {
            fontFamily: Alloy.CFG.MYRIAD_REGULAR,
            fontSize: 13,
            fontWeight: "normal"
        },
        bottom: 5,
        textAlign: "center",
        text: L("text_13").toUpperCase(),
        id: "__alloyId12"
    });
    $.__views.MenuView4.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createImageView({
        top: 10,
        width: 45,
        height: 45,
        image: "/images/homeIcon4.png",
        id: "__alloyId13"
    });
    $.__views.MenuView4.add($.__views.__alloyId13);
    $.__views.viewRoundedContainer3 = Ti.UI.createView({
        top: 20,
        width: "100%",
        height: 130,
        id: "viewRoundedContainer3"
    });
    $.__views.viewHome.add($.__views.viewRoundedContainer3);
    $.__views.viewRoundedShadow3 = Ti.UI.createView({
        borderRadius: 5,
        borderWidth: 5,
        borderColor: Alloy.CFG.BLACK,
        backgroundColor: Alloy.CFG.BLACK,
        width: "90%",
        opacity: .2,
        height: 125,
        top: 0,
        id: "viewRoundedShadow3"
    });
    $.__views.viewRoundedContainer3.add($.__views.viewRoundedShadow3);
    $.__views.viewRounded3 = Ti.UI.createView({
        borderRadius: 5,
        borderWidth: 5,
        borderColor: Alloy.CFG.WHITE,
        backgroundColor: Alloy.CFG.WHITE,
        width: "90%",
        height: 120,
        top: 0,
        id: "viewRounded3"
    });
    $.__views.viewRoundedContainer3.add($.__views.viewRounded3);
    $.__views.__alloyId14 = Ti.UI.createLabel({
        color: Alloy.CFG.BLACK,
        font: {
            fontFamily: Alloy.CFG.MYRIAD_REGULAR,
            fontSize: 14,
            fontWeight: "normal"
        },
        left: 10,
        right: 10,
        textAlign: "center",
        text: "Vaya en metro a ver el Unicaja Baloncesto. Próximo jueves, 11 de diciembre, trenes cada 7  minutos y medio hasta el inicio del partido. ",
        id: "__alloyId14"
    });
    $.__views.viewRounded3.add($.__views.__alloyId14);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var managment_View = require("managment_View");
    show();
    __defers["$.__views.MenuView1!click!eventHandler_Scheduler"] && $.__views.MenuView1.addEventListener("click", eventHandler_Scheduler);
    __defers["$.__views.MenuView2!click!eventHandler_Press"] && $.__views.MenuView2.addEventListener("click", eventHandler_Press);
    __defers["$.__views.MenuView3!click!eventHandler_Lines"] && $.__views.MenuView3.addEventListener("click", eventHandler_Lines);
    __defers["$.__views.MenuView4!click!eventHandler_Map"] && $.__views.MenuView4.addEventListener("click", eventHandler_Map);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;