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
	Alloy.Globals.ActualContainer = $.viewPressDetail;
	Alloy.Globals.ActualSection = "press";
	
	Alloy.Globals.Header.children[0].children[1].text = L('text_6');

	Ti.App.fireEvent('closeLoading');


}


/* ***********************************************************
 * Handler functions
 * ***********************************************************/