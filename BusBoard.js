//const readline = require('readline-sync');


//https://transportapi.com/v3/uk/bus/stop/490003025W/live.json?app_id=429d2986&app_key=31d8fbe68ead7b9abe6ea4720cbc9441&group=route&nextbuses=yes



//console.log('Please enter your bus sto code :')
//let userCode = readline.prompt();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

let atcoCode = '490003025W';
const busTimeRequest = new XMLHttpRequest();
const busTimeUrl = 'https://transportapi.com/v3/uk/bus/stop/490003025W/live.json?app_id=429d2986&app_key=31d8fbe68ead7b9abe6ea4720cbc9441&group=route&nextbuses=yes'

busTimeRequest.responseType = 'json';
busTimeRequest.open('GET', busTimeUrl);
busTimeRequest.onreadystatechange = () => {
    console.log(busTimeRequest.readyState)
    if (busTimeRequest.readyState === 4) {
        let busTimeResponse = JSON.parse(busTimeRequest.responseText);

        //console.log(busTimeResponse);
        console.log(busTimeResponse.departures['276']);
        let presentBusLines = Object.getOwnPropertyNames(busTimeResponse.departures); //this is an array of string
        console.log(presentBusLines);

        for (let i = 0; i < presentBusLines.length; i++) {
            let lineDepartures = busTimeResponse.departures[presentBusLines[i]]

            let nextDepartures = []
            for (let j = 0; j < lineDepartures.length; j++) {
                nextDepartures.push(lineDepartures[j].expected_departure_time)

            }

            if (nextDepartures.length > 0) {
                console.log(`the next departures times for line ${presentBusLines[i]} are ${nextDepartures}.`)
            }

            else {
                console.log('There is no expected departure for this bus.')
            }

        }

    }
}


busTimeRequest.send();


