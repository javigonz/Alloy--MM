
var Alloy = require('alloy');



exports.timeFromTo = function(stationFrom, stationTo) {
	
	var totalTime = 0;
	
	if ((stationFrom !== "") && (stationTo !== ""))
	{
		if(Number(stationFrom.id) < Number(stationTo.id))
		{
			for (var i=Number(stationFrom.id - 1);i < Number(stationTo.id - 1); i++)
			{
				totalTime += Number(Alloy.Collections.model__MetroStations.result[i].timeForward);
			}
		}
		else
		{
			for (var i=Number(stationFrom.id - 1);i > Number(stationTo.id - 1); i--)
			{
				totalTime += Number(Alloy.Collections.model__MetroStations.result[i].timeBack);
			}
		}
	}
	
	var sec_num = parseInt(totalTime, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = minutes+"'"+seconds+"\"";

	
	return time;
    
};