var readlineSync = require('readline-sync');
const axios = require('axios');

console.log("You are using ez matheletics cheats made by eyaad"/1)

// Wait for user's response.
var secret = readlineSync.question('Mathletics session_usertokken: ');
var session_usertokken = Math.round(readlineSync.question('Amount of points to collect: '));

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
 async function wait()
{
    for(let i = 0; i > 7;i++)
{
    await sleep(i* 1000);
}

}


console.log("Wait getting points")
wait();
console.log("Loading user session connections");
wait();
console.log("Session sucessfully connected");
wait();
console.log("searching pnp databse connection");
wait();
console.log("sucessfully established connection");
wait();
console.log("Injecting points");
console.log("Waiting for system to recieve may take time");

for (let i = 0; i < session_usertokken; i++) {
    axios('https://live-api.3plearning.com/LiveMathleticsMatchEngineService-R171/MatchService.asmx/FindMatch',{
        headers:{
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json;charset=UTF-8",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "sec-gpc": "1"
        },
        method: 'POST',
        data:"{\"request\":{\"IsComputerPlayerOnly\":true,\"CultureCode\":null,\"UserAuthToken\":\""+secret+"\",\"GameLevel\":3,\"Speed\":0,\"ClassroomID\":166}}"
    }).then(function (response) {
        // handle success
        var matchid = response.data.d.MatchID
        setTimeout(function() {
            axios('https://live-api.3plearning.com/LiveMathleticsScoreboardService-R171/ScoreBoardService.asmx/UpdateScoreBoard',{
                headers:{
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en-US,en;q=0.9",
                    "content-type": "application/json;charset=UTF-8",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "cross-site",
                    "sec-gpc": "1"
                },
                method: 'POST',
                data:"{\"request\":{\"UserAuthToken\":\""+secret+"\",\"MatchId\":\""+matchid+"\",\"UserScore\":{\"Score\":50,\"Status\":0},\"SequenceCounter\":59}}"
            }).catch(function (error) {
                // handle error
                console.log("There was an unexpected error")
                console.log(error);
            })
        },5000)
        setTimeout(() => {
            axios('https://live-api.3plearning.com/LiveMathleticsResultService-R171//FinaliseService.asmx/FinaliseResult',{
                headers:{
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en-US,en;q=0.9",
                    "content-type": "application/json;charset=UTF-8",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "cross-site",
                    "sec-gpc": "1"
                },
                method: 'POST',
                data:"{\"request\":{\"UserAuthToken\":\""+secret+"\",\"LevelID\":3,\"TotalTime\":60,\"Attempts\":120,\"IsComputerPlayerOnly\":true,\"OperationEnum\":0,\"MatchId\":\""+matchid+"\",\"UserScore\":{\"Score\":120,\"Status\":0},\"SessionID\":null,\"bonusLevelIncremented\":false,\"Hash\":\"3285ff8739f10cdc524aed24cd38b4fd\"}}"
            }).then(function (response) {
                // handle success
                console.log("Generated "+response.data.d.PointsEarned+" points")
            })
            .catch(function (error) {
                // handle error
                console.log("There was an unexpected error")
                console.log(error);
            })
        }, 70000);
        
    })
    .catch(function (error) {
        // handle error
        console.log("an error accured unkown")
        console.log(error);
    })
}