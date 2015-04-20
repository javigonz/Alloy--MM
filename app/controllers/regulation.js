var managment_View = require('managment_View');
var managment_Data = require('managment_Data');

show();



/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/


function show(){

	//Add the actual view container
	Alloy.Globals.ActualContainer = $.viewRegulation;
	Alloy.Globals.ActualSection = "regulation";
	
	Alloy.Globals.Header.children[0].children[1].text = L('text_18');
	

	//Carga WebServie de Alerta
	Ti.App.addEventListener('loadRegulation', loadRegulation);
	managment_Data.LoadWebService_Regulation();

}

function loadRegulation()
{
	Ti.App.removeEventListener('loadRegulation', loadRegulation);
		
	$.viewWeb.html = Alloy.Collections.model__Regulation[3].value;		
	
	Ti.App.fireEvent('closeLoading');
	
}


/* ***********************************************************
 * Handler functions
 * ***********************************************************/