# TriviaGame
UC Berkeley coding assignment 5

## Overview

In this assignment, You'll create a Trivia game using JavaScript for the logic and jQuery to manipulate HTML. Be sure to layout this app with valid HTML and stylish CSS.

### Option One: Basic Quiz (Timed Form)
* You'll create a trivia form with multiple choice or true/false options (your choice).
* The player will have a limited amount of time to finish the quiz. 
  * The game ends when the time runs out. The page will reveal the number of questions that players answer correctly and incorrectly.
* Don't let the player pick more than one answer per question.
* Don't forget to include a countdown timer.

### Option Two: Advanced Assignment (Timed Questions)
* You'll create a trivia game that shows only one question until the player answers it or their time runs out.
* If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.
* The scenario is similar for wrong answers and time-outs.
  * If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
  * If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.
* On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).

## Technology used
* jQuery and javascript
* Html
* Css
* Bootstrap framework 


## Key learning points
```javascript
function quizRender(obj) {
    $("#quizContainer").text("");       // initial the quizContainer session , otherwise new elements will keep appending to the old one
    $("#rightOrWrong").text(""); 
    for( var prop in obj){   //iterate through the trivia obj
        if(prop == "Q"){            //set the question field be one div above all other elements 
            var newSlot = $("<h4>");
            newSlot.attr("class","jumbotron question");
            newSlot.attr("value",prop);  //save the "key" index of the property into the value field for later correct answer judgement use
            newSlot.html(prop +" : "+ obj[prop] + "<br>");
            // console.log(obj[prop]);
            $("#quizContainer").append(newSlot);
        }
        else if(prop != "Correct"){      //if key property isn't "Correct" index, print the information out. use this condition to avoid answer part showing
            var newSlot = $("<h4>");
            newSlot.attr("class","button");
            newSlot.attr("data-value",prop);  //save the "key" index of the property into the value field for later judgement
            newSlot.html(prop +" : "+ obj[prop] + "<br>");
            // console.log(obj[prop]);
            $("#quizContainer").append(newSlot);
        }
    }
}
```
* define a function to render the quiz container, complicated big block of code, so wrap it all in one funciton

```javascript
function endingScreen(buttonClicked){
    stopTimer();    //call those two to stop timer and interval process.
    stopInterval();  //Why not working without this?
    $("#quizContainer").text("");    // initial the quizContainer session , otherwise new elements will keep appending
    if(quizCounter ==5 ){
        newGame();
        return;
    }
    ...

}
```
* ending screen need to reset the interval timer() function.

```javascript
function run(){
    stopInterval();  //is this the key causing the problem???????!!!! already stoped in ending screen why need to call this again. most confusing part of this assignment.  Why why why???
    timerCounter =15 ; // need this to reset timer to 15s after each question.
    if(quizCounter ==5){  // to stop timer keep looping to next session after gameending < HERERRR !!!!
        endGame();
        return;
    }
    pointerInterval = setInterval(timer,1000);
    quizRender(triviaBank[currentIndexArray[quizCounter]]);
}
```
* Unsolved run() function had a lot of confusing happening, need to call stopInterval first, but I already called it in endScreen() why need to call it here again, another myth. be sure to reset timerCounter variable to make sure the user got  15 seconds to answer new question.

```javascript
function timer(){
    console.log(timerCounter);
    timerCounter--;
    $("#timer").text(timerCounter);
    if(timerCounter <= 0){ 
      //ending condition here
    }
    ...
}
```
* how to define a counter timer 

```javascript

$(document).ready(function(){
    newGame(); //call a newgame session
    run();  // run() to render the quiz session and start the counterdown timer
    $(document).on("click",".button",function(){
      ...
    }
    ...
}
```
* review syntax for document ready and onclick event.

* the whole assignment the timer count down event is hardest took a lot of time to tweak and there are still some myth why need to call stopInterval in certain part of the code
* line 216 208 185 152 stopInterval() call

## Installation
Download the zip file, unzip on the desktop, open index.html

## Link to the site
[Click me](https://kittyshen.github.io/TriviaGame/)

## Author 
[Kitty Shen ](https://github.com/kittyshen)

https://github.com/kittyshen

## License
Standard MIT License