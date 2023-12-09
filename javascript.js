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
const describe = document.querySelector('#describe');
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
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${area}/?key=RP9E6FKKGB2YDN8V2CYMF8BZF&unitGroup=uk`, {mode: "cors"})
    response.json().then(function(response) {

        console.log(response);

        weatherer.innerText = `${response.currentConditions.conditions}`;

        const truetimer = dayconverter(response.days[0].datetime);

        datee.innerText = `${truetimer[0]}`;
        
        describe.innerText = `${response.days[0].description}`;

        temper.innerText = `${response.currentConditions.temp} °C`;

        areadiv.innerText = `${response.resolvedAddress}`;

        if(tempholder.lastChild.id == "iconer"){
            tempholder.removeChild(tempholder.lastElementChild);
            const iconer = document.createElement('img');
            iconer.setAttribute("id", "iconer"); 
            iconer.src = `img/icon/${response.currentConditions.icon}.png`;
            tempholder.appendChild(iconer);
        } else {
            const iconer = document.createElement('img');
            iconer.setAttribute("id", "iconer"); 
            iconer.src = `img/icon/${response.currentConditions.icon}.png`;
            tempholder.appendChild(iconer);
        }
        
        humidity.innerText = `${response.currentConditions.humidity} %`;

        chanceofrain.innerText = `${response.currentConditions.cloudcover} %`;

        windspeed.innerText = `${response.currentConditions.windspeed} kph`;

        feelslike.innerText = `${response.currentConditions.feelslike} °C`;
            
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
            const dayer = dayconverter(response.days[i+1].datetime);
            forecast1.innerText = `${dayer[2]}`;

            const forecast2 = document.createElement('img');
            forecast2.setAttribute("id", `pic${i}`);
            forecast2.setAttribute("class", `picss`);
            forecast2.src = `img/icon/${response.days[i+1].icon}.png`;

            const forecast3 = document.createElement('div');
            forecast3.setAttribute(`id`, `temperature${i}`);
            forecast3.setAttribute('class', "designtemp");
            forecast3.innerText = `${response.days[i+1].temp} °C`;
            
            task.appendChild(forecast1);
            task.appendChild(forecast3);
            task.appendChild(forecast2);

            forecasting.appendChild(task);
        }
            
    htmler.style.visibility = 'visible';

    });
}

async function celsiusconverter() {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${area}/?key=RP9E6FKKGB2YDN8V2CYMF8BZF&unitGroup=uk`, {mode: "cors"})
    response.json().then(function(response) {
        temper.innerText = `${response.currentConditions.temp} °C`;
        feelslike.innerText = `${response.currentConditions.feelslike} °C`;
        for (let i=0;i<=6;i++){
            const con = document.querySelector(`#temperature${i}`);
            con.innerText = `${response.days[i+1].temp} °C`;
        }
    });
}

async function farenheitcoverter() {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${area}/?key=RP9E6FKKGB2YDN8V2CYMF8BZF&unitGroup=us`, {mode: "cors"})
    response.json().then(function(response) {
        temper.innerText = `${response.currentConditions.temp} °F`;
        feelslike.innerText = `${response.currentConditions.feelslike} °F`;
        for (let i=0;i<=6;i++){
            const con = document.querySelector(`#temperature${i}`);
            con.innerText = `${response.days[i].temp} °F`;
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

    console.log(hour);
    console.log(minutes);
    console.log(meridian);


    return [wholetimer, date, realday];
}