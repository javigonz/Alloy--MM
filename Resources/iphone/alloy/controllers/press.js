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
        Alloy.Globals.ActualContainer = $.viewPress;
        Alloy.Globals.ActualSection = "press";
        Alloy.Globals.Header.children[0].children[1].text = L("text_6");
        Ti.App.addEventListener("loadScheduler", loadScheduler);
        managment_Data.LoadWebService_Scheduler();
    }
    function loadScheduler() {
        Ti.App.removeEventListener("loadScheduler", loadScheduler);
        if ("1" == Alloy.Collections.model__Press.code) {
            var rows = [];
            var rowList = $.createStyle({
                classes: [ "rowList" ]
            });
            var imagePress = $.createStyle({
                classes: [ "imagePress" ]
            });
            var viewDescription = $.createStyle({
                classes: [ "viewDescription" ]
            });
            var textTitle = $.createStyle({
                classes: [ "textTitle" ]
            });
            var textDescription = $.createStyle({
                classes: [ "textDescription" ]
            });
            Alloy.Collections.model__Press.result.forEach(function(element) {
                var containerTableRow = Ti.UI.createTableViewRow({
                    scope: element.id
                });
                containerTableRow.addEventListener("click", clickHandler);
                containerTableRow.applyProperties(rowList);
                var containerImage = Titanium.UI.createImageView({
                    scope: element.id,
                    defaultImage: "/images/download.png"
                });
                containerImage.applyProperties(imagePress);
                managment_Data.LoadImage_AsynCache(element.image.split(" ").join("%20"), containerImage);
                var containerViewDescription = Ti.UI.createView({
                    scope: element.id
                });
                containerViewDescription.applyProperties(viewDescription);
                var containerLabelTitle = Ti.UI.createLabel({
                    scope: element.id,
                    text: element.title
                });
                containerLabelTitle.applyProperties(textTitle);
                var containerLabelDate = Ti.UI.createLabel({
                    scope: element.id,
                    text: element.date
                });
                containerLabelDate.applyProperties(textDescription);
                containerTableRow.add(containerImage);
                containerViewDescription.add(containerLabelTitle);
                containerViewDescription.add(containerLabelDate);
                containerTableRow.add(containerViewDescription);
                rows.push(containerTableRow);
            });
            $.tableList.setData(rows);
        }
        Ti.App.fireEvent("closeLoading");
    }
    function clickHandler(scope) {
        Ti.API.info("CLICK id: " + scope.source.scope);
        managment_View.OpenSectionParam("pressDetail", [], "", Alloy.Globals.ActualContainer);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "press";
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
    $.__views.viewPress = Ti.UI.createView({
        width: Alloy.CFG.WidthDeviceIphone,
        backgroundColor: Alloy.CFG.WHITE,
        top: 0,
        left: 0,
        id: "viewPress"
    });
    $.__views.viewPress && $.addTopLevelView($.__views.viewPress);
    $.__views.tableList = Ti.UI.createTableView({
        separatorColor: Alloy.CFG.GREY5,
        id: "tableList"
    });
    $.__views.viewPress.add($.__views.tableList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var managment_View = require("managment_View");
    var managment_Data = require("managment_Data");
    show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;