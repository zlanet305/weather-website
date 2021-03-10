const request = require('request');

const weather = (address, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=78441bbe701602421def00bfdd55952c&query="+address;
    request({ url: url, json: true }, (error, response) => {
            if(error){
                callback("Cannot connect to the weather service", undefined);
            }else if(response.body.error){
                callback("Unable to find location", undefined);
            }else{
                callback(undefined, `The temperature is ${response.body.current.temperature}. Today there is ${response.body.current.precip} precipitation for ${address}. Weather report says ${response.body.current.weather_descriptions}.`, `${response.body.current.weather_icons}` );
            }
        })
}

module.exports = weather;