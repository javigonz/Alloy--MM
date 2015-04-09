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
        if ("android" == Ti.Platform.osname) {
            picker_dataOrigen.push(Titanium.UI.createPickerRow({
                title: L("text_23"),
                id: 0
            }));
            picker_dataDestino.push(Titanium.UI.createPickerRow({
                title: L("text_24"),
                id: 0
            }));
        }
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
        Ti.App.fireEvent("closeLoading");
        "android" === Ti.Platform.osname ? drawableAndroid() : drawableIphone();
        loadComboOrigen();
        loadComboDestino();
    }
    function drawableAndroid() {
        var viewContainerDragable = Draggable.createView({
            left: 0,
            top: 0,
            width: 1e3,
            height: 650,
            backgroundImage: "/images/lineasDeMetro.png"
        });
        $.containerLines.add(viewContainerDragable);
        var calculateWidth1 = Alloy.CFG.WidthDeviceAndroid * Math.floor(1e3 / Alloy.CFG.WidthDeviceAndroid);
        var calculateWidth2 = Alloy.CFG.WidthDeviceAndroid - (1e3 - calculateWidth1);
        var maxHorizontalRight = calculateWidth1 - calculateWidth2;
        var calculateTop1 = Alloy.CFG.HeightDevice * Math.floor(757 / Alloy.CFG.HeightDevice);
        var calculateTop2 = Alloy.CFG.HeightDevice - (757 - calculateTop1);
        var maxVerticalDown = calculateTop1 - calculateTop2;
        viewContainerDragable.addEventListener("end", function(e) {
            e.left > 0 && (this.left = 0);
            e.top > 0 && (this.top = 0);
            if (e.left / capabilities * -1 > maxHorizontalRight && e.top / capabilities * -1 > maxVerticalDown) {
                Ti.API.info("Se sale por abajo y derecha");
                Animator.animate(this, {
                    duration: 300,
                    easing: Animator.EXP_OUT,
                    left: -maxHorizontalRight,
                    top: -maxVerticalDown
                });
            } else {
                if (e.left / capabilities * -1 > maxHorizontalRight) {
                    Ti.API.info("Se sale por derecha");
                    Animator.animate(this, {
                        duration: 300,
                        easing: Animator.EXP_OUT,
                        left: -maxHorizontalRight
                    });
                }
                if (e.top / capabilities * -1 > maxVerticalDown) {
                    Ti.API.info("Se sale por abajo");
                    Animator.animate(this, {
                        duration: 300,
                        easing: Animator.EXP_OUT,
                        top: -maxVerticalDown
                    });
                }
            }
        });
    }
    function drawableIphone() {
        var viewContainerDragable = Draggable.createView({
            left: 0,
            top: 0,
            width: 1e3,
            height: 650,
            backgroundImage: "/images/lineasDeMetro.png"
        });
        $.containerLines.add(viewContainerDragable);
        var calculateWidth1 = Alloy.CFG.WidthDeviceIphone * Math.floor(1e3 / Alloy.CFG.WidthDeviceIphone);
        var calculateWidth2 = Alloy.CFG.WidthDeviceIphone - (1e3 - calculateWidth1);
        var maxHorizontalRight = calculateWidth1 - calculateWidth2;
        var calculateTop1 = Alloy.CFG.HeightDeviceIphone * Math.floor(757 / Alloy.CFG.HeightDeviceIphone);
        var calculateTop2 = Alloy.CFG.HeightDeviceIphone - (757 - calculateTop1);
        var maxVerticalDown = calculateTop1 - calculateTop2;
        viewContainerDragable.addEventListener("end", function(e) {
            e.left > 0 && (this.left = 0);
            e.top > 0 && (this.top = 0);
            if (-1 * e.left > maxHorizontalRight && -1 * e.top > maxVerticalDown) {
                this.left = -maxHorizontalRight;
                this.top = -maxVerticalDown;
            } else {
                if (-1 * e.left > maxHorizontalRight) {
                    this.left = -maxHorizontalRight;
                    this.top = e.top;
                }
                if (-1 * e.top > maxVerticalDown) {
                    this.left = e.left;
                    this.top = -maxVerticalDown;
                }
            }
        });
    }
    function loadComboOrigen() {
        if ("android" === Ti.Platform.osname) {
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
        } else {
            var picker_view = Titanium.UI.createView({
                height: 251,
                bottom: -351
            });
            var cancel = Titanium.UI.createButton({
                title: L("text_20"),
                style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
            });
            var done = Titanium.UI.createButton({
                title: L("text_21"),
                style: Titanium.UI.iPhone.SystemButtonStyle.DONE
            });
            var spacer = Titanium.UI.createButton({
                systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
            });
            var toolbar = Titanium.UI.iOS.createToolbar({
                top: 0,
                items: [ cancel, spacer, done ]
            });
            var picker = Titanium.UI.createPicker({
                top: 43
            });
            picker.selectionIndicator = true;
            picker.add(picker_dataOrigen);
            picker_view.add(toolbar);
            picker_view.add(picker);
            var slide_in = Titanium.UI.createAnimation({
                bottom: 0
            });
            var slide_out = Titanium.UI.createAnimation({
                bottom: -351
            });
            $.comboHowArrivedOrigen.addEventListener("focus", function() {
                picker_view.animate(slide_in);
                $.comboHowArrivedOrigen.blur();
            });
            cancel.addEventListener("click", function() {
                picker_view.animate(slide_out);
            });
            done.addEventListener("click", function() {
                $.comboHowArrivedOrigen.value = picker.getSelectedRow(0).title;
                picker_view.animate(slide_out);
                station_origen = Alloy.Collections.model__MetroStations.result[picker.getSelectedRow(0).id - 1];
                $.textMinutes.text = managment_Timer.timeFromTo(station_origen, station_destino);
            });
            var imagen1 = Ti.UI.createImageView({
                image: "/images/downArrow.png",
                right: 10
            });
            $.comboHowArrivedOrigen.add(imagen1);
            $.viewLines.add(picker_view);
        }
    }
    function loadComboDestino() {
        if ("android" === Ti.Platform.osname) {
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
        } else {
            var picker_view = Titanium.UI.createView({
                height: 251,
                bottom: -351
            });
            var cancel = Titanium.UI.createButton({
                title: L("text_20"),
                style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
            });
            var done = Titanium.UI.createButton({
                title: L("text_21"),
                style: Titanium.UI.iPhone.SystemButtonStyle.DONE
            });
            var spacer = Titanium.UI.createButton({
                systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
            });
            var toolbar = Titanium.UI.iOS.createToolbar({
                top: 0,
                items: [ cancel, spacer, done ]
            });
            var picker = Titanium.UI.createPicker({
                top: 43
            });
            picker.selectionIndicator = true;
            picker.add(picker_dataDestino);
            picker_view.add(toolbar);
            picker_view.add(picker);
            var slide_in = Titanium.UI.createAnimation({
                bottom: 0
            });
            var slide_out = Titanium.UI.createAnimation({
                bottom: -351
            });
            $.comboHowArrivedDestino.addEventListener("focus", function() {
                picker_view.animate(slide_in);
                $.comboHowArrivedDestino.blur();
            });
            cancel.addEventListener("click", function() {
                picker_view.animate(slide_out);
            });
            done.addEventListener("click", function() {
                $.comboHowArrivedDestino.value = picker.getSelectedRow(0).title;
                picker_view.animate(slide_out);
                station_destino = Alloy.Collections.model__MetroStations.result[picker.getSelectedRow(0).id - 1];
                $.textMinutes.text = managment_Timer.timeFromTo(station_origen, station_destino);
            });
            var imagen1 = Ti.UI.createImageView({
                image: "/images/downArrow.png",
                right: 10
            });
            $.comboHowArrivedDestino.add(imagen1);
            $.viewLines.add(picker_view);
        }
    }
    function handlerArrivedView() {
        if ("true" == openArrivedView) {
            openArrivedView = "false";
            $.viewHowArrived.animate("android" === Ti.Platform.osname ? MoveDown_OpacityAndroid : MoveDown_OpacityiPhone);
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
        width: Alloy.CFG.WidthDeviceIphone,
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
    $.__views.viewHowArrived = Ti.UI.createView({
        width: Alloy.CFG.WidthDeviceIphone,
        height: 260,
        bottom: "-210",
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
    $.__views.__alloyId15 = Ti.UI.createImageView({
        top: 10,
        width: 24,
        height: 20,
        left: 10,
        image: "/images/menuIcon11.png",
        id: "__alloyId15"
    });
    $.__views.viewHowArrivedTitle.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createLabel({
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
        id: "__alloyId16"
    });
    $.__views.viewHowArrivedTitle.add($.__views.__alloyId16);
    $.__views.viewHowArrivedContainerOrigen = Ti.UI.createView({
        width: Alloy.CFG.WidthDeviceIphone,
        height: 70,
        backgroundColor: Alloy.CFG.WHITE,
        left: 0,
        id: "viewHowArrivedContainerOrigen"
    });
    $.__views.viewHowArrived.add($.__views.viewHowArrivedContainerOrigen);
    $.__views.comboHowArrivedOrigen = Ti.UI.createTextField({
        height: 40,
        width: "65%",
        left: 10,
        backgroundColor: Alloy.CFG.WHITE,
        borderColor: Alloy.CFG.GREEN,
        top: 20,
        paddingLeft: 10,
        color: Alloy.CFG.BLACK,
        font: {
            fontFamily: Alloy.CFG.MYRIAD_REGULAR,
            fontSize: 15,
            fontWeight: "normal"
        },
        touchEnabled: true,
        id: "comboHowArrivedOrigen",
        hintText: L("text_23")
    });
    $.__views.viewHowArrivedContainerOrigen.add($.__views.comboHowArrivedOrigen);
    $.__views.viewHowArrivedContainerDestino = Ti.UI.createView({
        width: Alloy.CFG.WidthDeviceIphone,
        height: 70,
        backgroundColor: Alloy.CFG.WHITE,
        left: 0,
        id: "viewHowArrivedContainerDestino"
    });
    $.__views.viewHowArrived.add($.__views.viewHowArrivedContainerDestino);
    $.__views.comboHowArrivedDestino = Ti.UI.createTextField({
        height: 40,
        width: "65%",
        left: 10,
        backgroundColor: Alloy.CFG.WHITE,
        borderColor: Alloy.CFG.GREEN,
        top: 20,
        paddingLeft: 10,
        color: Alloy.CFG.BLACK,
        font: {
            fontFamily: Alloy.CFG.MYRIAD_REGULAR,
            fontSize: 15,
            fontWeight: "normal"
        },
        touchEnabled: true,
        id: "comboHowArrivedDestino",
        hintText: L("text_24")
    });
    $.__views.viewHowArrivedContainerDestino.add($.__views.comboHowArrivedDestino);
    $.__views.viewContainerTime = Ti.UI.createView({
        height: 60,
        width: 90,
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
    var Draggable = require("ti.draggable");
    if ("android" === Ti.Platform.osname) var Animator = require("com.animecyc.animator");
    var capabilities = Titanium.Platform.displayCaps.dpi / 160;
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
    var MoveDown_OpacityiPhone = Titanium.UI.createAnimation({
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
        duration: 200,
        bottom: "-210"
    });
    show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;