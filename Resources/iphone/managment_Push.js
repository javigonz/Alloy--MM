var managment_View = require("managment_View");

var androidOptions = {
    focusAppOnPush: false,
    showAppOnTrayClick: true,
    showTrayNotification: true,
    showTrayNotificationsWhenFocused: false,
    singleCallback: true
};

var blackberryOptions = {
    appId: "4427-7h6l37627mrr0I3956a74om7643M17l7921",
    ppgUrl: "http://cp4427.pushapi.eval.blackberry.com",
    usePublicPpg: true,
    launchApplicationOnPush: true
};

var onReceive = function(evt) {
    var payload = JSON.parse(evt.payload);
    "" == payload._id ? managment_View.OpenSectionParam("press", [], "", Alloy.Globals.ActualContainer) : managment_View.OpenSectionParam("pressDetail", [ payload._id ], "", Alloy.Globals.ActualContainer);
    console.log("A push notification was received!" + JSON.stringify(evt));
};

var onLaunched = function(evt) {
    var payload = JSON.parse(evt.payload);
    "" == payload._id ? managment_View.OpenSectionParam("press", [], "", Alloy.Globals.ActualContainer) : managment_View.OpenSectionParam("pressDetail", [ payload._id ], "", Alloy.Globals.ActualContainer);
    console.log("A push notification was received!" + JSON.stringify(evt));
};

var onFocused = function() {
    Ti.API.info("A push notification onFocused");
};

var ACSP = require("acspush");

if ("iphone" == Ti.Platform.osname) var ACSPush = new ACSP.ACSPush(); else var ACSPush = new ACSP.ACSPush("javigonz", "123456");

Ti.API.info("registrar device al PUSH");

var channel = "AllUsers";

ACSPush.registerDevice(channel, onReceive, onLaunched, onFocused, androidOptions, blackberryOptions);