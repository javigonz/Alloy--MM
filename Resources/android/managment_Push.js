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
    Ti.API.info("A push notification onReceive!");
    var pushPayload = JSON.parse(evt.payload);
    Ti.API.info("evt.source parse " + pushPayload.android.title);
    managment_View.OpenSectionParam("press", [], "", Alloy.Globals.ActualContainer);
};

var onLaunched = function() {
    Ti.API.info("A push notification onLaounched!");
};

var onFocused = function() {
    Ti.API.info("A push notification onFocused");
};

var ACSP = require("acspush");

var ACSPush;

var ACSPush = new ACSP.ACSPush("javigonz", "123456");

Ti.API.info("registrar device al PUSH");

var channel = "AllUsers";

ACSPush.registerDevice(channel, onReceive, onLaunched, onFocused, androidOptions, blackberryOptions);