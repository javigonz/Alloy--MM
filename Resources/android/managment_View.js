var utils = require("utils");

var Animator = require("com.animecyc.animator");

var MoveRight = Titanium.UI.createAnimation({
    curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
    opacity: 1,
    duration: 300,
    left: 230
});

var MoveLeft = Titanium.UI.createAnimation({
    curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
    opacity: 1,
    duration: 300,
    left: 0
});

exports.OpenSectionParam = function(window, objectAddress) {
    var viewData = [ {
        section: window,
        objectData: objectAddress,
        container: Alloy.Globals.ActualContainer
    } ];
    Alloy.Globals.ViewActive.push(viewData);
    Alloy.Globals.ActualSection = window;
    if ("true" === Alloy.Globals.MenuOpen) {
        Alloy.Globals.MenuOpen = "false";
        Animator.animate(Alloy.Globals.mainContainer, {
            duration: 300,
            easing: Animator.EXP_OUT,
            left: 0
        });
        var miniTimer = setTimeout(function() {
            clearInterval(miniTimer);
            Ti.App.fireEvent("openLoading");
        }, 300);
        var miniTimer2 = setTimeout(function() {
            clearInterval(miniTimer2);
            Ti.App.fireEvent("changeSection");
            Alloy.Globals.viewContainerPrincipal.add(Alloy.createController(window, [ objectAddress ]).getView());
        }, 600);
    } else {
        Ti.App.fireEvent("openLoading");
        var miniTimer2 = setTimeout(function() {
            clearInterval(miniTimer2);
            utils.removeAllChildren(Alloy.Globals.viewContainerPrincipal);
            Ti.App.fireEvent("changeSection");
            Alloy.Globals.viewContainerPrincipal.add(Alloy.createController(window, [ objectAddress ]).getView());
        }, 300);
    }
};

exports.closeActualSection = function() {
    if ("false" == Alloy.Globals.IsLoading) {
        Ti.UI.Android.hideSoftKeyboard();
        if (1 == Alloy.Globals.ViewActive.length) ; else {
            Ti.App.fireEvent("openLoading");
            {
                Alloy.Globals.ActualContainer;
            }
            var i = Alloy.Globals.ViewActive.length - 2;
            Alloy.Globals.ActualSection = Alloy.Globals.ViewActive[i][0].section;
            if ("login" == Alloy.Globals.ActualSection) {
                Alloy.Globals.Header.visible = "false";
                Alloy.Globals.Menu.visible = "false";
            }
            var miniTimer = setTimeout(function() {
                clearInterval(miniTimer);
                utils.removeAllChildren(Alloy.Globals.viewContainerPrincipal);
                Alloy.Globals.viewContainerPrincipal.add(Alloy.createController(Alloy.Globals.ViewActive[i][0].section, [ Alloy.Globals.ViewActive[i][0].objectData ]).getView());
                Alloy.Globals.ViewActive.pop();
                Ti.App.fireEvent("changeSection");
            }, 300);
        }
    }
};

exports.handlerMenu = function() {
    if ("false" === Alloy.Globals.MenuOpen) {
        Alloy.Globals.MenuOpen = "true";
        Animator.animate(Alloy.Globals.mainContainer, {
            duration: 300,
            easing: Animator.EXP_OUT,
            left: 250
        });
    } else {
        Alloy.Globals.MenuOpen = "false";
        Animator.animate(Alloy.Globals.mainContainer, {
            duration: 300,
            easing: Animator.EXP_OUT,
            left: 0
        });
    }
};