//get Next button
var nextButton = document.getElementById("next");

//get quiz div
var quizSpace = document.getElementById("quiz");

//get question span
var questionSpace = document.getElementById("question");

//get answers span
var answerSpace = document.getElementById("answer");

//Set score and Question number
var score = 0;
var questionNumber = 0;

//Set answer cache
var answerCache = [];

//Set question in html by creating text node in proper space
function setQuestion(questionNumber) {
    var q = document.createTextNode(questions[questionNumber].question);
    $(questionSpace).hide().append(q).show("slow");
}

function setAnswer(questionNumber) {
    //create DOM fragment for radio buttons
    var frag = document.createDocumentFragment();
    var input = null;
    var value = null;
    var name = null;
    //set radio button with values for each answer in array
    for (var i = 0; i < 4; i++) {
        name = document.createTextNode(questions[questionNumber].choices[i]);
        input = document.createElement("input");
        input.type = "radio";
        input.name = "answers";
        input.value = i;
        //append buttons to fragment
        frag.appendChild(input);
        frag.appendChild(name);
    }
    //append fragment to answer area
    $(answerSpace).hide().append(frag).show("slow");


}

//clear innerHTML for question and answer
function removeAll() {
    questionSpace.innerHTML = "";
    answerSpace.innerHTML = "";
}

//checks if submitted answer is correct
function checker(questionNumber) {
    for (var i = 0; i < 4; i++) {
        //if the checked answer is correct, increment score and save answer to answer cache
        if (answerSpace.children[i].checked && i === questions[questionNumber].correctAnswer) {
            score++;
            answerCache[questionNumber] = answerSpace.children[i].value;

            //otherwise just save answer to answer cache
        } else if (answerSpace.children[i].checked) {
            answerCache[questionNumber] = answerSpace.children[i].value;
        }
    }

}

//restart, next and back buttons
function buttons(questionNumber) {
    //set next button
    var nextButton = document.getElementById("next");
    //set restart button
    var restart = document.getElementById("restart");
    //set back button
    var backButton = document.getElementById("back");


    //when next button clicked go to next question
    nextButton.onclick = function () {
        //check and cache answer
        checker(questionNumber);
        //if user forgets to answer, send an alert
        if (isNaN(answerCache[questionNumber])) {
            alert("Please choose an answer");
            //Otherwise, continue with quiz    
        } else {
            //increment question, remove content
            questionNumber++;
            removeAll();

            //if not done with quiz set next question
            if (questionNumber < 5) {
                setQuestion(questionNumber);
                setAnswer(questionNumber);
                //if question has already been answered
                if (!(isNaN(answerCache[questionNumber]))) {
                    var radioAnswers = document.getElementsByName("answers");
                    //get previous answer
                    var key = answerCache[questionNumber];
                    //pre-select previous answer
                    radioAnswers[key].checked = true;
                }

                //show the score
            } else {
                $(questionSpace).hide().append("Your score is: ").show("slow");
                $(answerSpace).hide().append(score + " out of 5.").show("slow");
                $(nextButton).hide();
                $(backButton).hide();

            }
        }
    };

    // back button click functionality
    backButton.onclick = function () {
        //if it's not the first question decrement question number and set previous question
        if (questionNumber > 0) {
            questionNumber--;
            removeAll();
            setQuestion(questionNumber);
            setAnswer(questionNumber);
            //create array of answers
            var radioAnswers = document.getElementsByName("answers");
            //get previous answer
            var key = answerCache[questionNumber];
            //pre-select previous answer
            radioAnswers[key].checked = true;
        }
    };
    //restart button
    restart.onclick = function () {
        //clear cache question number and score
        answerCache = [];
        questionNumber = 0;
        score = 0;
        removeAll();
        //restart quiz
        theQuiz();
        $(backButton).show();
        $(nextButton).show();

    };
}

//the main quiz
function theQuiz() {
    setQuestion(questionNumber);
    setAnswer(questionNumber);
    buttons(questionNumber);
    console.log(answerCache);
}

//run the quiz
theQuiz();
