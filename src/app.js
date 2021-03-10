const path = require('path');
const hbs = require('hbs');
const express = require('express');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express();
const port = process.env.PORT || 3000

//to create path for them
const publicDirectoryPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//for hbs specific
app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialPath);
//for static pages
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index',{
        title: 'weather',
        name: 'Zenab Wagla'
    });
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Zenab Wagla'
    });
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Zenab Wagla'
    });
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must send an address in url'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                Error: error
            });
        }
        weather(data.location, (error, data, img) => {
            if (error) {
                return res.send({
                    Error: 'error'
                });
            }
            res.send({
                Data: data,
                address: req.query.address,
                img
            });
        })
    })
})

app.get('/product', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must send search in url'
        })
    }
    console.log(req.query.search);
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404',
        error: 'Help article not found',
        name: 'Zenab Wagla'
    });
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        error: '404 Error !! Page not found !!',
        name: 'Zenab Wagla'
    });
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});