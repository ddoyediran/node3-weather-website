const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

 
const app = express();

//Defined path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPaths = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//setup for handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPaths);
hbs.registerPartials(partialsPath)

//Steup static directory to serve
app.use(express.static(publicDirectoryPath));

//home
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dami Oye'
    })
})

//about using hbs
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Dami Oye'
    })
});

//help page using hbs
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Dami Oye'
    })
})



//about.com/weather page
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide a address query in the broswer'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    
        if(error) {
           return res.send({
                error: error
            });
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                })
            }
            
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })

});


//example
app.get('/product', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'Please provide a search query in the broswer'
        })
    } 

        console.log(req.query)
        res.send({
            product: []
        })
})


//error for a extension directory
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        text: 'Help article not found',
        name: 'Dami Oye'
    })
});

//display 404 error
app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        text: 'Page not found',
        name: 'Dami Oye'
    });
});



app.listen(3000, () => {
    console.log('Server is running on port 3000')
})