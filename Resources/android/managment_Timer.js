var Alloy = require("alloy");

exports.timeFromTo = function(stationFrom, stationTo) {
    var totalTime = 0;
    if ("" !== stationFrom && "" !== stationTo) if (Number(stationFrom.id) < Number(stationTo.id)) for (var i = Number(stationFrom.id - 1); i < Number(stationTo.id - 1); i++) totalTime += Number(Alloy.Collections.model__MetroStations.result[i].timeForward); else for (var i = Number(stationFrom.id - 1); i > Number(stationTo.id - 1); i--) totalTime += Number(Alloy.Collections.model__MetroStations.result[i].timeBack);
    var sec_num = parseInt(totalTime, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - 3600 * hours) / 60);
    var seconds = sec_num - 3600 * hours - 60 * minutes;
    10 > hours && (hours = "0" + hours);
    10 > minutes && (minutes = "0" + minutes);
    10 > seconds && (seconds = "0" + seconds);
    var time = minutes + "'" + seconds + '"';
    return time;
};