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
	Alloy.Globals.ActualContainer = $.viewScheduler;
	Alloy.Globals.ActualSection = "tarifas";
	
	Alloy.Globals.Header.children[0].children[1].text = L('text_30');

	//Carga WebServie de Alerta
	Ti.App.addEventListener('loadTarifas', loadTarifas);
	managment_Data.LoadWebService_Tarifas();
}

function loadTarifas()
{
	Ti.App.removeEventListener('loadTarifas', loadTarifas);
		
	$.viewWeb.html = Alloy.Collections.model__Tarifas[3].value;		
	
	Ti.App.fireEvent('closeLoading');
	
}



/* ***********************************************************
 * Handler functions
 * ***********************************************************/
