const form = document.querySelector('#search-form > form');
const input: HTMLInputElement | null = document.querySelector('#input-localization');

const sectionInfos = document.querySelector('#info-climate');

form?.addEventListener('submit', async(event) => {
    event.preventDefault();

    if (!input || !sectionInfos) return;

    const localization = input.value;

    if( localization.length < 3) {
        alert('O local precisa ter pelo menos, 3 letras');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localization}&appidAPIDOUSUARIO=&lang=pt-br&units=metric`)
        const data = await response.json();
        console.log(data)
    
        const infos = {
            temp: Math.round(data.main.temp),
            local: data.name,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        }
    
        sectionInfos.innerHTML = `
           <div class="climate-data">
                <h2>${infos.local}</h2>
                <span>${infos.temp}</span>
            </div>
    
            <img src="${infos.icon}"/>
        `;}
         catch (err) {
            console.log('Deu um erro na obtenção dos dados da API', err);
        }
});