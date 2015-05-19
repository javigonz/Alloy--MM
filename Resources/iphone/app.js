var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.viewContainerPrincipal;

Alloy.Globals.mainContainer;

Alloy.Globals.WinInitContainer;

Alloy.Globals.ViewActive = [];

Alloy.Globals.ActualContainer;

Alloy.Globals.ActualSection;

Alloy.Globals.IsLoading;

Alloy.Globals.MenuOpen;

Alloy.Globals.Header;

Alloy.Globals.UserLocation;

Alloy.Globals.UrlImages = "http://desarrollo.solbyte.com.es/metromalaga/res/uploads/";

Alloy.Globals.Height_Header = 50;

Alloy.CFG.WHITE = "#FFFFFF";

Alloy.CFG.BLACK = "#000000";

Alloy.CFG.BLUE1 = "#0189c6";

Alloy.CFG.BLUE2 = "#50b2e9";

Alloy.CFG.RED = "#dd211c";

Alloy.CFG.GREY1 = "#909090";

Alloy.CFG.GREY2 = "#f2f2f2";

Alloy.CFG.GREY3 = "#e2e2e2";

Alloy.CFG.GREY4 = "#b1b1b1";

Alloy.CFG.GREY5 = "#7f7f7f";

Alloy.CFG.GREY6 = "#5d5d5d";

Alloy.CFG.GREEN = "#377b3d";

Alloy.CFG.GREEN2 = "#2a7030";

Alloy.CFG.ORANGE = "#ffc80a";

Alloy.CFG.WidthDeviceIphone = Ti.Platform.displayCaps.platformWidth;

Alloy.CFG.WidthDeviceIphoneMargin = Alloy.CFG.WidthDeviceIphone - 20;

Alloy.CFG.WidthDeviceAndroid = Ti.Platform.displayCaps.platformWidth / (Titanium.Platform.displayCaps.dpi / 160);

Alloy.CFG.HeightDevice = Ti.Platform.displayCaps.platformHeight / (Titanium.Platform.displayCaps.dpi / 160);

Alloy.CFG.HeightDeviceIphone = Ti.Platform.displayCaps.platformHeight;

Alloy.CFG.leftTrafficAndroid = (Alloy.CFG.WidthDeviceAndroid - 245) / 2;

Alloy.CFG.leftTrafficIphone = 117.5;

if ("android" === Ti.Platform.osname) {
    Alloy.CFG.ARIAL_NORMAL = "Arial";
    Alloy.CFG.MYRIAD_REGULAR = "Myriad Pro";
} else {
    Alloy.CFG.ARIAL_NORMAL = "ArialMT";
    Alloy.CFG.MYRIAD_REGULAR = "MyriadPro-Regular";
}

Alloy.Collections.model_scheduler = Alloy.createCollection("model_scheduler");

Alloy.Collections.model__Press = [];

Alloy.Collections.model__New = [];

Alloy.Collections.model__Alert = [];

Alloy.Collections.model__Scheduler = [];

Alloy.Collections.model__Regulation = [];

Alloy.Collections.model__Tarifas = [];

Alloy.Collections.model__MetroStations = {
    code: "1",
    result: [ {
        id: "1",
        title: "Andalucía Tech",
        subtitle: "Bulevar Louis Pasteur",
        latitude: "36.718760",
        longitude: "-4.494513",
        line: [ "1" ],
        timeForward: "106",
        timeBack: "0",
        image: "/images/parada_andaluciaTech.png"
    }, {
        id: "2",
        title: "Paraninfo",
        subtitle: "Bulevar Louis Pasteur",
        latitude: "36.717981",
        longitude: "-4.488859",
        line: [ "1" ],
        timeForward: "72",
        timeBack: "73",
        image: "/images/parada_paraninfo.png"
    }, {
        id: "3",
        title: "El Cónsul",
        subtitle: "Bulevar Louis Pasteur",
        latitude: "36.717309",
        longitude: "-4.484002",
        line: [ "1" ],
        timeForward: "88",
        timeBack: "67",
        image: "/images/parada_elconsul.png"
    }, {
        id: "4",
        title: "Clínico",
        subtitle: "Boulevard Louis Pasteur",
        latitude: "36.716564",
        longitude: "-4.478618",
        line: [ "1" ],
        timeForward: "145",
        timeBack: "71",
        image: "/images/parada_clinico.png"
    }, {
        id: "5",
        title: "Universidad",
        subtitle: "Bulevar Louis Pasteur",
        latitude: "36.717021",
        longitude: "-4.472310",
        line: [ "1" ],
        timeForward: "111",
        timeBack: "81",
        image: "/images/parada_universidad.png"
    }, {
        id: "6",
        title: "Ciudad de la justicia",
        subtitle: "Bulevar Louis Pasteur",
        latitude: "36.718158",
        longitude: "-4.463566",
        line: [ "1" ],
        timeForward: "97",
        timeBack: "94",
        image: "/images/parada_ciudadJusticia.png"
    }, {
        id: "7",
        title: "Portada Alta",
        subtitle: "C/ Cómpeta 26",
        latitude: "36.719250",
        longitude: "-4.452564",
        line: [ "1" ],
        timeForward: "69",
        timeBack: "97",
        image: "/images/parada_portadaAlta.png"
    }, {
        id: "8",
        title: "Carranque",
        subtitle: "C/ Virgen de la Cabeza 3",
        latitude: "36.718633",
        longitude: "-4.449192",
        line: [ "1" ],
        timeForward: "86",
        timeBack: "68",
        image: "/images/parada_carranque.png"
    }, {
        id: "9",
        title: "Barbarela",
        subtitle: "Avda. Juan XXIII",
        latitude: "36.711650",
        longitude: "-4.445853",
        line: [ "1" ],
        timeForward: "118",
        timeBack: "86",
        image: "/images/parada_barbarela.png"
    }, {
        id: "10",
        title: "La Unión",
        subtitle: "C/ Santa Marta 3",
        latitude: "36.710909",
        longitude: "-4.439654",
        line: [ "1" ],
        timeForward: "162",
        timeBack: "113",
        image: "/images/parada_laUnion.png"
    }, {
        id: "11",
        title: "El Perchel",
        subtitle: "C/ Explanada de Estación",
        latitude: "36.712666",
        longitude: "-4.431597",
        line: [ "1", "2" ],
        timeForward: "137",
        timeBack: "136",
        image: "/images/parada_elPerchel.png"
    }, {
        id: "12",
        title: "La Isla",
        subtitle: "C/ Velasco",
        latitude: "36.708038",
        longitude: "-4.435637",
        line: [ "2" ],
        timeForward: "75",
        timeBack: "170",
        image: "/images/parada_laisla.png"
    }, {
        id: "13",
        title: "Princesa",
        subtitle: "C/ Héroe de Sostoa",
        latitude: "36.704326",
        longitude: "-4.440142",
        line: [ "2" ],
        timeForward: "86",
        timeBack: "75",
        image: "/images/parada_princesa.png"
    }, {
        id: "14",
        title: "El Torcal",
        subtitle: "Avda. Velázquez 8",
        latitude: "36.699723",
        longitude: "-4.446092",
        line: [ "2" ],
        timeForward: "77",
        timeBack: "86",
        image: "/images/parada_eltorcal.png"
    }, {
        id: "15",
        title: "La Luz - La Paz",
        subtitle: "Avda. Velázquez",
        latitude: "36.697711",
        longitude: "-4.448564",
        line: [ "2" ],
        timeForward: "78",
        timeBack: "76",
        image: "/images/parada_laluz.png"
    }, {
        id: "16",
        title: "Puerta Blanca",
        subtitle: "Avda. Velázquez",
        latitude: "36.695445",
        longitude: "-4.451466",
        line: [ "2" ],
        timeForward: "219",
        timeBack: "77",
        image: "/images/parada_puertaBlanca.png"
    }, {
        id: "17",
        title: "Palacio de Deportes",
        subtitle: "C/ Miguel Mérida Nicolich",
        latitude: "36.684651",
        longitude: "-4.458145",
        line: [ "2" ],
        timeForward: "0",
        timeBack: "98",
        image: "/images/parada_palacio.png"
    } ]
};

Alloy.createController("index");