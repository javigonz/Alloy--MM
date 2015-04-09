//Manejador de la carga de datos dinámicos (WebServices)

var managment_View = require('managment_View');


//SERVIDOR DE PRODUCCCIÓN
var url_WebService_Scheduler = "http://hechoenmijas.solbyte.com.es/ws.php?c=Eventos&m=getAll";

 var fileJson_press = {
						    "code": "1",
						    "result": [
						        {
						            "id": "1",
						            "title": "El metro de Málaga tendrá cobertura de telefonía móvil antes del verano",
						            "date": "24/02/2015",
						            "image": "http://metromalaga.es/wp-content/themes/base/includes/timthumb/timthumb.php?src=http://metromalaga.es/wp-content/uploads/2015/02/Foto-Metro-M%C3%A1laga-Movistar.jpg&w=700&h=350&zc=1"
						        },
						        {
						            "id": "2",
						            "title": "El metro de Málaga tendrá cobertura de telefonía móvil antes del verano",
						            "date": "22/02/2015",
						            "image": "http://metromalaga.es/wp-content/themes/base/includes/timthumb/timthumb.php?src=http://metromalaga.es/wp-content/uploads/2015/02/IMG_7525.jpg&w=700&h=350&zc=1"
						        },
						        {
						            "id": "3",
						            "title": "El metro de Málaga tendrá cobertura de telefonía móvil antes del verano",
						            "date": "22/02/2015",
						            "image": "http://metromalaga.es/wp-content/themes/base/includes/timthumb/timthumb.php?src=http://metromalaga.es/wp-content/uploads/2015/02/IMG_7525.jpg&w=700&h=350&zc=1"
						        },
						        {
						            "id": "4",
						            "title": "El metro de Málaga tendrá cobertura de telefonía móvil antes del verano",
						            "date": "22/02/2015",
						            "image": "http://metromalaga.es/wp-content/themes/base/includes/timthumb/timthumb.php?src=http://metromalaga.es/wp-content/uploads/2015/02/IMG_7525.jpg&w=700&h=350&zc=1"
						        },
						        {
						            "id": "5",
						            "title": "El metro de Málaga tendrá cobertura de telefonía móvil antes del verano",
						            "date": "22/02/2015",
						            "image": "http://metromalaga.es/wp-content/themes/base/includes/timthumb/timthumb.php?src=http://metromalaga.es/wp-content/uploads/2015/02/IMG_7525.jpg&w=700&h=350&zc=1"
						        },
						        {
						            "id": "6",
						            "title": "El metro de Málaga tendrá cobertura de telefonía móvil antes del verano",
						            "date": "22/02/2015",
						            "image": "http://metromalaga.es/wp-content/themes/base/includes/timthumb/timthumb.php?src=http://metromalaga.es/wp-content/uploads/2015/02/IMG_7525.jpg&w=700&h=350&zc=1"
						        }
						        ]};
						        

				        



//************************************************************************************************************************
//Load image asíncronamente y gestiona la caché
//************************************************************************************************************************
exports.LoadImage_AsynCache = function(url, imageRemote){
	

	var cacheFilename = url.replace(/[^a-zA-Z0-9\.]/ig, '_');
	var cacheFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, cacheFilename);	
	
	if (cacheFile.exists() ) {
		
		Ti.API.info("IMAGEN REMOTA CACHEADA: " );
		imageRemote.image = cacheFile.nativePath;
			
	}
	else {
		Ti.API.info("IMAGEN REMOTA NO CACHEADA:" );
		var xhr = Ti.Network.createHTTPClient({

					     onload : function(e) {
								imageRemote.image = xhr.responseData;
								cacheFile.write(xhr.responseData);  
					     },
					     
					     onerror : function(e) {
					        	// Ti.API.info('ERROR EN LA CARGA');
					     },
					     
					     timeout : 5000  // in milliseconds
		});
				
			       
		xhr.validatesSecureCertificate = false;
	 	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			       
		xhr.open('GET', url); 
		xhr.send();
	
	}

	
};

//************************************************************************************************************************
//Carga WEBSERVICE de Agenda
//************************************************************************************************************************
exports.LoadWebService_Scheduler = function(){
	
	var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	
	     		try{
			         var schedulers = Alloy.Collections.model_scheduler;
					// schedulers.add((JSON.parse (this.responseText)).result);
					// schedulers.add(fileJson_press.result);
					 Alloy.Collections.model__Press = fileJson_press;
					// schedulers.fecth();
					 
					
			         Ti.App.fireEvent('loadScheduler');
	     		}
	     		catch (e){
	     			
	     			 Ti.App.fireEvent('closeLoading');
	     			 Ti.API.info('Datos NO1 cargados');
	     			 //managment_View.OpenInfoWindow( L('text_6'));
	     		}
	        

	     },
	     onerror : function(e) {
	         Ti.App.fireEvent('closeLoading');
	         Ti.API.info('Datos NO2 cargados');
	         //managment_View.OpenInfoWindow( L('text_6'));
	     },
	     timeout : 10000  // in milliseconds
 	});
 	
    client.validatesSecureCertificate = false;

 	client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 	
 	client.open("POST", url_WebService_Scheduler);

	client.send();
	
	
};

