var managment_View = require('managment_View');
var managment_Data = require('managment_Data');

//styles
var textAlertOrange = $.createStyle({classes: ['textAlertOrange']});
var textAlertRed = $.createStyle({classes: ['textAlertRed']});
var textAlertGreen = $.createStyle({classes: ['textAlertGreen']});
var textAlert = $.createStyle({classes: ['textAlert']});
var viewAlert = $.createStyle({classes: ['viewAlert']});
var viewAlertGreen = $.createStyle({classes: ['viewAlertGreen']});
var viewAlertOrange = $.createStyle({classes: ['viewAlertOrange']});
var viewAlertRed = $.createStyle({classes: ['viewAlertRed']});

show();



/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/


function show(){


	//Añado el container actual al objeto de navegación
	Alloy.Globals.ActualContainer = $.viewHome;
	Alloy.Globals.ActualSection = "home";
	
	/*if (Ti.Platform.osname == "iphone")
	{
		var widthButton = ((Alloy.CFG.WidthDeviceIphone * 90) / 100) / 4;
	}
	else
	{
		var widthButton = ((Alloy.CFG.WidthDeviceAndroid * 90) / 100) / 4;
	}
	
	$.MenuView1.width = widthButton;
	$.MenuView2.width = widthButton;
	$.MenuView3.width = widthButton;
	$.MenuView4.width = widthButton;*/
	
	
	Alloy.Globals.Header.children[0].children[1].text = L('text_1');
	
	if (Alloy.CFG.HeightDeviceIphone <= 480 && Ti.Platform.osname == "iphone")  //Para el caso particular de iphone 4 o menor
	{
		$.viewRoundedContainerLogo.height = 200;
	}
	
	if (Ti.Platform.osname === "iphone")
	{
		$.scrollableHomeSlider.height = Ti.Platform.displayCaps.platformHeight - 130;
		
	}
	else
	{
		if (Titanium.Platform.displayCaps.dpi <= 240)
		{
			$.scrollableHomeSlider.height = Alloy.CFG.HeightDevice - 135;
		}
		else
		{
			$.scrollableHomeSlider.height = Alloy.CFG.HeightDevice - 50;
		}
	}	

	//Carga WebServie de Alerta
	Ti.App.addEventListener('loadAlert', loadAlert);
	managment_Data.LoadWebService_Alert();
	
	//Inicio de las notificaciones Push
	var managment_Push = require('managment_Push');
	

}

function loadAlert()
{
	Ti.App.removeEventListener('loadAlert', loadAlert);
	
	if (Alloy.Collections.model__Alert[4].value == '0')
	{
		$.viewRoundedContainerTraffic.visible = 'false';
	}
	else
	{
		$.viewRoundedContainerTraffic.visible = 'true';
		$.textAlert.text = Alloy.Collections.model__Alert[3].value;
		
		switch (Alloy.Collections.model__Alert[5].value)
		{
			case 'Verde': 		$.textAlert.applyProperties(textAlertGreen);
								$.viewAlert.applyProperties(viewAlertGreen);
								$.traffic.image = '/images/trafficGreen_on.png';
								break;
			case 'ambar': 		$.textAlert.applyProperties(textAlertOrange);
								$.viewAlert.applyProperties(viewAlertOrange);
								$.traffic.image = '/images/trafficOrange_on.png';
								break;	
			case 'Rojo': 		$.textAlert.applyProperties(textAlertRed);
								$.viewAlert.applyProperties(viewAlertRed);
								$.traffic.image = '/images/trafficRed_on.png';
								break;	
			case 'Ninguno': 	$.viewRoundedContainerTraffic.visible = 'false';
								$.textAlert.applyProperties(textAlert);
								$.viewAlert.applyProperties(viewAlert);
								break;										
		}
	}

	
	Ti.App.fireEvent('closeLoading');
	
}	



/* ***********************************************************
 * Handler functions
 * ***********************************************************/


function eventHandler_Press(e)
{
	managment_View.OpenSectionParam('press',[],'', Alloy.Globals.ActualContainer);
}

function eventHandler_Scheduler(e)
{
	managment_View.OpenSectionParam('scheduler',[],'', Alloy.Globals.ActualContainer);
}

function eventHandler_Tarifas(e)
{
	managment_View.OpenSectionParam('tarifas',[],'', Alloy.Globals.ActualContainer);
}

function eventHandler_Map(e)
{
	managment_View.OpenSectionParam('map',[],'', Alloy.Globals.ActualContainer);
}