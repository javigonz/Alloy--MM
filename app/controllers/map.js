var managment_View = require('managment_View');
var MapModule = require('ti.map');
var managment_Timer = require('managment_Timer');
var managment_route = require('managment_route');

var picker_data 	= [];
var userLocation 	= '';
var route 			= '';
var openArrivedView = 'false';
var map 			= '';

var capabilities = Titanium.Platform.displayCaps.dpi / 160;
var openArrivedView = 'false';
var picker_dataOrigen 	= [];
var picker_dataDestino 	= [];
var station_origen = "";
var station_destino = "";
var lastRoute = '';

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
	Alloy.Globals.ActualContainer = $.viewMap;
	Alloy.Globals.ActualSection = "map";
	
	Alloy.Globals.Header.children[0].children[1].text = L('text_7');
	
	if (Ti.Platform.osname == "android"){
		picker_dataOrigen.push(Titanium.UI.createPickerRow({title: L('text_23'), id: 0}));
		picker_dataDestino.push(Titanium.UI.createPickerRow({title: L('text_24'), id: 0}));
	}
	
	Alloy.Collections.model__MetroStations.result.forEach(function (element, index, array) {
		picker_dataOrigen.push(Titanium.UI.createPickerRow({title: element.title, id: element.id}));
		picker_dataDestino.push(Titanium.UI.createPickerRow({title: element.title, id: element.id}));
		
	});
	
	//$.viewHowArrivedTitle.addEventListener('click', handlerArrivedView);

   // loadComboOrigen();
   // loadComboDestino();
	

	if (Ti.Platform.osname === "iphone")
	{	
		Ti.API.info('UserLocation: ' + userLocation);	
		Ti.API.info('UserLocation Global: ' + Alloy.Globals.UserLocation);	
		
		createMapModule();
	}
	else
	{
		var rc = MapModule.isGooglePlayServicesAvailable();
		switch (rc) {
		    case MapModule.SUCCESS:
		        Ti.API.info('Google Play services is installed.');
		        Ti.API.info('UserLocation: ' + userLocation);	
				Ti.API.info('UserLocation Global: ' + Alloy.Globals.UserLocation);
		        createMapModule();
		        break;
		    case MapModule.SERVICE_MISSING:
		        Ti.API.info('SERVICE MISSING');       
		        Ti.App.fireEvent('closeLoading');
		        break;
		    case MapModule.SERVICE_VERSION_UPDATE_REQUIRED:
		        Ti.API.info('SERVICE_VERSION_UPDATE_REQUIRED');
		        Ti.App.fireEvent('closeLoading');
		        break;
		    case MapModule.SERVICE_DISABLED:
		        Ti.API.info('SERVICE_DISABLED');
		        Ti.App.fireEvent('closeLoading');
		        break;
		    case MapModule.SERVICE_INVALID:
		        Ti.API.info('SERVICE_INVALID');
		        Ti.App.fireEvent('closeLoading');
		        break;
		    default:
		        Ti.API.info('DEFAULT');
		        Ti.App.fireEvent('closeLoading');
		        break;
		}
	}

}



function createMapModule()
{
	var metroStations = [];
	var routePoints = [];
	//var pointDestiny = '36.712666,-4.431597';
	
	if (Ti.Platform.osname === "android"){
		picker_data.push(Titanium.UI.createPickerRow({title: L('text_22'), latitude: '36.712666', longitude: '-4.431597'}));
	}
	
	Alloy.Collections.model__MetroStations.result.forEach(function (element, index, array) {
		
		if (Ti.Platform.osname === "iphone")
		{
			var station = MapModule.createAnnotation({
			    latitude: 		element.latitude,
			    longitude: 		element.longitude,
			    image:			'/images/pinStation.png',   
			    title: 			element.title,
			    //subtitle: 		L('text_26') + ' ' + element.line,
			    subtitle: 		element.subtitle,
			    myid: 			element.id,
				rightButton:	Ti.UI.iPhone.SystemButton.DISCLOSURE,				
			    leftButton:     element.image,
			    animate:		'true'
			});
		}
		else
		{
			var station = MapModule.createAnnotation({
			    latitude: 		element.latitude,
			    longitude: 		element.longitude,
			    image:			'/images/pinStation.png',   
			    title: 			element.title,
			    //subtitle: 		L('text_26') + ' ' + element.line,
			    subtitle: 		element.subtitle,
			    myid: 			element.id,
			    rightView: 		Ti.UI.createLabel({
									text: L('text_19'),
									color: Alloy.CFG.GREEN,
									font:{size:8}
								}),		
			    leftButton:     element.image,
			    animate:		'true'
			});
		}
		
		metroStations.push(station);
		
		//Relleno el combo Picker de datos de estaciones
		picker_data.push(Titanium.UI.createPickerRow({title: element.title, latitude: element.latitude, longitude: element.longitude}));
		
	});
	

	map = MapModule.createView({
	    mapType: MapModule.NORMAL_TYPE,
	    //mapType: MapModule.HYBRID_TYPE,
	    region: {latitude: 36.712666, longitude: -4.431597, latitudeDelta: 0.2, longitudeDelta: 0.2 },
	    userLocation: true,
	    animate: true,
	    pitchEnabled: true,
        rotateEnabled: true,
        showsBuildings: true,
        showsPointsOfInterest: false,
	    annotations: metroStations
	});
	

	/*Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.PROVIDER_NETWORK = Titanium.Geolocation.PROVIDER_GPS;
	Titanium.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
	Titanium.Geolocation.distanceFilter = 10;
	Titanium.Geolocation.trackSignificantLocationChange = true;*/
	
	
	//CURRENT POSITION SÓLO PARA ANDROID
	if (Ti.Platform.osname === "android")
	{
		var providerGps = Ti.Geolocation.Android.createLocationProvider({
		    name: Ti.Geolocation.PROVIDER_GPS,
		    minUpdateDistance: 0.0,
		    minUpdateTime: 0
		});
		
		var gpsRule = Ti.Geolocation.Android.createLocationRule({
		    provider: Ti.Geolocation.PROVIDER_GPS,
		    minAge: 10000
		});
		
		
		var locationAdded = false; // used for lifecycle management, see below
		var locationCallback = function(e) {
			/*
			 * This is the function called each time a location is determined
			*/
		    if (!e.success || e.error) {
		    	// if there's an error ...
		        console.log('error:' + JSON.stringify(e.error));
		        return;
		    }
		
		    var longitude = e.coords.longitude;
		    var latitude = e.coords.latitude;
		    var altitude = e.coords.altitude;
		    var heading = e.coords.heading;
		    var accuracy = e.coords.accuracy;
		    var speed = e.coords.speed;
		    var timestamp = e.coords.timestamp;
		    var altitudeAccuracy = e.coords.altitudeAccuracy;
		
			Titanium.Geolocation.reverseGeocoder(latitude,longitude,function(evt) {
				if (evt.success) {
					var places = evt.places;
					console.log(places);
				}
				else {
					
				}
			});
		
			locationAdded = true;
		    Titanium.API.info('geo - location updated: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
		    userLocation = latitude + ',' + longitude;
       		Alloy.Globals.UserLocation = userLocation;
       		var regionUser={
	            latitude: 		latitude,
	            longitude: 		longitude,
	            animate:		true,
	            latitudeDelta:	0.1,
	            longitudeDelta:	0.1
	        };
       		map.setLocation(regionUser);
		};
		

		
		//  as the destroy handler will remove the listener, only set the pause handler to remove if you need battery savings
		Ti.Android.currentActivity.addEventListener('pause', function(e) {
			Ti.API.info("pause event received");
			if (locationAdded) {
				Ti.API.info("removing location callback on pause");
				Titanium.Geolocation.removeEventListener('location', locationCallback);
				locationAdded = false;
			}
		});
		Ti.Android.currentActivity.addEventListener('destroy', function(e) {
			Ti.API.info("destroy event received");
			if (locationAdded) {
				Ti.API.info("removing location callback on destroy");
				Titanium.Geolocation.removeEventListener('location', locationCallback);
				locationAdded = false;
			}
		});
		Ti.Android.currentActivity.addEventListener('resume', function(e) {
			Ti.API.info("resume event received");
			/*if (!locationAdded && locationCallback) {
				Ti.API.info("adding location callback on resume");
				Titanium.Geolocation.addEventListener('location', locationCallback);
				locationAdded = true;
			}*/
		});
		
		
	}	
	
	
	if (Ti.Platform.osname === "android"){
		Titanium.Geolocation.addEventListener('location', locationCallback);
	}
	else
	{
		//CURRENT POSITION SÓLO PARA IOS
		currentLocationIphone();
	}
		
		
	//
	// LISTENERS
	//
	map.addEventListener('complete', function(e){
		
		createDrawLine();
		$.viewHowArrivedTitle.addEventListener('click', handlerArrivedView);
		loadComboOrigen();
   		loadComboDestino();
    
	    Ti.App.fireEvent('closeLoading');
	});
	
	map.addEventListener('click', function(evt) {
	    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid + ' clickSource: ' + evt.clicksource);
	    
	    if (evt.clicksource == 'rightButton' || evt.clicksource == 'rightPane' || evt.clicksource == 'infoWindow') {
	       var URL = "https://www.google.es/maps/dir/Mi+ubicación/" + evt.annotation.latitude + "," + evt.annotation.longitude + "/@" + userLocation;
    	   Titanium.Platform.openURL(URL);
	    };
	});
	
	$.viewGoogleMap.add(map);
	
	//loadRoutes(map);

}

function currentLocationIphone(){
	
	Ti.API.info('consiguiendo la posicion del ususario ...');
	
	Ti.Geolocation.addEventListener('authorization',function(e){
	    Ti.API.info('authorization event:' + JSON.stringify(e));
	});
	


	if (Ti.Geolocation.locationServicesEnabled) 
	{
	    Titanium.Geolocation.purpose = 'Get Current Location';
	    Titanium.Geolocation.getCurrentPosition(function(e) 
	    {
			 if (e.error) 
			 {
			    // Ti.API.error('Error: ' + e.error);
			     //managment_View.OpenInfoWindow( L('text_29'));
			 } 
			 else 
			 {
			       var regionUser={
			            latitude: 		e.coords.latitude,
			            longitude: 		e.coords.longitude,
			            animate:		true,
			            latitudeDelta:	0.2,
			            longitudeDelta:	0.2
			        };
			        
			        userLocation = e.coords.latitude + ',' + e.coords.longitude;
			        Alloy.Globals.UserLocation = userLocation;
			        Ti.API.info('Localizacion Usuario conseguida: ' + userLocation);
			        //map.region = regionUser;
			        map.setLocation(regionUser);
			  }
	    });
	} 
	else 
	{
	    managment_View.OpenInfoWindow( L('text_28'));
	}
	
    
}


function loadRoutes(map){
	
		if (Ti.Platform.osname === "android")
		{
			//estilo
			var pickerStyle = $.createStyle({classes: ['pickerStyle']});
									
			var picker = Titanium.UI.createPicker({});
			picker.selectionIndicator=true;
			picker.applyProperties(pickerStyle);
											
			picker.add(picker_data);
											
			picker.addEventListener('change', function(){
						Ti.API.info('Estacion seleccionada: ' + picker.getSelectedRow(0).title);
						
						$.comboHowArrived.value =  picker.getSelectedRow(0).title;
						
						var pointDestiny = '';
						Alloy.Collections.model__MetroStations.result.forEach(function (element, index, array) {
	
							if (element.title == picker.getSelectedRow(0).title)
							{
								pointDestiny = element.latitude + ',' + element.longitude;
								
								if (route !== '')
								{
									map.removeRoute(route);
								}
								
								if (userLocation === '')
								{
									userLocation = Alloy.Globals.UserLocation;
								}
								
								addRoute({
								    map: map,
								    start: userLocation,
								    stop: pointDestiny
								});
								
								handlerArrivedView();
							}
						
						});
			});
			
			//Imagen de flecha abajo
			var imagen1 = Ti.UI.createImageView({
							image: '/images/downArrow.png',
							right: 10
			});
												
			
			$.comboHowArrived.add(imagen1);		
			$.comboHowArrived.add(picker);

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
				
			picker.add(picker_data); 
			
			picker_view.add(toolbar);
			picker_view.add(picker);
				
			var slide_in =  Titanium.UI.createAnimation({bottom:0});
			var slide_out =  Titanium.UI.createAnimation({bottom:-351});
				
			$.comboHowArrived.addEventListener('focus', function() {
					picker_view.animate(slide_in);
					$.comboHowArrived.blur();
			});
				
				
			cancel.addEventListener('click',function() {
					picker_view.animate(slide_out);
			});
				
			done.addEventListener('click',function() {
				
				/*Titanium.Geolocation.addEventListener('location',function(){
				    currentLocation();
				});*/
					$.comboHowArrived.value =  picker.getSelectedRow(0).title;
					picker_view.animate(slide_out);
					
					var pointDestiny = '';
					Alloy.Collections.model__MetroStations.result.forEach(function (element, index, array) {

						if (element.title == picker.getSelectedRow(0).title)
						{
							pointDestiny = element.latitude + ',' + element.longitude;
							
							if (route !== '')
							{
								map.removeRoute(route);
							}
							
							if (userLocation === '')
							{
								userLocation = Alloy.Globals.UserLocation;
							}
								
							addRoute({
							    map: map,
							    start: userLocation,
							    stop: pointDestiny
							});
							
							handlerArrivedView();
						}
					
					});
			
					
			});
			
			//Imagen de flecha abajo
			var imagen1 = Ti.UI.createImageView({
							image: '/images/downArrow.png',
							right: 10
			});
												
			
			$.comboHowArrived.add(imagen1);
				

				
			$.viewMap.add(picker_view);
		}
}






function decodeLine(encoded) {
    var len = encoded.length;
    var index = 0;
    var array = [];
    var lat = 0;
    var lng = 0;
 
    while (index < len) {
        var b;
        var shift = 0;
        var result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
 
        var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lat += dlat;
 
        shift = 0;
        result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
 
        var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lng += dlng;
 
        array.push([lat * 1e-5, lng * 1e-5]);
    }
 
    return array;
}


function addRoute(obj) {
    var xhr = Ti.Network.createHTTPClient();
    xhr.onload = function (e) {
        var response = this.responseText;
        var json = JSON.parse(response);
 
        var step = json.routes[0].legs[0].steps;
        var intStep = 0, intSteps = step.length, points = [];
        var decodedPolyline, intPoint = 0, intPoints = 0;
        for (intStep = 0; intStep < intSteps; intStep = intStep + 1) {
            decodedPolyline = decodeLine(step[intStep].polyline.points);
            intPoints = decodedPolyline.length;
            for (intPoint = 0; intPoint < intPoints; intPoint = intPoint + 1) {
                if (decodedPolyline[intPoint] != null) {
                    points.push({
                        latitude: decodedPolyline[intPoint][0],
                        longitude: decodedPolyline[intPoint][1]
                    });
                }
            }
        }
        
        route = MapModule.createRoute({
	        name : 'Como llegar',
	        points : points,
	        color : "red",
	        width : 4,
	        region: "es"
	        
	    });
	   
		obj.map.addRoute(route);
    };
    xhr.onerror = function (e) {
        Ti.API.info('error', JSON.stringify(e));
    };
    var param = [
    	//'mode= bicycling',
    	//'region=' + obj.region,
        'destination=' + obj.stop,
        'origin=' + obj.start,
        'sensor=true'
    ];
    /*if (obj.region) {
        param.region = obj.region;
    }*/
    xhr.open('GET', 'http://maps.googleapis.com/maps/api/directions/json?' + param.join('&'));
    xhr.send();
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
							
							var routes = managment_route.createRoute(station_origen, station_destino);
							console.log(station_origen.title);
							console.log(station_destino.title);	
							console.log(routes);
							if (routes.length !== 0)
							{
							   if (lastRoute !== '')
							   {
							   	map.removeRoute(lastRoute);
							   }
							   var route = MapModule.createRoute({
							        name : '',
							        points : routes,
							        color : "#009000",
							        width : 10,
							        region: "es"
							        
							   });
							   lastRoute = route;
							   map.addRoute(route);
							}					
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
					var routes = managment_route.createRoute(station_origen, station_destino);	
					console.log(station_origen.title);
					console.log(station_destino.title);	
					console.log(routes);
					if (routes.length !== 0)
					{
					   if (lastRoute !== '')
					   {
					   	map.removeRoute(lastRoute);
					   }
					   var route = MapModule.createRoute({
					        name : '',
					        points : routes,
					        color : "#009000",
					        width : 10,
					        region: "es"
					        
					   });
					   lastRoute = route;
					   map.addRoute(route);
					}						
			});
			
			//Imagen de flecha abajo
			var imagen1 = Ti.UI.createImageView({
							image: '/images/downArrow.png',
							right: 10
			});
												
			
			$.comboHowArrivedOrigen.add(imagen1);
				

				
			$.viewMap.add(picker_view);
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
							
							var routes = managment_route.createRoute(station_origen, station_destino);
							console.log(station_origen.title);
							console.log(station_destino.title);	
							console.log(routes);
							if (routes.length !== 0)
							{
							   if (lastRoute !== '')
							   {
							   	map.removeRoute(lastRoute);
							   }
							   var route = MapModule.createRoute({
							        name : '',
							        points : routes,
							        color : "#009000",
							        width : 10,
							        region: "es"
							        
							   });
							   lastRoute = route;
							   map.addRoute(route);
							}						
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
					var routes = managment_route.createRoute(station_origen, station_destino);
					console.log(station_origen.title);
					console.log(station_destino.title);	
					console.log(routes);
					if (routes.length !== 0)
					{
					   if (lastRoute !== '')
					   {
					   	map.removeRoute(lastRoute);
					   }
					   var route = MapModule.createRoute({
					        name : '',
					        points : routes,
					        color : "#009000",
					        width : 10,
					        region: "es"
					        
					   });
					   lastRoute = route;
					   map.addRoute(route);
					}					
			});
			
			//Imagen de flecha abajo
			var imagen1 = Ti.UI.createImageView({
							image: '/images/downArrow.png',
							right: 10
			});
												
			
			$.comboHowArrivedDestino.add(imagen1);
				

				
			$.viewMap.add(picker_view);
		}
}


//Crea las lineas dibujadas en el mapa de cada linea de metro
function createDrawLine(){

	  var drawLines1 = [];
	  var drawLines2 = [];
	  
	  Alloy.Collections.model__MetroStations.result.forEach(function (element, index, array) {
		
		if (element.line.length > 1)
		{
			 drawLines1.push({
	                        latitude: element.latitude,
	                        longitude: element.longitude
	             });
	             
	         drawLines2.push({
	                        latitude: element.latitude,
	                        longitude: element.longitude
	             });    
		}
		else
		{
			if (element.line[0] == '1')
			{
				 drawLines1.push({
	                        latitude: element.latitude,
	                        longitude: element.longitude
	             });
	
			}
			else
			{
				 drawLines2.push({
	                        latitude: element.latitude,
	                        longitude: element.longitude
	             });
			}
		}
		
		
		
	  });
	  
	   var route1 = MapModule.createRoute({
	        name : '',
	        points : drawLines1,
	        color : "#50FF0000",
	        width : 10,
	        region: "es"
	        
	   });
	   
	   map.addRoute(route1);
	   
	   var route2 = MapModule.createRoute({
	        name : '',
	        points : drawLines2,
	        color : "#50003bc0",
	        width : 10,
	        region: "es"
	        
	   });
	   
	   map.addRoute(route2);
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


