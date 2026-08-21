let flag = false;

document.getElementById('weather-form').addEventListener('submit', function (e) {
    e.preventDefault();

    if(!flag) {
        resetTimer();
        flag = true;
    }

});

function resetTimer()
{
    console.log("ResetTimerCalled")
    setTimeout(function() {
        counter = 0;
        resetTimer();
    }, 60000); //Reset counter every minute (5 searches per minute)
    
}