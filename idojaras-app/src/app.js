const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

const publicpath = path.join(__dirname, '../public')
const viewspath =  path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

app.use(express.static(publicpath))

app.get('', (req, res)=> {
    res.render('index',{
        title:'Időjárás app',
        name: 'Fási Milán'
    })
})
app.get('/pages', (req, res) =>{
    res.render('pages',{
        title: 'Oldalak',
        name: 'Fási Milán'
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'Hiba történt',
            body:'Kérem próbálja meg más adatokkal!'
        })
    }
    geocode(req.query.address,(error, { latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData) => {
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
        })
    })
})

app.get('*',(req,res) =>{
    res.render('404page',{
        name: 'Fási Milán',
        title: '404',
        errorMessage: 'Az oldal nem található'
    })
})

app.listen(3000, ()=>{
    console.log('A szerver a 3000 porton működik')
})