var managment_View = require('managment_View');

show();



/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/


function show(){
	
	//Styles
	var viewRowMenu = $.createStyle({classes: ['viewRowMenu']});
	var labelMenu = $.createStyle({classes: ['labelMenu']});
	var separatorLine = $.createStyle({classes: ['separatorLine']});
	var style_icon = $.createStyle({classes: ['style_icon']});

	//Create Menu Rows
	//Menu Horarios
	var row1 = Ti.UI.createView({
		_id: '1'
	});
	row1.applyProperties(viewRowMenu);
	row1.top = 0;
	row1.addEventListener('click',handlerMenu);
		    
	var label1 = Ti.UI.createLabel({
		      text:L('text_15'),
		      _id: '1'
		    });
	label1.applyProperties(labelMenu);	
	
	var icon1 = Ti.UI.createImageView({
		image: '/images/menuIcon7.png'
	});
	icon1.applyProperties(style_icon);
		    
    //Gap line
	var line1 = Ti.UI.createView({});
	line1.applyProperties(separatorLine);
		
	row1.add(icon1);	
	row1.add(label1);   
	row1.add(line1);
	$.viewMenu.add(row1); 
	
	
	
	//Menu Billetes
	var row2 = Ti.UI.createView({
		_id: '2'
	});
	row2.applyProperties(viewRowMenu);
	row2.top = 46;
	row2.addEventListener('click',handlerMenu);
		    
	var label2 = Ti.UI.createLabel({
		      text: L('text_16'),
		      _id: '2'
		    });
	label2.applyProperties(labelMenu);	
	
	var icon2 = Ti.UI.createImageView({
		image: '/images/menuIcon8.png'
	});
	icon2.applyProperties(style_icon);
		    
    //Gap line
	var line2 = Ti.UI.createView({});
	line2.applyProperties(separatorLine);
		
	row2.add(icon2);	
	row2.add(label2);   
	row2.add(line2);
	$.viewMenu.add(row2); 	
	


}


/* ***********************************************************
 * Handler functions
 * ***********************************************************/

function handlerMenu(ev)
{
	switch (ev.source._id)
	{

		case '1':		managment_View.OpenSectionParam('customerService',[]);
						break;	
						
		case '2':		managment_View.OpenSectionParam('regulation',[]);
						break;	
															
		
	}
	
}
