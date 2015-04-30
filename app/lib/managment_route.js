
var Alloy = require('alloy');



exports.createRoute = function(stationFrom, stationTo) {
	
	var drawLines = [];
	
	if ((stationFrom !== "") && (stationTo !== ""))
	{
		if(Number(stationFrom.id) < Number(stationTo.id))
		{
			for (var i=Number(stationFrom.id - 1);i <= Number(stationTo.id - 1); i++)
			{
				
				drawLines.push({
                        latitude: Alloy.Collections.model__MetroStations.result[i].latitude,
                        longitude: Alloy.Collections.model__MetroStations.result[i].longitude,
                        nombre: Alloy.Collections.model__MetroStations.result[i].title
            	 });
			}
		}
		else
		{
			for (var i=Number(stationFrom.id - 1);i >= Number(stationTo.id - 1); i--)
			{
				drawLines.push({
                        latitude: Alloy.Collections.model__MetroStations.result[i].latitude,
                        longitude: Alloy.Collections.model__MetroStations.result[i].longitude,
                        nombre: Alloy.Collections.model__MetroStations.result[i].title
            	 });
			}
		}
		
		
	}

	
	return drawLines;
    
};