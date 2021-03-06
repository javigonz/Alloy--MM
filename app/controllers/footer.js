var managment_View = require('managment_View');

Ti.App.addEventListener('changeSection', function(e) {
	changeSection();
});

show();


/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/
function show(){
	
	if (Ti.Platform.osname == "iphone")
	{
		$.viewFooter.top = Ti.Platform.displayCaps.platformHeight - 60;
		
		var widthButton = Alloy.CFG.WidthDeviceIphone / 5;
	}
	else
	{
		$.viewFooter.top = (Ti.Platform.displayCaps.platformHeight / (Titanium.Platform.displayCaps.dpi / 160)) - 85;
		
		var widthButton = Alloy.CFG.WidthDeviceAndroid / 5;
	}
	
	
	
	//Estilos
	var MenuView1 = $.createStyle({classes: ['MenuView1']});
	var MenuView2 = $.createStyle({classes: ['MenuView2']});	
	var MenuView3 = $.createStyle({classes: ['MenuView3']});
	var MenuView4 = $.createStyle({classes: ['MenuView4']});
	var MenuView5 = $.createStyle({classes: ['MenuView5']});
	var MenuViewOver = $.createStyle({classes: ['MenuViewOver']});
	var MenuText = $.createStyle({classes: ['MenuText']});	
	var MenuImage1 = $.createStyle({classes: ['MenuImage1']});	
	var MenuImage2 = $.createStyle({classes: ['MenuImage2']});	
	var MenuImage3 = $.createStyle({classes: ['MenuImage3']});	
	var MenuImage4 = $.createStyle({classes: ['MenuImage4']});	
	var MenuImage5 = $.createStyle({classes: ['MenuImage5']});	
	
	
	//Menú Horarios y Tarifas
	var view1 = Ti.UI.createView({});
	view1.applyProperties(MenuView1);
	view1.width = widthButton;
	view1.addEventListener('click', eventHandler_Scheduler);
	
	var label1 = Ti.UI.createLabel({});
	label1.applyProperties(MenuText);
	label1.width = widthButton-10;
	label1.text = L('text_10');
	
	var image1 = Titanium.UI.createImageView({
				image: '/images/menuIcon2.png'
	});
	image1.applyProperties(MenuImage1);
	
	view1.add(image1);	
	view1.add(label1);
	
	
	//Menú Noticias
	var view2 = Ti.UI.createView({});
	view2.applyProperties(MenuView2);
	view2.width = widthButton;
	view2.addEventListener('click', eventHandler_Press);
	
	var label2 = Ti.UI.createLabel({});
	label2.applyProperties(MenuText);
	label2.width = widthButton-5;
	label2.text = L('text_11');
	
	var image2 = Titanium.UI.createImageView({
				image: '/images/menuIcon9.png'
	});
	image2.applyProperties(MenuImage2);
	
	view2.add(image2);	
	view2.add(label2);
	
	
	//Menú Home
	var view3 = Ti.UI.createView({});
	view3.applyProperties(MenuView3);
	view3.width = widthButton;
	view3.addEventListener('click', eventHandler_Home);
	
	var label3 = Ti.UI.createLabel({});
	label3.applyProperties(MenuText);
	label3.width = widthButton-10;
	label3.text = L('text_9');
	
	var image3 = Titanium.UI.createImageView({
				image: '/images/menuIcon1.png'
	});
	image3.applyProperties(MenuImage3);
	
	view3.add(image3);	
	view3.add(label3);
	
	
	//Menú Tarifas
	var view4 = Ti.UI.createView({});
	view4.applyProperties(MenuView4);
	view4.width = widthButton;
	view4.addEventListener('click', eventHandler_Tarifas);
	
	var label4 = Ti.UI.createLabel({});
	label4.applyProperties(MenuText);
	label4.width = widthButton-10;
	label4.text = L('text_30');
	
	var image4 = Titanium.UI.createImageView({
				image: '/images/menuIcon12.png'
	});
	image4.applyProperties(MenuImage4);
	
	view4.add(image4);	
	view4.add(label4);
	
	
	
	//Menú Mapa
	var view5 = Ti.UI.createView({});
	view5.applyProperties(MenuView5);
	view5.width = widthButton;
	view5.addEventListener('click', eventHandler_Map);
	
	var label5 = Ti.UI.createLabel({});
	label5.applyProperties(MenuText);
	label5.width = widthButton-10;
	label5.text = L('text_13');
	
	var image5 = Titanium.UI.createImageView({
				image: '/images/menuIcon5.png'
	});
	image5.applyProperties(MenuImage5);
	
	view5.add(image5);	
	view5.add(label5);
	
	
	//Orden para insertar los menus
	$.viewFooter2.add(view1);
	$.viewFooter2.add(view4);
	$.viewFooter2.add(view3);
	$.viewFooter2.add(view2);
	$.viewFooter2.add(view5);
	
	//View Over
	$.viewOver.width = widthButton;

	
	
	
}


function changeSection(e)
{
	if (Ti.Platform.osname == "iphone")
	{
		
		var widthButton = Alloy.CFG.WidthDeviceIphone / 5;
	}
	else
	{
		
		var widthButton = Alloy.CFG.WidthDeviceAndroid / 5;
	}
	
	
	switch (Alloy.Globals.ActualSection) 
	{
		case 'home': 					$.viewOver.left = widthButton * 2;
										break;
		case 'scheduler':	   			$.viewOver.left = 0;
										break;
		case 'press':					$.viewOver.left = widthButton * 3;
										break;
		case 'lines':   				$.viewOver.left = widthButton;
										break;	
		case 'map':   					$.viewOver.left = widthButton * 4;
										break;	
		case 'tarifas':   				$.viewOver.left = widthButton;
										break;																
		default:						$.viewOver.left = -'600';
										break;																		
	}
	
}

/* ***********************************************************
 * Event handlers
 * ***********************************************************/

function eventHandler_Home(e)
{
	managment_View.OpenSectionParam('home',[],'', Alloy.Globals.ActualContainer);
}

function eventHandler_Press(e)
{
	managment_View.OpenSectionParam('press',[],'', Alloy.Globals.ActualContainer);
}

function eventHandler_Scheduler(e)
{
	managment_View.OpenSectionParam('scheduler',[],'', Alloy.Globals.ActualContainer);
}

function eventHandler_Lines(e)
{
	managment_View.OpenSectionParam('lines',[],'', Alloy.Globals.ActualContainer);
}

function eventHandler_Tarifas(e)
{
	managment_View.OpenSectionParam('tarifas',[],'', Alloy.Globals.ActualContainer);
}

function eventHandler_Map(e)
{
	managment_View.OpenSectionParam('map',[],'', Alloy.Globals.ActualContainer);
}


