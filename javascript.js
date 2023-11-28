const htmler = document.querySelector('#htmler');
const caster = document.querySelector('#caster');
const tempholder = document.querySelector('#tempholder');
const temper = document.querySelector('#temper');
const areadiv = document.querySelector('#areadiv');
const searchform = document.querySelector('#searchform');
const celsiusbutton = document.querySelector('#celsiusbutton');
const farenheitbutton= document.querySelector('#farenheitbutton');
const searchbox = document.querySelector('#searchbox');
const weatherer = document.querySelector('#weather');
const searchaligner = document.querySelector('#searchaligner');
const datee = document.querySelector('#date');
const timee = document.querySelector('#time');
const humidity = document.querySelector('#gethumidity');
const chanceofrain = document.querySelector('#getcor');
const windspeed = document.querySelector('#getwind');
const feelslike = document.querySelector('#getfeels');
const forecasting = document.querySelector('#forecasting');
const fullforecasting = document.querySelector('#fullforecasting');

let area = "Coimbatore"

searchform.addEventListener('submit', (e) => {
    e.preventDefault();
    area = searchbox.value;
    forecaster();
    searchbox.value = "";
});

htmler.style.visibility = 'hidden';

async function forecaster() {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9c9acbf9a01448b1b3b144526232111&q=${area}&days=8&aqi=yes&alerts=no`, {mode: "cors"})
    response.json().then(function(response) {

        weatherer.innerText = `${response.current.condition.text}`;

        const truetimer = dayconverter(response.location.localtime);

        datee.innerText = `${truetimer[0]}`;

        timee.innerText = `${truetimer[1]}`;

        temper.innerText = `${response.current.temp_c} °C`;

        areadiv.innerText = `${response.location.name}, ${response.location.country}`;

        if(tempholder.lastChild.id == "iconer"){
            tempholder.removeChild(tempholder.lastElementChild);
            const iconer = document.createElement('img');
            iconer.setAttribute("id", "iconer"); 
            iconer.src = `https:${response.current.condition.icon}`;
            tempholder.appendChild(iconer);
        } else {
            const iconer = document.createElement('img');
            iconer.setAttribute("id", "iconer"); 
            iconer.src = `https:${response.current.condition.icon}`;
            tempholder.appendChild(iconer);
        }
        
        humidity.innerText = `${response.current.humidity} %`;

        chanceofrain.innerText = `${response.forecast.forecastday[0].day.daily_chance_of_rain} %`;

        windspeed.innerText = `${response.current.wind_kph} kph`;

        feelslike.innerText = `${response.current.feelslike_c} °C`;
            
        while(forecasting.firstChild) {
            forecasting.removeChild(forecasting.lastChild);
        }
        for (let i=0;i<=6;i++){
            const task = document.createElement('div');
            task.setAttribute('id', `forhead${i}`);
            task.setAttribute('class', `forhead`);

            const forecast1 = document.createElement('div');
            forecast1.setAttribute("id", `day${i}`);
            forecast1.setAttribute('class', "designfore");
            const dayer = dayconverter(response.forecast.forecastday[i+1].date);
            forecast1.innerText = `${dayer[3]}`;

            const forecast2 = document.createElement('img');
            forecast2.setAttribute("id", `pic${i}`);
            forecast2.setAttribute("class", `picss`);
            forecast2.src = `https:${response.forecast.forecastday[i+1].day.condition.icon}`;

            const forecast3 = document.createElement('div');
            forecast3.setAttribute(`id`, `temperature${i}`);
            forecast3.setAttribute('class', "designtemp");
            forecast3.innerText = `${response.forecast.forecastday[i+1].day.avgtemp_c} °C`;
            
            task.appendChild(forecast1);
            task.appendChild(forecast3);
            task.appendChild(forecast2);

            forecasting.appendChild(task);
        }
            
    htmler.style.visibility = 'visible';

    console.log(response);
    });
}

async function celsiusconverter() {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9c9acbf9a01448b1b3b144526232111&q=${area}&days=8&aqi=yes&alerts=no`, {mode: "cors"})
    response.json().then(function(response) {
        temper.innerText = `${response.current.temp_c} °C`;
        feelslike.innerText = `${response.current.feelslike_c} °C`;
        for (let i=0;i<=6;i++){
            const con = document.querySelector(`#temperature${i}`);
            con.innerText = `${response.forecast.forecastday[i+1].day.avgtemp_c} °C`;
        }
    });
}

async function farenheitcoverter() {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9c9acbf9a01448b1b3b144526232111&q=${area}&days=8&aqi=yes&alerts=no`, {mode: "cors"})
    response.json().then(function(response) {
        temper.innerText = `${response.current.temp_f} °F`;
        feelslike.innerText = `${response.current.feelslike_f} °F`;
        for (let i=0;i<=6;i++){
            const con = document.querySelector(`#temperature${i}`);
            con.innerText = `${response.forecast.forecastday[i].day.avgtemp_f} °F`;
        }
    });
}

window.onload = forecaster();

celsiusbutton.addEventListener('click', celsiustoggler);
farenheitbutton.addEventListener('click', fahrenheittoggler);

function celsiustoggler() {
    farenheitbutton.style.backgroundColor = 'white'; 
    celsiusbutton.style.backgroundColor = 'gray';
    celsiusconverter();
}

function fahrenheittoggler() {
    farenheitbutton.style.backgroundColor = 'gray'; 
    celsiusbutton.style.backgroundColor = 'white';
    farenheitcoverter();
}

function dayconverter(passdate) {
    let date = new Date(passdate);
    let timechanger = passdate.slice(11);
    let timechanged = timechanger.split(":")[0];
    let monthchanger = passdate.slice(5);
    let monthchanged = monthchanger.split("-")[0];
    let minuteschanger = timechanger.split(":")[1];
    let yearchanged = passdate.split("-")[0];
    let datechanger = passdate.slice(8);
    let datechanged = datechanger.split(" ")[0];
    let day = date.getDay();
    let realday = "";
    let meridian = "";
    let hour = "";
    let wholetimer = "";
    let minutes = minuteschanger;
    let dates = datechanged;
    let year = yearchanged;

    if(day == "0") {
        realday = "Sunday";
    } else if(day == "1") {
        realday = "Monday";
    } else if(day == "2") {
        realday = "Tuesday";
    } else if(day == "3") {
        realday = "Wednesday";
    } else if(day == "4") {
        realday = "Thursday";
    } else if(day == "5") {
        realday = "Friday";
    } else {
        realday = "Saturday";
    }

    if (timechanged > 12) {
        meridian = "pm";
        hour = timechanged % 12;
    } else if(timechanged == 0){
        hour = 12;
        meridian = "am";
    } else {
        hour = timechanged;
        meridian = "am";
    }

    switch (monthchanged) {
        case "1":
            month = "Jan";
            break;
        case "2":
            month = "Feb";
            break;
        case "3":
            month = "Mar";
            break;
        case "4":
            month = "Apr";
            break;
        case "5":
            month = "May";
            break;
        case "6":
            month = "Jun";
            break;
        case "7":
            month = "Jul";
            break;
        case "8":
            month = "Aug";
            break;
        case "9":
            month = "Sep";
            break;
        case "10":
            month = "Oct";
            break;
        case "11":
            month = "Nov";
            break;
        case "12":
            month = "Dec";
            break;
        default:
            month = "no";
    }

    wholetimer = `${realday}, ${dates}th ${month} ${year}`;
    let time = `${hour}:${minutes} ${meridian}`;

    return [wholetimer, time, date, realday];
}