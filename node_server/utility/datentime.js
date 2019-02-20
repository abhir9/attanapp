module.exports= function () {
    var datentime={};
    var timeNow= new Date();
    var shortMonthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format;

    datentime.time= timeNow.toLocaleTimeString();
    datentime.date= timeNow.toLocaleDateString();
    datentime.month= shortMonthName(timeNow);
    datentime.year= timeNow.getUTCFullYear();
    datentime.timeNow= timeNow;
    datentime.timeNowLocal= timeNow.toLocaleString();

    return datentime;
}

