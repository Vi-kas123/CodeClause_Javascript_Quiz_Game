const questionNumber = document.querySelector(".question-number")
const questionText = document.querySelector(".question-text")
const questionContainer = document.querySelector(".question-container")
const answerindicatorContainer = document.querySelector(".answers-indicator")
const homeBox = document.querySelector(".home-box")
const quizBox = document.querySelector(".quiz-box")
const resultBox = document.querySelector(".result-box")
let questionCounter=0;
let currentQuestion;
let availableOptions=[];
let availableQuestion=[];
let correctAnswers=0;
let attempt = 0;

function setAvailableQuestions(){
      const totalQuestion = quiz.length;
      for(let i=0; i<totalQuestion;i++)
      {
      	availableQuestion.push(quiz[i])
      }
}
function getNewQuestion(){
    questionNumber.innerHTML="Question " + (questionCounter + 1) + " of " + quiz.length
    const questionIndex = availableQuestion[Math.floor(Math.random()*availableQuestion.length)]
    currentQuestion=questionIndex
    questionText.innerHTML = currentQuestion.q;
    const index1 = availableQuestion.indexOf(questionIndex)
      availableQuestion.splice(index1,1)
      // console.log(questionIndex)
      // console.log(availableQuestion)
      // // console.log(availableQuestion)
      const optionLen = currentQuestion.options.length
      for(let i=0; i<optionLen; i++)
      {
      	availableOptions.push(i)
      }
 
      let animationDelay = 0.15;
      questionContainer.innerHTML=''
      for(let i=0; i<optionLen; i++)
      {
        const optionIndex = availableOptions[Math.floor(Math.random()*availableOptions.length)]
      	const index2 = availableOptions.indexOf(optionIndex);
      	// console.log(index2)
        availableOptions.splice(index2,1)
        const option = document.createElement("div");
        // console.log(optionIndex)
        // console.log(availableOptions)
        option.innerHTML = currentQuestion.options[optionIndex]
      	option.id=optionIndex;
        option.style.animationDelay = animationDelay + 's'
        animationDelay = animationDelay + 0.15;
      	option.className="option";
      	questionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)")
      }
      // console.log(availableOptions)

      questionCounter++;
      // console.log(currentQuestion.options)
      
}
function getResult(optionelement){
     id = optionelement.id
     if(id == currentQuestion.answer){
         optionelement.classList.add("correct")
         // console.log("correct")
         updateAnswerIndicator("right")
         correctAnswers++;
         // console.log("correctAnswers :",correctAnswers)
     }
     else{
        optionelement.classList.add("incorrect")
         updateAnswerIndicator("wrong")
        const oplen=questionContainer.children.length;
       for(let i=0; i<oplen ;i++)
       {
         if(questionContainer.children[i].id==currentQuestion.answer)
               questionContainer.children[i].classList.add("correct")
               }
           // console.log("")
     } 
     attempt++;
     disableclickOptions();
}

function disableclickOptions(){
       const oplen=questionContainer.children.length;
       for(let i=0; i<oplen ;i++)
       {
         questionContainer.children[i].classList.add("already-answered");
               }
}

function nextQuestion(){
	if(questionCounter=== quiz.length)
	{
		// console.log("Game over");
        quizResult();
	}
	else
	{
		getNewQuestion();
	}
}
function answerShow(){
    answerindicatorContainer.innerHTML = ''
    const totalQuestion=quiz.length;
    for(let i=0; i<totalQuestion; i++)
    {
         const indicator = document.createElement("div");
         answerindicatorContainer.appendChild(indicator)
    }
}

function updateAnswerIndicator(symbol){
    // console.log(symbol)
    answerindicatorContainer.children[questionCounter-1].classList.add(symbol)

}
function quizResult(){
    quizBox.classList.add("hide")
    resultBox.classList.remove("hide")
    resultBox.querySelector(".total-question").innerHTML = quiz.length
    resultBox.querySelector(".total-attempt").innerHTML = attempt
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers
    resultBox.querySelector(".percentage").innerHTML = (correctAnswers/quiz.length)*100 + "%"
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + "/" + quiz.length

}
function resetquiz() {
    questionCounter=0;
    correctAnswers=0;
    attempt = 0;
}
function tryAgain(){
      resultBox.classList.add("hide")
      quizBox.classList.remove("hide")

      resetquiz();
      startquiz();


}

function gotohome(){
     resultBox.classList.add("hide")
     homeBox.classList.remove("hide")
     resetquiz();   
}
function startquiz(){

    homeBox.classList.add("hide");
    quizBox.classList.remove("hide")
	setAvailableQuestions();
	getNewQuestion();
    answerShow();
}