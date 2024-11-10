function OpeningCeremony(callback) {
    let scores = { player1: 0, player2: 0, player3: 0, player4: 0 };
    console.log("Opening Ceremony: Let the games begin!");
    

    let count = 3;
    let interval = setInterval(() => {
        console.log(`Starting in ${count--}...`);
        if (count < 0) {
            clearInterval(interval);
            console.log("The games have officially started!");
            callback(scores);
        }
    }, 1000);
}


function Race100M(scores, callback) {
    setTimeout(() => {
        console.log("\nRace 100M: The race is on!");
        

        let raceTimes = {
            player1: Math.floor(Math.random() * 6) + 10,
            player2: Math.floor(Math.random() * 6) + 10,
            player3: Math.floor(Math.random() * 6) + 10,
            player4: Math.floor(Math.random() * 6) + 10
        };
        
        console.log("Race Times:", raceTimes);


        let sortedPlayers = Object.keys(raceTimes).sort((a, b) => raceTimes[a] - raceTimes[b]);


        scores[sortedPlayers[0]] += 50;
        scores[sortedPlayers[1]] += 30;
        scores[sortedPlayers[2]] += 20;
        scores[sortedPlayers[3]] += 10;

        console.log("Scores after Race 100M:", scores);
        callback(scores);
    }, 3000);
}


function LongJump(scores, callback) {
    setTimeout(() => {
        console.log("\nLong Jump: Each player jumps...");


        let players = Object.keys(scores);
        let randomPlayer = players[Math.floor(Math.random() * players.length)];
        scores[randomPlayer] += 30;

        console.log(`Long Jump winner: ${randomPlayer} (earned 30 points)`);
        console.log("Scores after Long Jump:", scores);
        callback(scores);
    }, 2000);
}

function HighJump(scores, callback) {
    console.log("\nHigh Jump: Awaiting user input...");

    let userInput = prompt("Enter the player name for High Jump winner (player1, player2, player3, or player4):");

    if (userInput && scores[userInput] !== undefined) {
        scores[userInput] += 20;
        console.log(`High Jump winner: ${userInput} (earned 20 points)`);
    } else {
        console.log("No points awarded for High Jump due to invalid or no input.");
    }

    console.log("Scores after High Jump:", scores);
    callback(scores);
}


function AwardCeremony(scores) {
    console.log("\nAward Ceremony: Announcing the winners...");
    
    
    let sortedScores = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);

    console.log("Final Scores:", scores);
    console.log(`1st Place: ${sortedScores[0]} with ${scores[sortedScores[0]]} points`);
    console.log(`2nd Place: ${sortedScores[1]} with ${scores[sortedScores[1]]} points`);
    console.log(`3rd Place: ${sortedScores[2]} with ${scores[sortedScores[2]]} points`);
}


OpeningCeremony(scores => {
    Race100M(scores, scores => {
        LongJump(scores, scores => {
            HighJump(scores, scores => {
                AwardCeremony(scores);
            });
        });
    });
});
