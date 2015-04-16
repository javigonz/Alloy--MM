var managment_View = require("managment_View");

var url_WebService_Scheduler = "http://hechoenmijas.solbyte.com.es/ws.php?c=Eventos&m=getAll";

var fileJson_press = {
    code: "1",
    result: [ {
        id: "1",
        title: "El metro de Málaga tendrá cobertura de telefonía móvil antes del verano",
        date: "24/02/2015",
        image: "http://metromalaga.es/wp-content/themes/base/includes/timthumb/timthumb.php?src=http://metromalaga.es/wp-content/uploads/2015/02/Foto-Metro-M%C3%A1laga-Movistar.jpg&w=700&h=350&zc=1"
    }, {
        id: "2",
        title: "El metro de Málaga tendrá cobertura de telefonía móvil antes del verano",
        date: "22/02/2015",
        image: "http://metromalaga.es/wp-content/themes/base/includes/timthumb/timthumb.php?src=http://metromalaga.es/wp-content/uploads/2015/02/IMG_7525.jpg&w=700&h=350&zc=1"
    }, {
        id: "3",
        title: "El metro de Málaga tendrá cobertura de telefonía móvil antes del verano",
        date: "22/02/2015",
        image: "http://metromalaga.es/wp-content/themes/base/includes/timthumb/timthumb.php?src=http://metromalaga.es/wp-content/uploads/2015/02/IMG_7525.jpg&w=700&h=350&zc=1"
    }, {
        id: "4",
        title: "El metro de Málaga tendrá cobertura de telefonía móvil antes del verano",
        date: "22/02/2015",
        image: "http://metromalaga.es/wp-content/themes/base/includes/timthumb/timthumb.php?src=http://metromalaga.es/wp-content/uploads/2015/02/IMG_7525.jpg&w=700&h=350&zc=1"
    }, {
        id: "5",
        title: "El metro de Málaga tendrá cobertura de telefonía móvil antes del verano",
        date: "22/02/2015",
        image: "http://metromalaga.es/wp-content/themes/base/includes/timthumb/timthumb.php?src=http://metromalaga.es/wp-content/uploads/2015/02/IMG_7525.jpg&w=700&h=350&zc=1"
    }, {
        id: "6",
        title: "El metro de Málaga tendrá cobertura de telefonía móvil antes del verano",
        date: "22/02/2015",
        image: "http://metromalaga.es/wp-content/themes/base/includes/timthumb/timthumb.php?src=http://metromalaga.es/wp-content/uploads/2015/02/IMG_7525.jpg&w=700&h=350&zc=1"
    } ]
};

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
        xhr.open("GET", url);
        xhr.send();
    }
};

exports.LoadWebService_Scheduler = function() {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            try {
                {
                    Alloy.Collections.model_scheduler;
                }
                Alloy.Collections.model__Press = fileJson_press;
                Ti.App.fireEvent("loadScheduler");
            } catch (e) {
                Ti.App.fireEvent("closeLoading");
                Ti.API.info("Datos NO1 cargados");
            }
        },
        onerror: function() {
            Ti.App.fireEvent("closeLoading");
            Ti.API.info("Datos NO2 cargados");
        },
        timeout: 1e4
    });
    client.validatesSecureCertificate = false;
    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    client.open("POST", url_WebService_Scheduler);
    client.send();
};