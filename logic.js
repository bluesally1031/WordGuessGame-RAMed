//GLOBAL VARIABLES
//--------------------------------------------------------
    //Arrays and Variables 
        var wordOptions = ["abradolf lincler", "anatomy park", "bird person", "cognition amplifier", "council of ricks", "dream inceptor", "fart", "galactic federation", "gazorpians", "ice t", "interdimensional cable", "jerryboree", "mr meeseeks", "mr poopybutthole", "microverse battery", "pickle rick", "planet music", "portal gun", "scary terry", "squanchy", "tiny rick", "unity", "wubalubadubdub"];
        var wordChosen = "";
        var lettersInWord = [];
        var numBlanks = 0;
        var blanksAndSuccessfulGuesses = [];
        var incorrectGuesses = [];

    //Counters
        var winCount = 0;
        var lossCount = 0;
        var remainGuessCount = 0;

    //Letter Used
        var letterPressed = 0;

//--------------------------------------------------------
//FUNCTIONS
//--------------------------------------------------------

    function startGame (){
        wordChosen = wordOptions[Math.floor(Math.random() * wordOptions.length)];
        lettersInWord = wordChosen.split("");
        numBlanks = lettersInWord.length;
    
        //Round reset items
        remainGuessCount = 15;
        incorrectGuesses = [];
        blanksAndSuccessfulGuesses = [];
        
        //Jared's .map code--READ ABOUT THIS!
        // blanksAndSuccessfulGuesses = lettersInWord.map(function(letter){
        //     if (letter === " "){
        //         return " "
        //     }
        //     return("_")
        // })

        //Populate blanks and successes (w/ correct num of blanks)
        for (var i=0; i<numBlanks; i++){
            blanksAndSuccessfulGuesses.push("_");
        }

        //Conditions for each round
        document.getElementById("currentWordProblem").innerHTML = blanksAndSuccessfulGuesses.join(" ");
        document.getElementById("guessesRemaining").innerHTML = remainGuessCount;
        document.getElementById("winCounter").innerHTML = winCount;
        document.getElementById("lossesCounter").innerHTML = lossCount;
        document.getElementById("incorrectGuessed").innerHTML = incorrectGuesses.join(" ");

        
        //test and debug
        console.log(wordChosen);
        console.log(lettersInWord);
        console.log(numBlanks);
        console.log(blanksAndSuccessfulGuesses);
    }

    //
    function varifyLetters(letter) {
        
        var isLetterInWord = false;

        //varifies letter is in word
        //"for loop" and comparison operator "=="
        for (var i=0; i<numBlanks; i++) {
            if(wordChosen[i] == letter) {
                isLetterInWord = true;
            }
        }

        //detects where letter is in word and pulls it out of blanksAndSuccessfulGuesses array
        if(isLetterInWord){
            for (var i=0; i<numBlanks; i++) {
                if(wordChosen[i] == letter) {
                    blanksAndSuccessfulGuesses[i] = letter;
                }
            }
        }
        //if letter pressed is not in the word
        else {
            incorrectGuesses.push(letter);
            remainGuessCount--;
        }
        
        //test and debug
        console.log(blanksAndSuccessfulGuesses);
    }

    function roundComplete(){
        console.log("Win Count: " + winCount + " | Loss Count:" + lossCount + " | Guesses Left:" + remainGuessCount);

        //Update counters
        document.getElementById("guessesRemaining").innerHTML = remainGuessCount;
        document.getElementById("currentWordProblem").innerHTML = blanksAndSuccessfulGuesses.join(" ");
        document.getElementById("incorrectGuessed").innerHTML = incorrectGuesses.join(" ");
        

        //Check for win
        if(lettersInWord.toString() == blanksAndSuccessfulGuesses.toString()) {
            winCount++;
            document.getElementById("winCounter").innerHTML = winCount;
            alert("You rescued Morty! Maybe you still have time for a round of Roy 2 at Blips and Chipz.");

            startGame();
        }

        //Check for loss
        else if (remainGuessCount == 0) {
            lossCount++;
            document.getElementById("lossesCounter").innerHTML = lossCount;
            alert("Welp...you failed! Only thing to do now is groan and keep trying. Just think of all the trouble it would be to get a new Morty.")

            startGame();
        }
    }


//--------------------------------------------------------
//MAIN PROCESS
//--------------------------------------------------------

    //Runs code for first time
    startGame();

    //Detects key clicks
    document.onkeyup = function(event){
        var letterPressed = String.fromCharCode(event.keyCode).toLowerCase(); 
        varifyLetters(letterPressed);
        roundComplete();
    }

    //test and debug
    console.log(letterPressed);