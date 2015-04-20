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
	Alloy.Globals.ActualContainer = $.viewCustomer;
	Alloy.Globals.ActualSection = "customerService";
	
	Alloy.Globals.Header.children[0].children[1].text = L('text_17');
	

	//Carga WebServie de Alerta
	Ti.App.addEventListener('loadSCustomoerService', loadSCustomoerService);
	managment_Data.LoadWebService_CustomerService();

}

function loadSCustomoerService()
{
	Ti.App.removeEventListener('loadSCustomoerService', loadSCustomoerService);
		
	$.viewWeb.html = Alloy.Collections.model__CustomerService[3].value;		
	
	Ti.App.fireEvent('closeLoading');
	
}


/* ***********************************************************
 * Handler functions
 * ***********************************************************/