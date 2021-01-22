//const readline = require('readline-sync');


//https://transportapi.com/v3/uk/bus/stop/490003025W/live.json?app_id=429d2986&app_key=31d8fbe68ead7b9abe6ea4720cbc9441&group=route&nextbuses=yes



//console.log('Please enter your bus sto code :')
//let userCode = readline.prompt();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// let examplePostcode = 'NW6 3AA';
// const postcodeGeoLocRequest= new XMLHttpRequest();
// const postcodeGeoLocURL = 'http://api.postcodes.io/postcodes/NW6%203AA'
// postcodeGeoLocRequest.responseType ='json';
// postcodeGeoLocRequest.open('GET', postcodeGeoLocURL);
// postcodeGeoLocRequest.onreadystatechange = ()=>{
//     console.log(postcodeGeoLocRequest.readyState);
//     if(postcodeGeoLocRequest.readyState === 4){
//         let postcodeGeoLoc =JSON.parse(postcodeGeoLocRequest.responseText);

//         console.log(postcodeGeoLoc);

//         let postcodeLong = postcodeGeoLoc.result.longitude;
//         let postcodeLat = postcodeGeoLoc.result.latitude;
       
//         console.log(postcodeLong +' and '+ postcodeLat);
//     }
// }

// postcodeGeoLocRequest.send();

const nearStopRequest =new XMLHttpRequest();
const nearStopsURL ='http://transportapi.com/v3/uk/places.json?app_id=429d2986&app_key=31d8fbe68ead7b9abe6ea4720cbc9441&lat=51.541873&lon=-0.190599&type=bus_stop'
nearStopRequest.responseType='json';
nearStopRequest.open('GET',nearStopsURL);
nearStopRequest.onreadystatechange = () =>{
    console.log(nearStopRequest.readyState);
    if(nearStopRequest.readyState === 4){
        
        let nearStops = JSON.parse(nearStopRequest.responseText);
        console.log(nearStops);

        let firstStop='';
        let secondStop ='';

        if(nearStops.member[0].atcocode === undefined && nearStops.member[1].atcocode=== undefined ){
            console.log( 'There is no bus stop in the 500  meters around you.')
        }
        else if( nearStops.member[0].atcocode && nearStops.member[1].atcocode=== undefined){
         firstStop = nearStops.member[0].atcocode
        }
        else if (nearStops.member[0].atcocode && nearStops.member[1].atcocode){
            firstStop = nearStops.member[0].atcocode
            secondStop = nearStops.member[1].atcocode
        }
        secondStop = nearStops.member[1].atcocode

        console.log( firstStop +' and '+ secondStop)
    }
}
nearStopRequest.send();


// let atcoCode = '490003025W';
// const busTimeRequest = new XMLHttpRequest();
// const busTimeUrl = 'https://transportapi.com/v3/uk/bus/stop/490003025W/live.json?app_id=429d2986&app_key=31d8fbe68ead7b9abe6ea4720cbc9441&group=route&nextbuses=yes'

// busTimeRequest.responseType = 'json';
// busTimeRequest.open('GET', busTimeUrl);
// busTimeRequest.onreadystatechange = () => {
//     console.log(busTimeRequest.readyState)
//     if (busTimeRequest.readyState === 4) {
//         let busTimeResponse = JSON.parse(busTimeRequest.responseText);

//         //console.log(busTimeResponse);
//         console.log(busTimeResponse.departures['276']);
//         let presentBusLines = Object.getOwnPropertyNames(busTimeResponse.departures); //this is an array of string
//         console.log(presentBusLines);

//         for (let i = 0; i < presentBusLines.length; i++) {
//             let lineDepartures = busTimeResponse.departures[presentBusLines[i]]

//             let nextDepartures = []
//             for (let j = 0; j < lineDepartures.length; j++) {
//                 nextDepartures.push(lineDepartures[j].expected_departure_time)

//             }

//             if (nextDepartures.length > 0) {
//                 console.log(`the next departures times for line ${presentBusLines[i]} are ${nextDepartures}.`)
//             }

//             else {
//                 console.log('There is no expected departure for this bus.')
//             }

//         }

//     }
// }


// busTimeRequest.send();


