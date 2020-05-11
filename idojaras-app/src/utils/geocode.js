const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWlsYW5mYXNpIiwiYSI6ImNrOGlkYXdhMjAwbG4zbnFsZjJld3hyZ20ifQ.KDnqEc6effMd7vxWlYGAFQ&limit=1'
 
    request({url,json:true},(error,{ body }) =>{
       if(error){
          callback('Hiba történt a csatlakozáskor!',undefined)
       }else if(body.features.length===0){
          callback('Hiba történt a hely megtalálásakor. Probálja meg új adattal!',undefined)
       }else{
          callback(undefined,{
             latitude:body.features[0].geometry.coordinates[1],
             longitude : body.features[0].geometry.coordinates[0],
             location: body.features[0].place_name
          })
       }
    })
 }
 module.exports = geocode