var managment_View = require('managment_View');

	// set android-only options
	var androidOptions={
	    focusAppOnPush:false,
	    showAppOnTrayClick:true,
	    showTrayNotification:true,
	    showTrayNotificationsWhenFocused:false,
	    singleCallback:true
	};
	
	// set blackberry-only options
	var blackberryOptions={
	    appId : "4427-7h6l37627mrr0I3956a74om7643M17l7921",
	    ppgUrl : "http://cp4427.pushapi.eval.blackberry.com",
	    usePublicPpg : true,
	    launchApplicationOnPush : true
	};
	
	var onReceive=function(evt){
	    //alert('A push notification was received!');
	    
	    var payload = JSON.parse(evt.payload);
	    //managment_View.OpenInfoWindow(payload._id);
	    if (payload._id == '')
	    {
	    	 managment_View.OpenSectionParam('press',[],'', Alloy.Globals.ActualContainer);
	    }
	    else
	    {
	    	 managment_View.OpenSectionParam('pressDetail',[payload._id],'', Alloy.Globals.ActualContainer);
	    }
	   
	   
	   console.log('A push notification was received!' + JSON.stringify(evt));
	};
	
	
	var onLaunched=function(evt){
	    //alert('A push notification was received - onLaunched');
	   
	    var payload = JSON.parse(evt.payload);
	    //managment_View.OpenInfoWindow(payload._id);
	    if (payload._id == '')
	    {
	    	 managment_View.OpenSectionParam('press',[],'', Alloy.Globals.ActualContainer);
	    }
	    else
	    {
	    	 managment_View.OpenSectionParam('pressDetail',[payload._id],'', Alloy.Globals.ActualContainer);
	    }
	    
	    console.log('A push notification was received!' + JSON.stringify(evt));
	};
	
	
	// set android-only event
	var onFocused=function(evt){
	    Ti.API.info('A push notification onFocused');
	};
	
	// load library
	var ACSP=require('acspush');
	
	if (Ti.Platform.osname == "iphone")
	{
		// or make it as guest
		var ACSPush=new ACSP.ACSPush();
	}
	else
	{
		// create instance with your own or the user's username and password
		var ACSPush=new ACSP.ACSPush('javigonz','123456');
	}
		
	Ti.API.info('registrar device al PUSH');
	
	// set the channel to subscribe to
	var channel='AllUsers';
	
	// register this device
	ACSPush.registerDevice(channel,onReceive,onLaunched,onFocused,androidOptions,blackberryOptions);
	
	// unregister this device
	//ACSPush.unsubscribeFromChannel(channel,token,onSuccess,onFail);