const moment = require("moment");
const notifier = require(`node-notifier`);

function eachHalfHour (callback) {
    
    nowTime = moment().add("minutes", 27).calendar();
    
    nowTime = nowTime.slice(9, -3);
    console.log(nowTime);
    
    nowTime = nowTime.split(":");
    
    hour = nowTime[0];
    minute = nowTime[1];
   
    if (minute == 30 || minute == 00) {
        callback(true);
    } else {
        callback(false);
    }
};

function notify () {
    notifier.notify({
        title: "Hey, are you focused?",
        message: "I am here to remember you to focus on your life!",
        icon: `rilari.png`
    })
};

setInterval(() => {
    eachHalfHour((response) => {
        if (response) notify();    
    });
}, 1000);