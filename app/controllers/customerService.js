var managment_View = require('managment_View');

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
	

	var miniTimer = setTimeout(function () {
					clearInterval( miniTimer );
			        Ti.App.fireEvent('closeLoading');
	}, 2000);

}


/* ***********************************************************
 * Handler functions
 * ***********************************************************/