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
        Alloy.Globals.ActualContainer = $.viewLines;
        Alloy.Globals.ActualSection = "lines";
        Alloy.Globals.Header.children[0].children[1].text = L("text_4");
        picker_dataOrigen.push(Titanium.UI.createPickerRow({
            title: L("text_23"),
            id: 0
        }));
        picker_dataDestino.push(Titanium.UI.createPickerRow({
            title: L("text_24"),
            id: 0
        }));
        Alloy.Collections.model__MetroStations.result.forEach(function(element) {
            picker_dataOrigen.push(Titanium.UI.createPickerRow({
                title: element.title,
                id: element.id
            }));
            picker_dataDestino.push(Titanium.UI.createPickerRow({
                title: element.title,
                id: element.id
            }));
        });
        $.viewHowArrivedTitle.addEventListener("click", handlerArrivedView);
        loadComboOrigen();
        loadComboDestino();
        Ti.App.fireEvent("closeLoading");
    }
    function loadComboOrigen() {
        var picker;
        var imagen1;
        var pickerStyle = $.createStyle({
            classes: [ "pickerStyle" ]
        });
        var picker = Titanium.UI.createPicker({});
        picker.selectionIndicator = true;
        picker.applyProperties(pickerStyle);
        picker.add(picker_dataOrigen);
        picker.addEventListener("change", function() {
            if (0 !== picker.getSelectedRow(0).id) {
                station_origen = Alloy.Collections.model__MetroStations.result[picker.getSelectedRow(0).id - 1];
                $.textMinutes.text = managment_Timer.timeFromTo(station_origen, station_destino);
            }
        });
        var imagen1 = Ti.UI.createImageView({
            image: "/images/downArrow.png",
            right: 10
        });
        $.comboHowArrivedOrigen.add(imagen1);
        $.comboHowArrivedOrigen.add(picker);
    }
    function loadComboDestino() {
        var picker;
        var imagen1;
        var pickerStyle = $.createStyle({
            classes: [ "pickerStyle" ]
        });
        var picker = Titanium.UI.createPicker({});
        picker.selectionIndicator = true;
        picker.applyProperties(pickerStyle);
        picker.add(picker_dataDestino);
        picker.addEventListener("change", function() {
            if (0 !== picker.getSelectedRow(0).id) {
                station_destino = Alloy.Collections.model__MetroStations.result[picker.getSelectedRow(0).id - 1];
                $.textMinutes.text = managment_Timer.timeFromTo(station_origen, station_destino);
            }
        });
        var imagen1 = Ti.UI.createImageView({
            image: "/images/downArrow.png",
            right: 10
        });
        $.comboHowArrivedDestino.add(imagen1);
        $.comboHowArrivedDestino.add(picker);
    }
    function handlerArrivedView() {
        if ("true" == openArrivedView) {
            openArrivedView = "false";
            $.viewHowArrived.animate(MoveDown_OpacityAndroid);
        } else {
            openArrivedView = "true";
            $.viewHowArrived.animate(MoveUp_Opacity);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "lines";
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
    $.__views.viewLines = Ti.UI.createView({
        width: Alloy.CFG.WidthDeviceAndroid,
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        left: 0,
        id: "viewLines"
    });
    $.__views.viewLines && $.addTopLevelView($.__views.viewLines);
    $.__views.containerLines = Ti.UI.createView({
        id: "containerLines"
    });
    $.__views.viewLines.add($.__views.containerLines);
    $.__views.viewWeb = Ti.UI.createWebView({
        id: "viewWeb",
        url: "/html/lines.html",
        cacheMode: "true",
        enableZoomControls: "true",
        scalesPageToFit: "true"
    });
    $.__views.containerLines.add($.__views.viewWeb);
    $.__views.viewHowArrived = Ti.UI.createView({
        width: Alloy.CFG.WidthDeviceAndroid,
        height: 270,
        bottom: "-215",
        left: 0,
        layout: "vertical",
        id: "viewHowArrived"
    });
    $.__views.viewLines.add($.__views.viewHowArrived);
    $.__views.viewHowArrivedTitle = Ti.UI.createView({
        width: 190,
        height: 40,
        backgroundColor: Alloy.CFG.GREEN,
        left: 0,
        layout: "horizontal",
        id: "viewHowArrivedTitle"
    });
    $.__views.viewHowArrived.add($.__views.viewHowArrivedTitle);
    $.__views.__alloyId14 = Ti.UI.createImageView({
        top: 10,
        width: 24,
        height: 20,
        left: 10,
        image: "/images/menuIcon11.png",
        id: "__alloyId14"
    });
    $.__views.viewHowArrivedTitle.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createLabel({
        color: Alloy.CFG.WHITE,
        font: {
            fontFamily: Alloy.CFG.MYRIAD_REGULAR,
            fontSize: 15,
            fontWeight: "normal"
        },
        left: 10,
        top: 10,
        height: 20,
        text: L("text_25"),
        id: "__alloyId15"
    });
    $.__views.viewHowArrivedTitle.add($.__views.__alloyId15);
    $.__views.viewHowArrivedContainerOrigen = Ti.UI.createView({
        width: Alloy.CFG.WidthDeviceAndroid,
        height: 70,
        backgroundColor: Alloy.CFG.WHITE,
        left: 0,
        id: "viewHowArrivedContainerOrigen"
    });
    $.__views.viewHowArrived.add($.__views.viewHowArrivedContainerOrigen);
    $.__views.comboHowArrivedOrigen = Ti.UI.createView({
        height: 40,
        width: "65%",
        borderColor: Alloy.CFG.GREEN,
        top: 20,
        left: 10,
        paddingLeft: 10,
        color: Alloy.CFG.BLACK,
        borderWidth: "2px",
        backgroundColor: "transparent",
        font: {
            fontFamily: Alloy.CFG.MYRIAD_REGULAR,
            fontSize: 14,
            fontWeight: "normal"
        },
        id: "comboHowArrivedOrigen"
    });
    $.__views.viewHowArrivedContainerOrigen.add($.__views.comboHowArrivedOrigen);
    $.__views.viewHowArrivedContainerDestino = Ti.UI.createView({
        width: Alloy.CFG.WidthDeviceAndroid,
        height: 70,
        backgroundColor: Alloy.CFG.WHITE,
        left: 0,
        id: "viewHowArrivedContainerDestino"
    });
    $.__views.viewHowArrived.add($.__views.viewHowArrivedContainerDestino);
    $.__views.comboHowArrivedDestino = Ti.UI.createView({
        height: 40,
        width: "65%",
        borderColor: Alloy.CFG.GREEN,
        top: 20,
        left: 10,
        paddingLeft: 10,
        color: Alloy.CFG.BLACK,
        borderWidth: "2px",
        backgroundColor: "transparent",
        font: {
            fontFamily: Alloy.CFG.MYRIAD_REGULAR,
            fontSize: 14,
            fontWeight: "normal"
        },
        id: "comboHowArrivedDestino"
    });
    $.__views.viewHowArrivedContainerDestino.add($.__views.comboHowArrivedDestino);
    $.__views.viewContainerTime = Ti.UI.createView({
        height: 65,
        width: 100,
        right: 10,
        top: "-110",
        id: "viewContainerTime"
    });
    $.__views.viewHowArrived.add($.__views.viewContainerTime);
    $.__views.textMinutes = Ti.UI.createLabel({
        color: Alloy.CFG.GREY6,
        font: {
            fontFamily: Alloy.CFG.MYRIAD_REGULAR,
            fontSize: 30,
            fontWeight: "normal"
        },
        bottom: 0,
        right: 0,
        text: "",
        id: "textMinutes"
    });
    $.__views.viewContainerTime.add($.__views.textMinutes);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("managment_View");
    var managment_Timer = require("managment_Timer");
    require("com.animecyc.animator");
    Titanium.Platform.displayCaps.dpi / 160;
    var openArrivedView = "false";
    var picker_dataOrigen = [];
    var picker_dataDestino = [];
    var station_origen = "";
    var station_destino = "";
    var MoveUp_Opacity = Titanium.UI.createAnimation({
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
        duration: 300,
        bottom: "-75"
    });
    var MoveDown_OpacityAndroid = Titanium.UI.createAnimation({
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
        duration: 200,
        bottom: "-215"
    });
    Titanium.UI.createAnimation({
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
        duration: 200,
        bottom: "-210"
    });
    show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;