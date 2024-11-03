// Opening Ceremony - initializes scores and starts the event chain
function OpeningCeremony(callback) {
    let scores = { player1: 0, player2: 0, player3: 0, player4: 0 };
    console.log("Opening Ceremony: Let the games begin!");
    
    // Log opening messages every second for 3 seconds
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

// Race 100M - simulates a 100m race after a delay, awards points, and updates scores
function Race100M(scores, callback) {
    setTimeout(() => {
        console.log("\nRace 100M: The race is on!");
        
        // Generate random times for each player and sort them
        let raceTimes = {
            player1: Math.floor(Math.random() * 6) + 10, // between 10-15 seconds
            player2: Math.floor(Math.random() * 6) + 10,
            player3: Math.floor(Math.random() * 6) + 10,
            player4: Math.floor(Math.random() * 6) + 10
        };
        
        console.log("Race Times:", raceTimes);

        // Sort players by race time in ascending order
        let sortedPlayers = Object.keys(raceTimes).sort((a, b) => raceTimes[a] - raceTimes[b]);

        // Award points: 1st - 50, 2nd - 30, 3rd - 20, 4th - 10
        scores[sortedPlayers[0]] += 50;
        scores[sortedPlayers[1]] += 30;
        scores[sortedPlayers[2]] += 20;
        scores[sortedPlayers[3]] += 10;

        console.log("Scores after Race 100M:", scores);
        callback(scores);
    }, 3000);
}

// Long Jump - selects a random player to win the event, awards points, and updates scores
function LongJump(scores, callback) {
    setTimeout(() => {
        console.log("\nLong Jump: Each player jumps...");

        // Randomly select a player to win the event
        let players = Object.keys(scores);
        let randomPlayer = players[Math.floor(Math.random() * players.length)];
        scores[randomPlayer] += 30; // Award 30 points to the winner

        console.log(`Long Jump winner: ${randomPlayer} (earned 30 points)`);
        console.log("Scores after Long Jump:", scores);
        callback(scores);
    }, 2000);
}

// High Jump - prompts user input to determine which player wins the High Jump event
function HighJump(scores, callback) {
    console.log("\nHigh Jump: Awaiting user input...");
    
    // Use a prompt to get user input
    // let userInput = prompt("Enter the player name who performed the highest jump (player1, player2, player3, player4):");
    
    if (userInput && scores[userInput] !== undefined) {
        scores[userInput] += 20; // Award 20 points to the chosen player
        console.log(`High Jump winner: ${userInput} (earned 20 points)`);
    } else {
        console.log("No points awarded for High Jump due to invalid or no input.");
    }
    
    console.log("Scores after High Jump:", scores);
    callback(scores); // Always call the callback
}

// Award Ceremony - displays final scores and announces the top 3 players
function AwardCeremony(scores) {
    console.log("\nAward Ceremony: Announcing the winners...");
    
    // Sort players by score in descending order
    let sortedScores = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);

    console.log("Final Scores:", scores);
    console.log(`1st Place: ${sortedScores[0]} with ${scores[sortedScores[0]]} points`);
    console.log(`2nd Place: ${sortedScores[1]} with ${scores[sortedScores[1]]} points`);
    console.log(`3rd Place: ${sortedScores[2]} with ${scores[sortedScores[2]]} points`);
}

// Start the event chain by calling OpeningCeremony
OpeningCeremony(scores => {
    Race100M(scores, scores => {
        LongJump(scores, scores => {
            HighJump(scores, scores => {
                AwardCeremony(scores);
            });
        });
    });
});
