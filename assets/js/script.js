let formulario = document.querySelector('form.search')

formulario.addEventListener('submit', async (event)=>{
    event.preventDefault();
    clearInfo()
    
    let input = document.querySelector('#searchInput').value;

    if(input !== '') {
        showWarning('Loading...')
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=en_us`

        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200){
            mostrarInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windDeg: json.wind.deg,
                windSpeed: json.wind.speed
            });
        } else {
            clearInfo()
            showWarning("We couldn't find this place. :(");
        };
    }


});

function showWarning(msg) {
    document.querySelector('.warning').innerHTML = msg;
}

function mostrarInfo(json) {
    
    document.querySelector('.title').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${Math.trunc(json.temp)}<sup>ºC</sup>`
    document.querySelector('.windInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`
    document.querySelector('.windDot').style.transform = `rotate(${json.windDeg-90}deg)`
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    showWarning('');
    document.querySelector('.results').style.display = 'block';
}

function clearInfo() {
    document.querySelector('.results').style.display = 'none';
    showWarning('');
}