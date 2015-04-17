var managment_View = require('managment_View');
var managment_Data = require('managment_Data');

var args = arguments[0] || {};
var data = [];  
data    = args;

show();



/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/


function show(){

	//Add the actual view container
	Alloy.Globals.ActualContainer = $.viewPressDetail;
	Alloy.Globals.ActualSection = "press";
	
	Alloy.Globals.Header.children[0].children[1].text = L('text_6');

	//Carga WebServie de Subcategorias
	Ti.App.addEventListener('loadNew', loadNew);
	managment_Data.LoadWebService_New(data[0][0].id);

}

function loadNew()
{
	Ti.App.removeEventListener('loadNew', loadNew);
		
	if (Alloy.Collections.model__New.code == 'ok')
	{
		$.viewWeb.html = Alloy.Collections.model__New.result.descripcion;
	}
	else
	{
		//Error
		managment_View.OpenInfoWindow( L('text_27'));
	}		
	
	Ti.App.fireEvent('closeLoading');	
	
}

/* ***********************************************************
 * Handler functions
 * ***********************************************************/