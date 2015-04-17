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
	Alloy.Globals.ActualSection = "scheduler";
	
	Alloy.Globals.Header.children[0].children[1].text = L('text_2');

	//Carga WebServie de Alerta
	Ti.App.addEventListener('loadScheduler', loadScheduler);
	managment_Data.LoadWebService_Scheduler();
}

function loadScheduler()
{
	Ti.App.removeEventListener('loadScheduler', loadScheduler);
		
	$.viewWeb.html = Alloy.Collections.model__Scheduler[3].value;		
	
	Ti.App.fireEvent('closeLoading');
	
}



/* ***********************************************************
 * Handler functions
 * ***********************************************************/
