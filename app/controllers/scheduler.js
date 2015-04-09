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

	
	//Carga WebServie de Subcategorias
	Ti.App.addEventListener('loadScheduler', loadScheduler);
	//Alloy.Collections.model_scheduler.reset();
	managment_Data.LoadWebService_Scheduler();

}

function loadScheduler()
{
	Ti.App.removeEventListener('loadScheduler', loadScheduler);
		
		
	
	Ti.App.fireEvent('closeLoading');	
	
	//$.viewWeb.html = '<meta name="viewport" content=" initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>' + codigoHtml;
}


/* ***********************************************************
 * Handler functions
 * ***********************************************************/

function clickHandler(scope)
{
	
	Ti.API.info('CLICK id: ' + scope.source.scope );
}
