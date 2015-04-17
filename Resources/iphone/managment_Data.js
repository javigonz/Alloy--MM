var managment_View = require("managment_View");

var url_WebService_News = "http://desarrollo.solbyte.com.es/metromalaga/ws.php?c=Noticias&m=getAll";

var url_WebService_New = "http://desarrollo.solbyte.com.es/metromalaga/ws.php?c=Noticias&m=getOneJSON&id=";

var url_WebService_SeccionHome = "http://desarrollo.solbyte.com.es/metromalaga/ws.php?c=Secciones&m=getOneJSON&id=1";

var url_WebService_SeccionScheduler = "http://desarrollo.solbyte.com.es/metromalaga/ws.php?c=Secciones&m=getOneJSON&id=2";

exports.LoadImage_AsynCache = function(url, imageRemote) {
    var cacheFilename = url.replace(/[^a-zA-Z0-9\.]/gi, "_");
    var cacheFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, cacheFilename);
    if (cacheFile.exists()) {
        Ti.API.info("IMAGEN REMOTA CACHEADA: ");
        imageRemote.image = cacheFile.nativePath;
    } else {
        Ti.API.info("IMAGEN REMOTA NO CACHEADA:");
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                imageRemote.image = xhr.responseData;
                cacheFile.write(xhr.responseData);
            },
            onerror: function() {},
            timeout: 5e3
        });
        xhr.validatesSecureCertificate = false;
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.open("GET", Alloy.Globals.UrlImages + url);
        xhr.send();
    }
};

exports.LoadWebService_News = function() {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            try {
                Alloy.Collections.model__Press = JSON.parse(this.responseText);
                Ti.App.fireEvent("loadNews");
            } catch (e) {
                Ti.App.fireEvent("closeLoading");
                managment_View.OpenInfoWindow(L("text_27"));
            }
        },
        onerror: function() {
            Ti.App.fireEvent("closeLoading");
            managment_View.OpenInfoWindow(L("text_27"));
        },
        timeout: 5e3
    });
    client.validatesSecureCertificate = false;
    client.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    client.open("GET", url_WebService_News);
    client.send();
};

exports.LoadWebService_New = function(_id) {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            try {
                Alloy.Collections.model__New = JSON.parse(this.responseText);
                Ti.App.fireEvent("loadNew");
            } catch (e) {
                Ti.App.fireEvent("closeLoading");
                managment_View.OpenInfoWindow(L("text_27"));
            }
        },
        onerror: function() {
            Ti.App.fireEvent("closeLoading");
            managment_View.OpenInfoWindow(L("text_27"));
        },
        timeout: 5e3
    });
    client.validatesSecureCertificate = false;
    client.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    client.open("GET", url_WebService_New + _id);
    client.send();
};

exports.LoadWebService_Alert = function() {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            try {
                Alloy.Collections.model__Alert = JSON.parse(this.responseText);
                Ti.App.fireEvent("loadAlert");
            } catch (e) {
                Ti.App.fireEvent("closeLoading");
                managment_View.OpenInfoWindow(L("text_27"));
            }
        },
        onerror: function() {
            Ti.App.fireEvent("closeLoading");
            managment_View.OpenInfoWindow(L("text_27"));
        },
        timeout: 5e3
    });
    client.validatesSecureCertificate = false;
    client.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    client.open("GET", url_WebService_SeccionHome);
    client.send();
};

exports.LoadWebService_Scheduler = function() {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            try {
                Alloy.Collections.model__Scheduler = JSON.parse(this.responseText);
                Ti.App.fireEvent("loadScheduler");
            } catch (e) {
                Ti.App.fireEvent("closeLoading");
                managment_View.OpenInfoWindow(L("text_27"));
            }
        },
        onerror: function() {
            Ti.App.fireEvent("closeLoading");
            managment_View.OpenInfoWindow(L("text_27"));
        },
        timeout: 5e3
    });
    client.validatesSecureCertificate = false;
    client.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    client.open("GET", url_WebService_SeccionScheduler);
    client.send();
};