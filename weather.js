const API_KEY = "";



async function search(){
    const phrase = document.querySelector('input[type="text"]').value;
    const reponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${phrase}&limit=5&appid=${API_KEY}`);
    const data = await reponse.json();
    
    const ul = document.querySelector('form ul');
    ul.innerHTML = '';
    for(let i=0;i<data.length;i++){
        const {name,lat,long,country} = data[i];
        ul.innerHTML += `<li
        data-lat=${lat}
        data-long=${long}
        data-name=${name}
        >
        ${name} <span>${country}</span> </li>`
    }
}

const debounseSearch = _.debounce(()=>{
    search();
},600);


document.querySelector('input[type="text"]').addEventListener("keyup",debounseSearch);
