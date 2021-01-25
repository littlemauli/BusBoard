const readline = require('readline-sync');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

regexPostcodeCheck()
function regexPostcodeCheck()
{
    console.log('Please input your postcode with no spaces and lowercase. (e.g. DE45 1BB would be inputted as de451bb)');
    var userPostcode=''
    const regex= /^([a-z]{1,2}\d[a-z\d]?\d[a-z]{2}|GIR ?0A{2})$/g
    while (userPostcode.match(regex)==null)

    { userPostcode=readline.prompt();
      try
      { 
        if (userPostcode.match(regex)==null)
        {
          throw 'invalid postcode'
        }
      }
      catch(e)
      {
        console.log('Invalid postcode: Please input your postcode with no spaces and lowercase (e.g. DE45 1BB would be inputted as de451bb)')
      }
    }
    console.log(`Your inputted postcode is: ${userPostcode}`) 
    postcodeValidation(userPostcode)
    
}

function postcodeValidation(userPostcode)
{
    const postcodeValidationRequest = new XMLHttpRequest();
    const postcodeValidationURL = `http://api.postcodes.io/postcodes/${userPostcode}/validate`
    postcodeValidationRequest.responseType = 'json';
    postcodeValidationRequest.open('GET', postcodeValidationURL);
    postcodeValidationRequest.onreadystatechange = () => {
        //console.log(postcodeValidationRequest.readyState);
        if (postcodeValidationRequest.readyState === 4) {
            let postcodeValidation = JSON.parse(postcodeValidationRequest.responseText);
            //console.log(postcodeValidation)

            if (!postcodeValidation.result) {
                console.log('The postcode you entered doesn\'t exsist')
            }
            else {
                postcodeGeoLoc(userPostcode)
            }
        }
    }
    postcodeValidationRequest.send();
}


function postcodeGeoLoc(userPostcode)
{
    const postcodeGeoLocRequest = new XMLHttpRequest();
    const postcodeGeoLocURL = `http://api.postcodes.io/postcodes/${userPostcode}`
    postcodeGeoLocRequest.responseType = 'json';
    postcodeGeoLocRequest.open('GET', postcodeGeoLocURL);
    postcodeGeoLocRequest.onreadystatechange = () => {

        if (postcodeGeoLocRequest.readyState === 4) {
            let postcodeGeoLoc = JSON.parse(postcodeGeoLocRequest.responseText);

            //console.log(postcodeGeoLoc);

            let postcodeLong = postcodeGeoLoc.result.longitude;
            let postcodeLat = postcodeGeoLoc.result.latitude;

            console.log('The latitude coordinates are:',postcodeLat + ' and the longitude coordinates are: ' + postcodeLong, '.');

            twoClosestBusStop(postcodeLat, postcodeLong);
        }
    }

    postcodeGeoLocRequest.send();
}




function twoClosestBusStop(postcodeLat, postcodeLong)
{
    const nearStopRequest = new XMLHttpRequest();
    const nearStopsURL = `http://transportapi.com/v3/uk/places.json?app_id=429d2986&app_key=31d8fbe68ead7b9abe6ea4720cbc9441&lat=${postcodeLat}&lon=${postcodeLong}&type=bus_stop`

    //console.log(nearStopsURL);
    nearStopRequest.responseType = 'json';
    nearStopRequest.open('GET', nearStopsURL);
    nearStopRequest.onreadystatechange = () => {

        if (nearStopRequest.readyState === 4) {

            let nearStops = JSON.parse(nearStopRequest.responseText);
            //console.log(nearStops);

            let firstStop = ''

            let firstStopName = ''


            if (nearStops.member.length === 0) {
                console.log('There are not bus stops close by.')
            }

            for (let i = 0; i < nearStops.member.length && i < 2; i++) {
                StopCode = nearStops.member[i].atcocode
                StopName = nearStops.member[i].name

                BusTimesForStop(StopCode, StopName); 
                

            }

        }
    }
    nearStopRequest.send();
}






function BusTimesForStop(busStopCode, busStopName){
    const busTimeRequest = new XMLHttpRequest();
    const busTimeUrl = `https://transportapi.com/v3/uk/bus/stop/${busStopCode}/live.json?app_id=429d2986&app_key=31d8fbe68ead7b9abe6ea4720cbc9441&group=route&nextbuses=yes`

    busTimeRequest.responseType = 'json';
    busTimeRequest.open('GET', busTimeUrl);
    busTimeRequest.onreadystatechange = () => {

        if (busTimeRequest.readyState === 4) {
            let busTimeResponse = JSON.parse(busTimeRequest.responseText);

            let presentBusLines = Object.getOwnPropertyNames(busTimeResponse.departures); //this is an array of string
            console.log(`The active bus lines at ${busStopName} are:`, presentBusLines);
            

            if (presentBusLines.length == 0) {
                console.log(`There are no available bus lines at ${busStopName}.`)
            }

            for (let i = 0; i < presentBusLines.length; i++) {
                let lineDepartures = []
                let nextDepartures = []
                lineDepartures.push(busTimeResponse.departures[presentBusLines[i]])
                //console.log('Line Depatures:', lineDepartures)
                //console.log('TEST 1====',lineDepartures[0][0].expected_departure_time)
                //console.log('TEST 2====',lineDepartures[0][1].expected_departure_time)
                //console.log('TEST 3====',lineDepartures[0][2].expected_departure_time)
                //console.log('test', lineDepartures[0])
                //console.log('BEEP',lineDepartures.length)
                
                for (let j = 0; j < lineDepartures[0].length; j++) {
                    nextDepartures.push(lineDepartures[0][j].expected_departure_time)
                    //console.log('NEXT DEP:', nextDepartures)
                }

                if (nextDepartures.length == 0 || nextDepartures[0]==null) {
                    console.log(`There is no expected departures for the ${presentBusLines[i]} line at ${busStopName}.`)
                }

                else {
                    console.log(`The next departure times for the ${presentBusLines[i]} line at ${busStopName} are ${nextDepartures}.`)
                    
                }

            }

        }
    }


    busTimeRequest.send();

}