"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector('#search-form > form');
const input = document.querySelector('#input-localization');
const sectionInfos = document.querySelector('#info-climate');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionInfos)
        return;
    const localization = input.value;
    if (localization.length < 3) {
        alert('O local precisa ter pelo menos, 3 letras');
        return;
    }
    try {
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localization}&appid=ba3d72ecdab1eb73739b7d6a68721285&lang=pt-br&units=metric`);
        const data = yield response.json();
        console.log(data);
        const infos = {
            temp: Math.round(data.main.temp),
            local: data.name,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        };
        sectionInfos.innerHTML = `
           <div class="climate-data">
                <h2>${infos.local}</h2>
                <span>${infos.temp}</span>
            </div>
    
            <img src="${infos.icon}"/>
        `;
    }
    catch (err) {
        console.log('Deu um erro na obtenção dos dados da API', err);
    }
}));
