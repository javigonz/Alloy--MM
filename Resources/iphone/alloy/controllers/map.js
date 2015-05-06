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
        Alloy.Globals.ActualContainer = $.viewMap;
        Alloy.Globals.ActualSection = "map";
        Alloy.Globals.Header.children[0].children[1].text = L("text_7");
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
        if ("iphone" === Ti.Platform.osname) {
            Ti.API.info("UserLocation: " + userLocation);
            Ti.API.info("UserLocation Global: " + Alloy.Globals.UserLocation);
            createMapModule();
        } else {
            var rc = MapModule.isGooglePlayServicesAvailable();
            switch (rc) {
              case MapModule.SUCCESS:
                Ti.API.info("Google Play services is installed.");
                Ti.API.info("UserLocation: " + userLocation);
                Ti.API.info("UserLocation Global: " + Alloy.Globals.UserLocation);
                createMapModule();
                break;

              case MapModule.SERVICE_MISSING:
                Ti.API.info("SERVICE MISSING");
                Ti.App.fireEvent("closeLoading");
                break;

              case MapModule.SERVICE_VERSION_UPDATE_REQUIRED:
                Ti.API.info("SERVICE_VERSION_UPDATE_REQUIRED");
                Ti.App.fireEvent("closeLoading");
                break;

              case MapModule.SERVICE_DISABLED:
                Ti.API.info("SERVICE_DISABLED");
                Ti.App.fireEvent("closeLoading");
                break;

              case MapModule.SERVICE_INVALID:
                Ti.API.info("SERVICE_INVALID");
                Ti.App.fireEvent("closeLoading");
                break;

              default:
                Ti.API.info("DEFAULT");
                Ti.App.fireEvent("closeLoading");
            }
        }
    }
    function createMapModule() {
        var metroStations = [];
        "android" === Ti.Platform.osname && picker_data.push(Titanium.UI.createPickerRow({
            title: L("text_22"),
            latitude: "36.712666",
            longitude: "-4.431597"
        }));
        Alloy.Collections.model__MetroStations.result.forEach(function(element) {
            var station = MapModule.createAnnotation({
                latitude: element.latitude,
                longitude: element.longitude,
                image: "/images/pinStation.png",
                title: element.title,
                subtitle: L("text_26") + " " + element.line,
                myid: element.id,
                rightButton: "/images/iconRoute.png"
            });
            metroStations.push(station);
            picker_data.push(Titanium.UI.createPickerRow({
                title: element.title,
                latitude: element.latitude,
                longitude: element.longitude
            }));
        });
        map = MapModule.createView({
            mapType: MapModule.NORMAL_TYPE,
            region: {
                latitude: 36.712666,
                longitude: -4.431597,
                latitudeDelta: .2,
                longitudeDelta: .2
            },
            userLocation: true,
            animate: true,
            pitchEnabled: true,
            rotateEnabled: true,
            showsBuildings: true,
            showsPointsOfInterest: false,
            annotations: metroStations
        });
        if ("android" === Ti.Platform.osname) {
            {
                Ti.Geolocation.Android.createLocationProvider({
                    name: Ti.Geolocation.PROVIDER_GPS,
                    minUpdateDistance: 0,
                    minUpdateTime: 0
                });
            }
            {
                Ti.Geolocation.Android.createLocationRule({
                    provider: Ti.Geolocation.PROVIDER_GPS,
                    minAge: 1e4
                });
            }
            var locationAdded = false;
            var locationCallback = function(e) {
                if (!e.success || e.error) {
                    console.log("error:" + JSON.stringify(e.error));
                    return;
                }
                var longitude = e.coords.longitude;
                var latitude = e.coords.latitude;
                e.coords.altitude;
                e.coords.heading;
                var accuracy = e.coords.accuracy;
                e.coords.speed;
                var timestamp = e.coords.timestamp;
                e.coords.altitudeAccuracy;
                Titanium.Geolocation.reverseGeocoder(latitude, longitude, function(evt) {
                    if (evt.success) {
                        var places = evt.places;
                        console.log(places);
                    }
                });
                locationAdded = true;
                Titanium.API.info("geo - location updated: " + new Date(timestamp) + " long " + longitude + " lat " + latitude + " accuracy " + accuracy);
                userLocation = latitude + "," + longitude;
                Alloy.Globals.UserLocation = userLocation;
                var regionUser = {
                    latitude: latitude,
                    longitude: longitude,
                    animate: true,
                    latitudeDelta: .1,
                    longitudeDelta: .1
                };
                map.setLocation(regionUser);
            };
            Ti.Android.currentActivity.addEventListener("pause", function() {
                Ti.API.info("pause event received");
                if (locationAdded) {
                    Ti.API.info("removing location callback on pause");
                    Titanium.Geolocation.removeEventListener("location", locationCallback);
                    locationAdded = false;
                }
            });
            Ti.Android.currentActivity.addEventListener("destroy", function() {
                Ti.API.info("destroy event received");
                if (locationAdded) {
                    Ti.API.info("removing location callback on destroy");
                    Titanium.Geolocation.removeEventListener("location", locationCallback);
                    locationAdded = false;
                }
            });
            Ti.Android.currentActivity.addEventListener("resume", function() {
                Ti.API.info("resume event received");
                if (!locationAdded && locationCallback) {
                    Ti.API.info("adding location callback on resume");
                    Titanium.Geolocation.addEventListener("location", locationCallback);
                    locationAdded = true;
                }
            });
        }
        "android" === Ti.Platform.osname ? Titanium.Geolocation.addEventListener("location", locationCallback) : currentLocationIphone();
        map.addEventListener("complete", function() {
            createDrawLine();
            $.viewHowArrivedTitle.addEventListener("click", handlerArrivedView);
            loadComboOrigen();
            loadComboDestino();
            Ti.App.fireEvent("closeLoading");
        });
        map.addEventListener("click", function(evt) {
            Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
            if ("rightButton" == evt.clicksource || "rightPane" == evt.clicksource) {
                var URL = "https://www.google.es/maps/dir/Mi+ubicación/" + evt.annotation.latitude + "," + evt.annotation.longitude + "/@" + userLocation;
                Titanium.Platform.openURL(URL);
            }
        });
        $.viewGoogleMap.add(map);
    }
    function currentLocationIphone() {
        Ti.API.info("consiguiendo la posicion del ususario ...");
        Ti.Geolocation.addEventListener("authorization", function(e) {
            Ti.API.info("authorization event:" + JSON.stringify(e));
        });
        if (Ti.Geolocation.locationServicesEnabled) {
            Titanium.Geolocation.purpose = "Get Current Location";
            Titanium.Geolocation.getCurrentPosition(function(e) {
                if (e.error) {
                    Ti.API.error("Error: " + e.error);
                    managment_View.OpenInfoWindow(L("text_29"));
                } else {
                    var regionUser = {
                        latitude: e.coords.latitude,
                        longitude: e.coords.longitude,
                        animate: true,
                        latitudeDelta: .2,
                        longitudeDelta: .2
                    };
                    userLocation = e.coords.latitude + "," + e.coords.longitude;
                    Alloy.Globals.UserLocation = userLocation;
                    Ti.API.info("Localizacion Usuario conseguida: " + userLocation);
                    map.setLocation(regionUser);
                }
            });
        } else managment_View.OpenInfoWindow(L("text_28"));
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
                    var routes = managment_route.createRoute(station_origen, station_destino);
                    console.log(station_origen.title);
                    console.log(station_destino.title);
                    console.log(routes);
                    if (0 !== routes.length) {
                        "" !== lastRoute && map.removeRoute(lastRoute);
                        var route = MapModule.createRoute({
                            name: "",
                            points: routes,
                            color: "#009000",
                            width: 10,
                            region: "es"
                        });
                        lastRoute = route;
                        map.addRoute(route);
                    }
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
                var routes = managment_route.createRoute(station_origen, station_destino);
                console.log(station_origen.title);
                console.log(station_destino.title);
                console.log(routes);
                if (0 !== routes.length) {
                    "" !== lastRoute && map.removeRoute(lastRoute);
                    var route = MapModule.createRoute({
                        name: "",
                        points: routes,
                        color: "#009000",
                        width: 10,
                        region: "es"
                    });
                    lastRoute = route;
                    map.addRoute(route);
                }
            });
            var imagen1 = Ti.UI.createImageView({
                image: "/images/downArrow.png",
                right: 10
            });
            $.comboHowArrivedOrigen.add(imagen1);
            $.viewMap.add(picker_view);
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
                    var routes = managment_route.createRoute(station_origen, station_destino);
                    console.log(station_origen.title);
                    console.log(station_destino.title);
                    console.log(routes);
                    if (0 !== routes.length) {
                        "" !== lastRoute && map.removeRoute(lastRoute);
                        var route = MapModule.createRoute({
                            name: "",
                            points: routes,
                            color: "#009000",
                            width: 10,
                            region: "es"
                        });
                        lastRoute = route;
                        map.addRoute(route);
                    }
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
                var routes = managment_route.createRoute(station_origen, station_destino);
                console.log(station_origen.title);
                console.log(station_destino.title);
                console.log(routes);
                if (0 !== routes.length) {
                    "" !== lastRoute && map.removeRoute(lastRoute);
                    var route = MapModule.createRoute({
                        name: "",
                        points: routes,
                        color: "#009000",
                        width: 10,
                        region: "es"
                    });
                    lastRoute = route;
                    map.addRoute(route);
                }
            });
            var imagen1 = Ti.UI.createImageView({
                image: "/images/downArrow.png",
                right: 10
            });
            $.comboHowArrivedDestino.add(imagen1);
            $.viewMap.add(picker_view);
        }
    }
    function createDrawLine() {
        var drawLines1 = [];
        var drawLines2 = [];
        Alloy.Collections.model__MetroStations.result.forEach(function(element) {
            if (element.line.length > 1) {
                drawLines1.push({
                    latitude: element.latitude,
                    longitude: element.longitude
                });
                drawLines2.push({
                    latitude: element.latitude,
                    longitude: element.longitude
                });
            } else "1" == element.line[0] ? drawLines1.push({
                latitude: element.latitude,
                longitude: element.longitude
            }) : drawLines2.push({
                latitude: element.latitude,
                longitude: element.longitude
            });
        });
        var route1 = MapModule.createRoute({
            name: "",
            points: drawLines1,
            color: "#50FF0000",
            width: 10,
            region: "es"
        });
        map.addRoute(route1);
        var route2 = MapModule.createRoute({
            name: "",
            points: drawLines2,
            color: "#50003bc0",
            width: 10,
            region: "es"
        });
        map.addRoute(route2);
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
    this.__controllerPath = "map";
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
    $.__views.viewMap = Ti.UI.createView({
        width: Alloy.CFG.WidthDeviceIphone,
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        left: 0,
        id: "viewMap"
    });
    $.__views.viewMap && $.addTopLevelView($.__views.viewMap);
    $.__views.viewGoogleMap = Ti.UI.createView({
        width: Alloy.CFG.WidthDeviceIphone,
        top: 0,
        left: 0,
        id: "viewGoogleMap"
    });
    $.__views.viewMap.add($.__views.viewGoogleMap);
    $.__views.viewHowArrived = Ti.UI.createView({
        width: Alloy.CFG.WidthDeviceIphone,
        height: 260,
        bottom: "-210",
        left: 0,
        layout: "vertical",
        id: "viewHowArrived"
    });
    $.__views.viewMap.add($.__views.viewHowArrived);
    $.__views.viewHowArrivedTitle = Ti.UI.createView({
        width: 190,
        height: 40,
        backgroundColor: Alloy.CFG.GREEN,
        left: 0,
        layout: "horizontal",
        id: "viewHowArrivedTitle"
    });
    $.__views.viewHowArrived.add($.__views.viewHowArrivedTitle);
    $.__views.__alloyId16 = Ti.UI.createImageView({
        top: 10,
        width: 24,
        height: 20,
        left: 10,
        image: "/images/menuIcon11.png",
        id: "__alloyId16"
    });
    $.__views.viewHowArrivedTitle.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createLabel({
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
        id: "__alloyId17"
    });
    $.__views.viewHowArrivedTitle.add($.__views.__alloyId17);
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
    var managment_View = require("managment_View");
    var MapModule = require("ti.map");
    var managment_Timer = require("managment_Timer");
    var managment_route = require("managment_route");
    var picker_data = [];
    var userLocation = "";
    var openArrivedView = "false";
    var map = "";
    Titanium.Platform.displayCaps.dpi / 160;
    var openArrivedView = "false";
    var picker_dataOrigen = [];
    var picker_dataDestino = [];
    var station_origen = "";
    var station_destino = "";
    var lastRoute = "";
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