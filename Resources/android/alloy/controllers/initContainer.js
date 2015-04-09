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
        Alloy.Globals.WinInitContainer = $.winInitContainer;
        $.viewInitContainer.height = Alloy.CFG.HeightDevice - Alloy.Globals.Height_Header - 70;
        $.viewInitContainer.top = Alloy.Globals.Height_Header;
        Alloy.Globals.WinInitContainer.addEventListener("android:back", function() {
            managment_View.closeActualSection();
        });
        Alloy.Globals.viewContainerPrincipal = $.viewInitContainer;
        Alloy.Globals.mainContainer = $.mainContainer;
        Alloy.Globals.MenuOpen = "false";
        $.winInitContainer.open();
        managment_View.OpenSectionParam("home", [], $.viewInitContainer);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "initContainer";
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
    $.__views.winInitContainer = Ti.UI.createWindow({
        backgroundColor: Alloy.CFG.WHITE,
        navBarHidden: "true",
        tabBarHidden: "true",
        exitOnClose: "false",
        id: "winInitContainer"
    });
    $.__views.winInitContainer && $.addTopLevelView($.__views.winInitContainer);
    $.__views.menuContainer = Ti.UI.createView({
        id: "menuContainer"
    });
    $.__views.winInitContainer.add($.__views.menuContainer);
    $.__views.menu = Alloy.createController("menu", {
        id: "menu",
        __parentSymbol: $.__views.menuContainer
    });
    $.__views.menu.setParent($.__views.menuContainer);
    $.__views.mainContainer = Ti.UI.createView({
        id: "mainContainer"
    });
    $.__views.winInitContainer.add($.__views.mainContainer);
    $.__views.viewInitContainer = Ti.UI.createView({
        backgroundColor: Alloy.CFG.WHITE,
        id: "viewInitContainer"
    });
    $.__views.mainContainer.add($.__views.viewInitContainer);
    $.__views.header = Alloy.createController("header", {
        id: "header",
        __parentSymbol: $.__views.mainContainer
    });
    $.__views.header.setParent($.__views.mainContainer);
    $.__views.footer = Alloy.createController("footer", {
        id: "footer",
        __parentSymbol: $.__views.mainContainer
    });
    $.__views.footer.setParent($.__views.mainContainer);
    $.__views.loading = Alloy.createController("loading", {
        id: "loading",
        __parentSymbol: $.__views.mainContainer
    });
    $.__views.loading.setParent($.__views.mainContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("utils");
    var managment_View = require("managment_View");
    show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;