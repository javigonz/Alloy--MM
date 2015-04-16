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
        $.viewHowArrivedTitle.addEventListener("click", handlerArrivedView);
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
        height: 130,
        bottom: "-80",
        left: 0,
        layout: "vertical",
        id: "viewHowArrived",
        visible: "false"
    });
    $.__views.viewMap.add($.__views.viewHowArrived);
    $.__views.viewHowArrivedTitle = Ti.UI.createView({
        width: 160,
        height: 40,
        backgroundColor: Alloy.CFG.GREEN,
        left: 0,
        layout: "horizontal",
        id: "viewHowArrivedTitle"
    });
    $.__views.viewHowArrived.add($.__views.viewHowArrivedTitle);
    $.__views.__alloyId17 = Ti.UI.createImageView({
        top: 10,
        width: 24,
        height: 20,
        left: 10,
        image: "/images/menuIcon10.png",
        id: "__alloyId17"
    });
    $.__views.viewHowArrivedTitle.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createLabel({
        color: Alloy.CFG.WHITE,
        font: {
            fontFamily: Alloy.CFG.MYRIAD_REGULAR,
            fontSize: 15,
            fontWeight: "normal"
        },
        left: 10,
        top: 10,
        height: 20,
        text: L("text_19"),
        id: "__alloyId18"
    });
    $.__views.viewHowArrivedTitle.add($.__views.__alloyId18);
    $.__views.viewHowArrivedContainer = Ti.UI.createView({
        width: Alloy.CFG.WidthDeviceIphone,
        height: 100,
        backgroundColor: Alloy.CFG.WHITE,
        left: 0,
        id: "viewHowArrivedContainer"
    });
    $.__views.viewHowArrived.add($.__views.viewHowArrivedContainer);
    $.__views.comboHowArrived = Ti.UI.createTextField({
        height: 40,
        width: "90%",
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
        id: "comboHowArrived",
        hintText: L("text_22")
    });
    $.__views.viewHowArrivedContainer.add($.__views.comboHowArrived);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var managment_View = require("managment_View");
    var MapModule = require("ti.map");
    var picker_data = [];
    var userLocation = "";
    var openArrivedView = "false";
    var map = "";
    var MoveUp_Opacity = Titanium.UI.createAnimation({
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
        duration: 300,
        bottom: 0
    });
    var MoveDown_OpacityAndroid = Titanium.UI.createAnimation({
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
        duration: 200,
        bottom: "-75"
    });
    var MoveDown_OpacityiPhone = Titanium.UI.createAnimation({
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
        duration: 200,
        bottom: "-80"
    });
    show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;