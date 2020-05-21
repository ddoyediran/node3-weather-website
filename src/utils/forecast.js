const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&appid=3cd78840b48d38681911804a3084cc76&units=metric&lang=en'

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service', undefined);
        }

        else if(body.message) {
            callback('Unable to find the weather condition for the location', undefined);
        }

        else {
            const data = body;
            const condition = data.hourly[0].weather[0].description.slice(0, 1).toUpperCase() + data.hourly[0].weather[0].description.slice(1);  
            callback(undefined, (condition + ' now. It is currently ' + data.current.temp + ' degrees out there. ' + 'There is ' + data.current.humidity + '% chance of rain'));
        }
    })
};


  module.exports = forecast;