
const idoForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#m-1')
const messageTwo = document.querySelector('#m-2')
const messageThree = document.querySelector('#m-3')
const messageFour = document.querySelector('#m-4')
const messageFive = document.querySelector('#m-5')
const messageSix = document.querySelector('#m-6')

messageTwo.textContent = ''
messageOne.textContent = 'Írjon be egy települést a keresőbe'
messageThree.textContent = ''
messageFour.textContent = ''
messageFive.textContent = ''
messageSix.textContent = ''
idoForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = data.body
            messageThree.textContent = ''
            messageFour.textContent = ''
            messageFive.textContent = ''
            messageSix.textContent = ''
        }else{
            messageOne.textContent = 'Itt: ' + data.location
            messageTwo.textContent = 'Jelenleg: '+  data.forecast.weather[0].description
            messageThree.textContent = 'Hőmérséklet:  ' + data.forecast.main.temp +'°C (Celsius-fok)'
            messageFour.textContent = 'Legalacsonyabb hőmérséklet:  '+ data.forecast.main.temp_min+ '°C (Celsius-fok)'
            messageFive.textContent = 'Legmagasabb hőmérséklet:  ' + data.forecast.main.temp_max+ '°C (Celsius-fok)'
            messageSix.textContent = 'Szél sebessége:  ' + data.forecast.wind.speed + ' km/h'
        }
    })
  })
})