/*
# Cat TriviaGame
Pseudocode
Step1 define an array of objects triviaBank =[{Q:...,A:...,B:...,C:...,D:...,Correct:...},...]
Step2 mark down the html with a title div on the top, a timeLeft div follow, then the div for the trivia sub-div Q, A, B, C, D
Step3 mark the html with another div showing userAnswer after user click, a img div showing picture defending on user gotit right or wrong
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
var startingTime = 10; // decalre a globe variable to capture the allowed time limit
var timerPointer;

function timer(t){
    $("#timer").text(t);  // update the html session of timer id with new timeLeft
    t--;
    clearTimeout(timerPointer);
    if(t>=0){
        timerPointer = setTimeout(function(){timer(t);},1000);     //recursion use of timer function every 1 second
    }
}
timer(startingTime); //excute the timer
