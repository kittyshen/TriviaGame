/*
# Cat TriviaGame
Pseudocode
Step1 define an array of objects triviaBank =[{Q:...,A:...,B:...,C:...,D:...,Correct:...},...]
Step2 mark down the html with a title div on the top, a timeLeft div follow, then the div for the trivia sub-div Q, A, B, C, D
Step3 mark the html with another div showing userAnswer after user click, a img div showing picture defending on user got it right or wrong
Step4 div in step 3 should replace div in Step 2after user clicked an answer or timeLeft = 0
Step5 define a function newGame() to initial the game,
Step6 using the function defined in previous assignment4 to generate random non-repeating index number array currentIndex[]
Step7 render the html page with currentIndex[][0], then excute the next quiz according to the Step 4 rules
Step8 how to render? Define a function called quizRender() to render.  call on triviaBank[currentIndex[i]].Q to insert to text field of Step 2's coordinate filed in html
Step9 call triviaBank[currentIndex[i]].A to render Slot A , etc
Step10 Those answer slot should have same class of "answer", but have different value set to A,B,C,D accoriding to the slot,then using jQuery on.("click") to retrieve the value
Step11 compare the value retrieved by the onclick if it matchs triviaBank[currentIndex[i]].Correct, then display next session
Step12 if value!=Correct  wrong++, display You are wrong,Correct answer is triviaBank[currentIndex[i]][triviaBank[currentIndex[i]].Correct], oops arrgument gets too long
Step13 if value==Correct right++ display You are correct and showing a cat picture.
Step14 then call quizRender() on next triviaBank[currentIndex[i+1]] and set it happen on setTimeOut(quizRender,3000)
Step15 How to build a timer to count down on timeLeft? refer to class activity simpleTimer? or using some type of recursion on setTimeOut() function?
Step16 if timeLeft =0 show render next question, questionUnanswered++
Step17 if user finished all 5 quiz, showing ending screen and add another button to reload a newGame();
*/

//trying to make a timer attemp one
// var startingTime = 10; // decalre a globe variable to capture the allowed time limit
// var timerPointer;
// function timer(t){
//     $("#timer").text(t);  // update the html session of timer id with new timeLeft
//     t--;
//     clearTimeout(timerPointer);
//     if(t>=0){
//         timerPointer = setTimeout(function(){timer(t);},1000);     //recursion use of timer function every 1 second
//     }
// }
// timer(startingTime); //excute the timer

//store travia into a bank with array of objects
var triviaBank = [{
    Q: "Which of the following statements about body language is FALSE?",
    A: "cat’s tail held high means “I’m happy.”",
    B: "tail tucked underneath the body means “I’m hungry.”",
    C: "thumping tail means “I’m totally frustrated!”",
    D: "twitching tail means “I’m getting irritated.”",
    Correct: "B"
},
{
    Q: "What’s the total number of claws that most house cats have?",
    A: "18",
    B: "20",
    C: "16",
    D: "None of these answers",
    Correct: "A"
},
{
    Q: "Cats can’t taste this:",
    A: "Sour",
    B: "Bitter",
    C: "Salt",
    D: "Sweet",
    Correct: "D"
},
{
    Q: " A cat, standing in a still position with length of 1 feet, how high she can jump up to?",
    A: "3 feet",
    B: "4 feet",
    C: "5 feet",
    D: "6 feet",
    Correct: "D"
},
{
    Q: " A term for a group of kittens is:",
    A: "Nook",
    B: "Kaboodle",
    C: "Kindle",
    D: "Kaggle",
    Correct: "C"
},
{
    Q: "Outdoor-only cats live, on average, about:",
    A: "13 to 15 years",
    B: "10 to 12 years",
    C: "7 to 9 years",
    D: "3 to 5 years",
    Correct: "D"
},
{
    Q: "Which brain is the cat’s brain most similar to?",
    A: "Human's",
    B: "Dog's",
    C: "Bird's",
    D: "Sheep's",
    Correct: "A"
},
{
    Q: "A cat has how many whiskers, on average?",
    A: "16",
    B: "12",
    C: "24",
    D: "8",
    Correct: "C"
},
{
    Q: "Cats have an extra organ that allows them to taste scents on the air, where it's located in",
    A: "Mouth",
    B: "Nose",
    C: "Eyes",
    D: "Paws",
    Correct: "A"
},
{
    Q: "Cats can notice the fast movements of their prey, but which animal seems to be stagnant in cat's eye?",
    A: "Snake",
    B: "Turtle",
    C: "Dog",
    D: "Rabit",
    Correct: "B"
}
]
var currentIndexArray = []; // declare globe var to store current index array
var quizCounter =0; // initial the quizCounter
var unanswered = 0;  // check how many quiz user didn't answer
var right = 0;
var wrong = 0;
var timerCounter =0;

var pointerTimeOut;
var pointerInterval;

//define a funciton to generate non-repeating random number array
function randomNumberArrayGen(num, length) {
    var nArray = []; //declare a local nArray to hold the numbers
    for (var i = 0; i < length; i++) {
        var x = Math.floor(Math.random() * num);
        if (nArray.indexOf(x) == -1) {  // if x not in the nArray
            nArray.push(x);
        }
        else i--;  // forget this could cause length of array shorter than required 
    }
    return nArray;
}
// var test = randomNumberArrayGen(12,4);
// console.log(test);

//define a newGame function to call after ending condition meet
function newGame() {
    unanswered = 0;  // check how many quiz user didn't answer
    right = 0;
    wrong = 0;
    quizCounter =0;
    timerCounter =10;
    stopTimer();
    stopInterval();
    currentIndexArray = randomNumberArrayGen(10, 5);  //pick 5 out of 10 quiz Questions
    // console.log(currentIndexArray);
    quizRender(triviaBank[currentIndexArray[quizCounter]]);
}

// define a function to render the quiz
function quizRender(obj) {
    $("#quizContainer").text("");       // initial the quizContainer session , otherwise new elements will keep appending to the old one
    $("#rightOrWrong").text(""); 
    for( var prop in obj){   //iterate through the trivia obj
        if(prop == "Q"){            //set the question field be one div above all other elements 
            var newSlot = $("<h4>");
            newSlot.attr("class","jumbotron question");
            newSlot.attr("value",prop);  //save the "key" index of the property into the value field for later correct answer judgement use
            newSlot.html(prop +" : "+ obj[prop] + "<br>");
            console.log(obj[prop]);
            $("#quizContainer").append(newSlot);
        }
        else if(prop != "Correct"){      //if key property isn't "Correct" index, print the information out. use this condition to avoid answer part showing
            var newSlot = $("<h4>");
            newSlot.attr("class","button");
            newSlot.attr("data-value",prop);  //save the "key" index of the property into the value field for later judgement
            newSlot.html(prop +" : "+ obj[prop] + "<br>");
            console.log(obj[prop]);
            $("#quizContainer").append(newSlot);
        }
    }
}

//define a function to render ending condition
function endingScreen(buttonClicked){
    stopTimer();    //call those two to stop timer and interval process.
    stopInterval();
    $("#quizContainer").text("");    // initial the quizContainer session , otherwise new elements will keep appending
    if(quizCounter ==5 ){
        newGame();
        return;
    }
    // if(buttonClicked == triviaBank[currentIndexArray[quizCounter]].Correct){  //if user got the right answer
    if(buttonClicked == triviaBank[currentIndexArray[quizCounter]].Correct ){  //if user got the right answer
        $("#rightOrWrong").text("Right!");
        $("#quizContainer").html("<div style =\"margin-left: auto; margin-right: auto;text-align: center; display: table-cell;\"><img src='assets/images/catRule.gif' alt = \"catpic\" ></div>");
        pointerTimeOut = setTimeout(run,3000);
        right++;
    }
    else {
        $("#rightOrWrong").text("Wrong!");
        var index = triviaBank[currentIndexArray[quizCounter]].Correct;
        $("#quizContainer").html("<h2>Correct answer is: "+ triviaBank[currentIndexArray[quizCounter]][index]+ "</h2>");
        pointerTimeOut = setTimeout(run,3000);
        wrong++;
    }
    quizCounter++;  
}
function endGame(){
    $("#quizContainer").html("");
    $("#quizContainer").append("<h2>you got "+right+"/5 questions right.</h2>")
    $("#quizContainer").append("<button id ='Restart'>Try Again?</button>");
}


function run(){
    stopInterval();  //is this the key causing the problem???????!!!!!!!
    pointerInterval = setInterval(timer,1000);
    console.log("run:" + quizCounter);

    quizRender(triviaBank[currentIndexArray[quizCounter]]);
    // console.log("run:" + quizCounter);
}

//define a timer to track the time
function timer(){
    console.log(timerCounter);
    timerCounter--;
    $("#timer").text(timerCounter);
    if(timerCounter == 0){  // if time runs out render next quiz question.
        unanswered ++;
        stopTimer();    //pause the timer
        stopInterval(); //clear last timeout event instance
    
        timerCounter =10;
        if(quizCounter<5){
            endingScreen();
            pointerTimeOut = setTimeout(run,3000);
            console.log("quiz:"+quizCounter); 
            // quizCounter++;  
        }
        else // if run out of quiz questions, render gameFinishScreen
        {
            console.log("end here:  "+quizCounter); 
            endGame();
        }
    }
}

function stopTimer(){
    clearTimeout(pointerTimeOut);
}
function stopInterval(){
    clearInterval(pointerInterval);
}


//main session starts here
newGame(); //call a newgame session
run();

$(document).on("click",".button",function(){
    console.log("button clicked");
    var v = $(this).data("value");
    // console.log (v);
    endingScreen(v);  // judge the click with the conditon inside endingScreen
});

$(document).on("click","#Restart",function(){
    newGame();
    run();      // forget this will causing the timer not starting after a new game session
});


