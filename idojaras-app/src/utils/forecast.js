const request = require('request')

const forecast = (lat,long,callback)=>{
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&units=metric&appid=163986994968b4007c782b0c20ab0068&lang=HU'
    request({url,json:true},(error,{ body })=>{
        if(error){
            callback('Hiba történt a csatlakozáskor',undefined)
        }else if(body.message){
            callback('Hiba történt a lekérdezéskor. Van internet elérése?',undefined)
        }else{
            callback(undefined,body)
        }
    })
}
module.exports=forecast