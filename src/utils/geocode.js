const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?limit=1&access_token=pk.eyJ1Ijoia2FjYW40NDg4MiIsImEiOiJja2FjdTJjeWgxazFrMnNtdHI4d3o5YTdpIn0._M2gQ30-A6T2Ar7vJPA02g';

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('unable to connect to location services', undefined);
        }

        else if(body.message) {
            callback('Location not defined',undefined)
        }

        else if(body.features.length === 0) {
            callback('Unable to find location, please try another search', undefined)
        }

        else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }

    })
}


module.exports = geocode;