//View Managment to navegate between sections

var utils = require('utils');

if (Ti.Platform.osname === "android")
	var Animator = require('com.animecyc.animator'); //Solo para Android


var MoveRight = Titanium.UI.createAnimation({
	    curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
	    opacity: 1,
	    duration: 300,
	    left: 230
});

var MoveLeft = Titanium.UI.createAnimation({
	    curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
	    opacity: 1,
	    duration: 300,
	    left: 0
});




//************************************************************************************************************************
//Open new Section and load automatic in main window
//
//window: section to 
//objectAddress: Data Object parameter
//************************************************************************************************************************
exports.OpenSectionParam = function(window,objectAddress)
{
	var viewData = [{
			section: window,
			objectData: objectAddress,
			container: Alloy.Globals.ActualContainer
	}];
	
	Alloy.Globals.ViewActive.push(viewData);
	Alloy.Globals.ActualSection = window;
		
	//close menu
	if (Alloy.Globals.MenuOpen === 'true') //Close view menu, then put visible loader and load the section
	{
		Alloy.Globals.MenuOpen = 'false';
			
		if (Ti.Platform.osname === "iphone")
		{
			Alloy.Globals.mainContainer.animate(MoveLeft);
		}
		else
		{
			Animator.animate(Alloy.Globals.mainContainer, {
			       duration : 300,
			       easing : Animator.EXP_OUT,
			       left: 0
			});
		}
		
		var miniTimer = setTimeout(function () {
					clearInterval( miniTimer );
					Ti.App.fireEvent('openLoading');
		}, 300);
			
		var miniTimer2 = setTimeout(function () {
					clearInterval( miniTimer2 );
					//utils.removeAllChildren(Alloy.Globals.viewContainerPrincipal);
					Ti.App.fireEvent('changeSection');
					Alloy.Globals.viewContainerPrincipal.add(Alloy.createController(window, [objectAddress]).getView());
		}, 600);
	}
	else //The menu is closing now, then put visible loader and load the section
	{
		Ti.App.fireEvent('openLoading');
		
		var miniTimer2 = setTimeout(function () {
					clearInterval( miniTimer2 );
					utils.removeAllChildren(Alloy.Globals.viewContainerPrincipal);
					Ti.App.fireEvent('changeSection');
					Alloy.Globals.viewContainerPrincipal.add(Alloy.createController(window, [objectAddress]).getView());
		}, 300);
	}


};



//************************************************************************************************************************
//Boton atrás ... cerrar sección actual
//************************************************************************************************************************
exports.closeActualSection = function(){
	
	if (Alloy.Globals.IsLoading == 'false') //Con esto se evita que el usuario de repetidamente al botón de atrás
	{
		if (Ti.Platform.osname == "android")
		{
			Ti.UI.Android.hideSoftKeyboard();
		}
		
		
		
		if (Alloy.Globals.ViewActive.length == 1) 
		{
			//Estoy en la primera página
		}
		else
		{
			
			Ti.App.fireEvent('openLoading');
			
			var actualContainer = Alloy.Globals.ActualContainer;
			var i = Alloy.Globals.ViewActive.length-2;
			Alloy.Globals.ActualSection = Alloy.Globals.ViewActive[i][0].section;
			
			if (Alloy.Globals.ActualSection == 'login')  //In case login active, header and menu don´t appers
			{
				Alloy.Globals.Header.visible = 'false';
				Alloy.Globals.Menu.visible = 'false';
			}
			

			var miniTimer = setTimeout(function () {
					clearInterval( miniTimer );
					utils.removeAllChildren(Alloy.Globals.viewContainerPrincipal);
					var section = Alloy.Globals.viewContainerPrincipal.add(Alloy.createController(Alloy.Globals.ViewActive[i][0].section, [Alloy.Globals.ViewActive[i][0].objectData]).getView());
					Alloy.Globals.ViewActive.pop();
					Ti.App.fireEvent('changeSection');
			}, 300);


		}
	
	}
	
	
};




//************************************************************************************************************************
//Trigger open/close menu
//************************************************************************************************************************
exports.handlerMenu = function(){
	
	if (Alloy.Globals.MenuOpen === 'false')
	{
		
		Alloy.Globals.MenuOpen = 'true';
		
		if (Ti.Platform.osname === "iphone")
		{
			Alloy.Globals.mainContainer.animate(MoveRight);
		}
		else
		{
			Animator.animate(Alloy.Globals.mainContainer, {
		        duration : 300,
		        easing : Animator.EXP_OUT,
		        left: 250
		 	});
		}
		
		 
	}
	else
	{
		Alloy.Globals.MenuOpen = 'false';
		
		if (Ti.Platform.osname === "iphone")
		{
			Alloy.Globals.mainContainer.animate(MoveLeft);
		}
		else
		{
			Animator.animate(Alloy.Globals.mainContainer, {
		        duration : 300,
		        easing : Animator.EXP_OUT,
		        left: 0
		 	});
		}
	}
	
};


//************************************************************************************************************************
//Abrir una ventana de info
//************************************************************************************************************************
exports.OpenInfoWindow = function(message){
	
	if (Ti.Platform.osname == "iphone")
	{
		var opts = {
		  title: message
		};
		opts.buttonNames = [L('text_31')];
		
		var dialog = Ti.UI.createOptionDialog(opts).show();
	}
	else
	{
		var alertDialog = Titanium.UI.createAlertDialog({
		    title: 'Info',
		    message: message,
		    buttonNames: [L('text_31')]
		});

		alertDialog.show();
	}
	
};









