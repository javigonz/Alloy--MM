//Manejador de la carga de datos dinámicos (WebServices)

var managment_View = require('managment_View');


//SERVIDOR DE DESARROLLO
var url_WebService_News = "http://desarrollo.solbyte.com.es/metromalaga/ws.php?c=Noticias&m=getAll";
var url_WebService_New = "http://desarrollo.solbyte.com.es/metromalaga/ws.php?c=Noticias&m=getOneJSON&id=";
var url_WebService_SeccionHome = "http://desarrollo.solbyte.com.es/metromalaga/ws.php?c=Secciones&m=getOneJSON&id=1";
var url_WebService_SeccionScheduler = "http://desarrollo.solbyte.com.es/metromalaga/ws.php?c=Secciones&m=getOneJSON&id=2";
var url_WebService_SeccionCustomerService = "http://desarrollo.solbyte.com.es/metromalaga/ws.php?c=Secciones&m=getOneJSON&id=3";
var url_WebService_Regulation = "http://desarrollo.solbyte.com.es/metromalaga/ws.php?c=Secciones&m=getOneJSON&id=4";



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
			       
		xhr.open('GET', Alloy.Globals.UrlImages + url); 
		xhr.send();
	
	}

	
};



//************************************************************************************************************************
//Carga WEBSERVICE de Noticias
//************************************************************************************************************************
exports.LoadWebService_News = function(){
	
	var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	
	     		try{
					 Alloy.Collections.model__Press = JSON.parse(this.responseText);
					 Ti.App.fireEvent('loadNews');
	     		}
	     		catch (e){
	     			 Ti.App.fireEvent('closeLoading');
	     			 managment_View.OpenInfoWindow( L('text_27'));
	     		}
	        

	     },
	     onerror : function(e) {
	         Ti.App.fireEvent('closeLoading');
	         managment_View.OpenInfoWindow( L('text_27'));
	     },
	     timeout : 5000  // in milliseconds
 	});
 	
    client.validatesSecureCertificate = false;  
 	client.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    //client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 	
 	client.open("GET", url_WebService_News);
	client.send();
	
	
};


//************************************************************************************************************************
//Carga WEBSERVICE de Una Noticia
//************************************************************************************************************************
exports.LoadWebService_New = function(_id){
	
	var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	
	     		try{
					 Alloy.Collections.model__New = JSON.parse(this.responseText);
					 Ti.App.fireEvent('loadNew');
	     		}
	     		catch (e){
	     			 Ti.App.fireEvent('closeLoading');
	     			 managment_View.OpenInfoWindow( L('text_27'));
	     		}
	        

	     },
	     onerror : function(e) {
	         Ti.App.fireEvent('closeLoading');
	         managment_View.OpenInfoWindow( L('text_27'));
	     },
	     timeout : 5000  // in milliseconds
 	});
 	
    client.validatesSecureCertificate = false;  
 	client.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    //client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 	
 	client.open("GET", url_WebService_New + _id);
	client.send();
	
	
};



//************************************************************************************************************************
//Carga WEBSERVICE de Alerta de la Home
//************************************************************************************************************************
exports.LoadWebService_Alert = function(){
	
	var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	
	     		try{
					 Alloy.Collections.model__Alert = JSON.parse(this.responseText);
					 Ti.App.fireEvent('loadAlert');
	     		}
	     		catch (e){
	     			 Ti.App.fireEvent('closeLoading');
	     			 managment_View.OpenInfoWindow( L('text_27'));
	     		}
	        

	     },
	     onerror : function(e) {
	         Ti.App.fireEvent('closeLoading');
	         managment_View.OpenInfoWindow( L('text_27'));
	     },
	     timeout : 5000  // in milliseconds
 	});
 	
    client.validatesSecureCertificate = false;  
 	client.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    //client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 	
 	client.open("GET", url_WebService_SeccionHome);
	client.send();
	
	
};




//************************************************************************************************************************
//Carga WEBSERVICE de Sección Horarios
//************************************************************************************************************************
exports.LoadWebService_Scheduler = function(){
	
	var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	
	     		try{
					 Alloy.Collections.model__Scheduler = JSON.parse(this.responseText);
					 Ti.App.fireEvent('loadScheduler');
	     		}
	     		catch (e){
	     			 Ti.App.fireEvent('closeLoading');
	     			 managment_View.OpenInfoWindow( L('text_27'));
	     		}
	        

	     },
	     onerror : function(e) {
	         Ti.App.fireEvent('closeLoading');
	         managment_View.OpenInfoWindow( L('text_27'));
	     },
	     timeout : 5000  // in milliseconds
 	});
 	
    client.validatesSecureCertificate = false;  
 	client.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    //client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 	
 	client.open("GET", url_WebService_SeccionScheduler);
	client.send();
	
	
};



//************************************************************************************************************************
//Carga WEBSERVICE de Sección Atención al Cliente
//************************************************************************************************************************
exports.LoadWebService_CustomerService = function(){
	
	var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	
	     		try{
					 Alloy.Collections.model__CustomerService = JSON.parse(this.responseText);
					 Ti.App.fireEvent('loadSCustomoerService');
	     		}
	     		catch (e){
	     			 Ti.App.fireEvent('closeLoading');
	     			 managment_View.OpenInfoWindow( L('text_27'));
	     		}
	        

	     },
	     onerror : function(e) {
	         Ti.App.fireEvent('closeLoading');
	         managment_View.OpenInfoWindow( L('text_27'));
	     },
	     timeout : 5000  // in milliseconds
 	});
 	
    client.validatesSecureCertificate = false;  
 	client.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    //client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 	
 	client.open("GET", url_WebService_SeccionCustomerService);
	client.send();
	
	
};

//************************************************************************************************************************
//Carga WEBSERVICE de Sección Reglamento del viajero
//************************************************************************************************************************
exports.LoadWebService_Regulation = function(){
	
	var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	     	
	     		try{
					 Alloy.Collections.model__Regulation = JSON.parse(this.responseText);
					 Ti.App.fireEvent('loadRegulation');
	     		}
	     		catch (e){
	     			 Ti.App.fireEvent('closeLoading');
	     			 managment_View.OpenInfoWindow( L('text_27'));
	     		}
	        

	     },
	     onerror : function(e) {
	         Ti.App.fireEvent('closeLoading');
	         managment_View.OpenInfoWindow( L('text_27'));
	     },
	     timeout : 5000  // in milliseconds
 	});
 	
    client.validatesSecureCertificate = false;  
 	client.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    //client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 	
 	client.open("GET", url_WebService_Regulation);
	client.send();
	
	
};

