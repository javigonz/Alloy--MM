var managment_View = require('managment_View');

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
	
	if (Ti.Platform.osname == "iphone")
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
	$.MenuView4.width = widthButton;
	
	
	Alloy.Globals.Header.children[0].children[1].text = L('text_1');

	Ti.App.fireEvent('closeLoading');
	
	//Inicio de las notificaciones Push
	var managment_Push = require('managment_Push');
	

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

function eventHandler_Lines(e)
{
	managment_View.OpenSectionParam('lines',[],'', Alloy.Globals.ActualContainer);
}

function eventHandler_Map(e)
{
	managment_View.OpenSectionParam('map',[],'', Alloy.Globals.ActualContainer);
}