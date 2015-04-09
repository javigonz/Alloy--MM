var managment_View = require('managment_View');
var managment_Timer = require('managment_Timer');
var Draggable = require('ti.draggable');

if (Ti.Platform.osname === "android")
	var Animator = require('com.animecyc.animator'); //Solo para Android


var capabilities = Titanium.Platform.displayCaps.dpi / 160;
var openArrivedView = 'false';
var picker_dataOrigen 	= [];
var picker_dataDestino 	= [];
var station_origen = "";
var station_destino = "";

var MoveUp_Opacity = Titanium.UI.createAnimation({
    curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
    duration: 300,
    bottom: '-75'
});

var MoveDown_OpacityAndroid = Titanium.UI.createAnimation({
    curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
    duration: 200,
    bottom: '-215'
});

var MoveDown_OpacityiPhone = Titanium.UI.createAnimation({
    curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
    duration: 200,
    bottom: '-210'
});



show();



/* ***********************************************************
 * Public functions
 * ***********************************************************/


/* ***********************************************************
 * Private functions
 * ***********************************************************/


function show(){

	//Add the actual view container
	Alloy.Globals.ActualContainer = $.viewLines;
	Alloy.Globals.ActualSection = "lines";
	
	Alloy.Globals.Header.children[0].children[1].text = L('text_4');
	
	if (Ti.Platform.osname == "android"){
		picker_dataOrigen.push(Titanium.UI.createPickerRow({title: L('text_23'), id: 0}));
		picker_dataDestino.push(Titanium.UI.createPickerRow({title: L('text_24'), id: 0}));
	}
	
	Alloy.Collections.model__MetroStations.result.forEach(function (element, index, array) {
		picker_dataOrigen.push(Titanium.UI.createPickerRow({title: element.title, id: element.id}));
		picker_dataDestino.push(Titanium.UI.createPickerRow({title: element.title, id: element.id}));
		
	});
	
	$.viewHowArrivedTitle.addEventListener('click', handlerArrivedView);
	
	Ti.App.fireEvent('closeLoading');
    if (Ti.Platform.osname === "android")
    {
    	drawableAndroid();  	
    }
    else
    {
    	drawableIphone();
    }
    
    loadComboOrigen();
    loadComboDestino();


}



function drawableAndroid()
{
	
	var viewContainerDragable = Draggable.createView({
		left:            0,
		top:             0,
		width:           1000,
		height:          650,
		backgroundImage: '/images/lineasDeMetro.png'
	});
	
	$.containerLines.add(viewContainerDragable);
	
	// I guess the image size is 1000x707
	var calculateWidth1 = Alloy.CFG.WidthDeviceAndroid * (Math.floor(1000/Alloy.CFG.WidthDeviceAndroid));
	var calculateWidth2 = Alloy.CFG.WidthDeviceAndroid - (1000 - calculateWidth1);
	var maxHorizontalRight = calculateWidth1 - calculateWidth2;
	
	var calculateTop1 = Alloy.CFG.HeightDevice * (Math.floor(757/Alloy.CFG.HeightDevice)); //Add 50px to height cause the gap of the header
	var calculateTop2 = Alloy.CFG.HeightDevice - (757 - calculateTop1);
	var maxVerticalDown = calculateTop1 - calculateTop2;
	
	
	
	viewContainerDragable.addEventListener('end', function(e){
		
		if  (e.left > 0)
		{
			this.left = 0;
		}
		
		if (e.top > 0) 
		{
			this.top = 0;
		}
		
		if (  (((e.left / capabilities) * -1) > maxHorizontalRight) && (((e.top / capabilities) * -1) > maxVerticalDown) ) //Out of container down and right
		{
			Ti.API.info('Se sale por abajo y derecha');
			Animator.animate(this, {
		        duration : 300,
		        easing : Animator.EXP_OUT,
		        left: -maxHorizontalRight,
		        top: -maxVerticalDown
		 	});
		}
		else
		{
			if ( ((e.left / capabilities) * -1) > maxHorizontalRight ) //Out of container right
			{	
				Ti.API.info('Se sale por derecha');
				Animator.animate(this, {
			        duration : 300,
			        easing : Animator.EXP_OUT,
			        left: -maxHorizontalRight
			 	});
			}
			
			if ( ((e.top / capabilities) * -1) > maxVerticalDown ) //Out of container down
			{
				Ti.API.info('Se sale por abajo');
				Animator.animate(this, {
			        duration : 300,
			        easing : Animator.EXP_OUT,
			        top: -maxVerticalDown
			 	});
	
			}
		}
	
	});
}



function drawableIphone()
{

	var viewContainerDragable = Draggable.createView({
		left:            0,
		top:             0,
		width:           1000,
		height:          650,
		backgroundImage: '/images/lineasDeMetro.png'
	});
	
	$.containerLines.add(viewContainerDragable);
	
	// I guess the image size is 1000x707
	var calculateWidth1 = Alloy.CFG.WidthDeviceIphone * (Math.floor(1000/Alloy.CFG.WidthDeviceIphone));
	var calculateWidth2 = Alloy.CFG.WidthDeviceIphone - (1000 - calculateWidth1);
	var maxHorizontalRight = calculateWidth1 - calculateWidth2;
	
	var calculateTop1 = Alloy.CFG.HeightDeviceIphone * (Math.floor(757/Alloy.CFG.HeightDeviceIphone)); //Add 50px to height cause the gap of the header
	var calculateTop2 = Alloy.CFG.HeightDeviceIphone - (757 - calculateTop1);
	var maxVerticalDown = calculateTop1 - calculateTop2;
	
	
	viewContainerDragable.addEventListener('end', function(e){

		if  (e.left > 0)
		{
			this.left = 0;
		}
		
		if (e.top > 0) 
		{
			this.top = 0;
		}
		
		if (  (((e.left ) * -1) > maxHorizontalRight) && (((e.top) * -1) > maxVerticalDown) ) //Out of container down and right
		{
			this.left = -maxHorizontalRight;
			this.top = -maxVerticalDown;
		}
		else
		{
			if ( ((e.left ) * -1) > maxHorizontalRight ) //Out of container right
			{
				this.left = -maxHorizontalRight;
				this.top = e.top;

			}
			
			if ( ((e.top) * -1) > maxVerticalDown ) //Out of container down
			{
				this.left = e.left;
				this.top = -maxVerticalDown;
			}
		}
	
	});
}



function loadComboOrigen(){
	
		if (Ti.Platform.osname === "android")
		{
			//estilo
			var pickerStyle = $.createStyle({classes: ['pickerStyle']});
									
			var picker = Titanium.UI.createPicker({});
			picker.selectionIndicator=true;
			picker.applyProperties(pickerStyle);
											
			picker.add(picker_dataOrigen);
											
			picker.addEventListener('change', function(){					
						
						if (picker.getSelectedRow(0).id !== 0)  //Me aseguro que no elija en el picker el primer campo que es el de 'Seleccione estacion de Origen'
						{
							station_origen = Alloy.Collections.model__MetroStations.result[ picker.getSelectedRow(0).id - 1];
							$.textMinutes.text = managment_Timer.timeFromTo(station_origen, station_destino);
						}
						
															
			});
			
			//Imagen de flecha abajo
			var imagen1 = Ti.UI.createImageView({
							image: '/images/downArrow.png',
							right: 10
			});
												
			
			$.comboHowArrivedOrigen.add(imagen1);		
			$.comboHowArrivedOrigen.add(picker);

		}
		else  //Iphone
		{
			
			var picker_view = Titanium.UI.createView({
				height:251,
				bottom:-351
			});
		
			var cancel =  Titanium.UI.createButton({
					title:L('text_20'),
					style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
			});
				
			var done =  Titanium.UI.createButton({
					title:L('text_21'),
					style:Titanium.UI.iPhone.SystemButtonStyle.DONE
			});
				
			var spacer =  Titanium.UI.createButton({
					systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
			});
				
				
			var toolbar =  Titanium.UI.iOS.createToolbar({
					top:0,
					items:[cancel,spacer,done]
			});
				
			var picker = Titanium.UI.createPicker({
						top:43
			});
				
			picker.selectionIndicator=true;
				
			picker.add(picker_dataOrigen); 
			
			picker_view.add(toolbar);
			picker_view.add(picker);
				
			var slide_in =  Titanium.UI.createAnimation({bottom:0});
			var slide_out =  Titanium.UI.createAnimation({bottom:-351});
				
			$.comboHowArrivedOrigen.addEventListener('focus', function() {
					picker_view.animate(slide_in);
					$.comboHowArrivedOrigen.blur();
			});
				
				
			cancel.addEventListener('click',function() {
					picker_view.animate(slide_out);
			});
				
			done.addEventListener('click',function() {
					$.comboHowArrivedOrigen.value =  picker.getSelectedRow(0).title;
					picker_view.animate(slide_out);	
					station_origen = Alloy.Collections.model__MetroStations.result[ picker.getSelectedRow(0).id - 1];
					$.textMinutes.text = managment_Timer.timeFromTo(station_origen, station_destino);							
			});
			
			//Imagen de flecha abajo
			var imagen1 = Ti.UI.createImageView({
							image: '/images/downArrow.png',
							right: 10
			});
												
			
			$.comboHowArrivedOrigen.add(imagen1);
				

				
			$.viewLines.add(picker_view);
		}
}



function loadComboDestino(){
	
		if (Ti.Platform.osname === "android")
		{
			//estilo
			var pickerStyle = $.createStyle({classes: ['pickerStyle']});
									
			var picker = Titanium.UI.createPicker({});
			picker.selectionIndicator=true;
			picker.applyProperties(pickerStyle);
											
			picker.add(picker_dataDestino);
											
			picker.addEventListener('change', function(){
						if (picker.getSelectedRow(0).id !== 0)  //Me aseguro que no elija en el picker el primer campo que es el de 'Seleccione estacion de Destino'
						{				
							station_destino = Alloy.Collections.model__MetroStations.result[ picker.getSelectedRow(0).id - 1];	
							$.textMinutes.text = managment_Timer.timeFromTo(station_origen, station_destino);	
						}										
			});
			
			//Imagen de flecha abajo
			var imagen1 = Ti.UI.createImageView({
							image: '/images/downArrow.png',
							right: 10
			});
												
			
			$.comboHowArrivedDestino.add(imagen1);		
			$.comboHowArrivedDestino.add(picker);

		}
		else  //Iphone
		{
			
			var picker_view = Titanium.UI.createView({
				height:251,
				bottom:-351
			});
		
			var cancel =  Titanium.UI.createButton({
					title:L('text_20'),
					style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
			});
				
			var done =  Titanium.UI.createButton({
					title:L('text_21'),
					style:Titanium.UI.iPhone.SystemButtonStyle.DONE
			});
				
			var spacer =  Titanium.UI.createButton({
					systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
			});
				
				
			var toolbar =  Titanium.UI.iOS.createToolbar({
					top:0,
					items:[cancel,spacer,done]
			});
				
			var picker = Titanium.UI.createPicker({
						top:43
			});
				
			picker.selectionIndicator=true;
				
			picker.add(picker_dataDestino); 
			
			picker_view.add(toolbar);
			picker_view.add(picker);
				
			var slide_in =  Titanium.UI.createAnimation({bottom:0});
			var slide_out =  Titanium.UI.createAnimation({bottom:-351});
				
			$.comboHowArrivedDestino.addEventListener('focus', function() {
					picker_view.animate(slide_in);
					$.comboHowArrivedDestino.blur();
			});
				
				
			cancel.addEventListener('click',function() {
					picker_view.animate(slide_out);
			});
				
			done.addEventListener('click',function() {
					$.comboHowArrivedDestino.value =  picker.getSelectedRow(0).title;
					picker_view.animate(slide_out);	
					station_destino = Alloy.Collections.model__MetroStations.result[ picker.getSelectedRow(0).id - 1];	
					$.textMinutes.text = managment_Timer.timeFromTo(station_origen, station_destino);						
			});
			
			//Imagen de flecha abajo
			var imagen1 = Ti.UI.createImageView({
							image: '/images/downArrow.png',
							right: 10
			});
												
			
			$.comboHowArrivedDestino.add(imagen1);
				

				
			$.viewLines.add(picker_view);
		}
}




/* ***********************************************************
 * Handler functions
 * ***********************************************************/
function handlerArrivedView(){
	
	if (openArrivedView == 'true'){
		
		openArrivedView = 'false';
		if (Ti.Platform.osname === "android")
		{
			$.viewHowArrived.animate(MoveDown_OpacityAndroid);
		}
		else{
			$.viewHowArrived.animate(MoveDown_OpacityiPhone);
		}
		
	}else{
		
		openArrivedView = 'true';
		$.viewHowArrived.animate(MoveUp_Opacity);
	}
	
}
