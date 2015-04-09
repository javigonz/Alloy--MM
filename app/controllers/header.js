var managment_View = require('managment_View');


var MoveRight = Titanium.UI.createAnimation({
	    curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
	    opacity: 1,
	    duration: 300,
	    left: 250
});

Alloy.Globals.Header = $.viewHeader;




/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/





/* ***********************************************************
 * Event handlers
 * ***********************************************************/

function handlerMenu(e){
	
	managment_View.handlerMenu();
}

function handlerBack(e){
	managment_View.closeActualSection();
}