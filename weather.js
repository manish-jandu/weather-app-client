const API_KEY = "";



async function search(){
    const phrase = document.querySelector('input[type="text"]').value;
    const reponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${phrase}&limit=5&appid=${API_KEY}`);
    const data = await reponse.json();
    
    const ul = document.querySelector('form ul');
    ul.innerHTML = '';
    for(let i=0;i<data.length;i++){
        const {name,lat,lon,country} = data[i];
        ul.innerHTML += `<li
        data-lat=${lat}
        data-lon=${lon}
        data-name=${name}
        >
        ${name} <span>${country}</span> </li>`
    }
}

const debounseSearch = _.debounce(()=>{
    search();
},600);


document.querySelector('input[type="text"]').addEventListener("keyup",debounseSearch);

async function showWeather(lat,lon,name){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
    const data = await response.json();

    const temp = data.main.temp;
    const feelsLike = data.main.feels_like;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const icon = data.weather[0].icon;
    console.log({temp,feelsLike,humidity,wind,icon});

    document.getElementById('city').innerHTML = name;
    document.getElementById('degrees').innerHTML = temp+"<span>&#8451</span>";
    document.getElementById('windValue').innerHTML = wind + "<span>km/h</span>";
    document.getElementById('feelsLikeValue').innerHTML = feelsLike+"<span>&#8451</span>";
    document.getElementById('humidityValue').innerHTML = humidity + "<span>%</span>";

    document.getElementById('icon').src = `http://openweathermap.org/img/wn/${icon}@4x.png`;

    document.querySelector('form').style.display = 'none';
    document.getElementById('weather').style.display = 'block';
}

document.body.addEventListener('click',ev=>{
    const li = ev.target;
    const {lat,lon,name} =  li.dataset;

    if(!lat || !lon){
        return;
    }

    showWeather(lat,lon,name);
});


document.addEventListener('DOMContentLoaded', () => {
    const changeButton = document.getElementById('change');
  
    changeButton.addEventListener('click', (event) => {
      console.log('Clicking');
      document.querySelector('form').style.display = 'block';
      document.getElementById('weather').style.display = 'none';
    });
  });