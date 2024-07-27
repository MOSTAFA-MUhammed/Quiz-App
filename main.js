// sutting up varible 
let countSpan = document.querySelector(".quiz-info .count span");
let bulletsContainer = document.querySelector(".bullets .spans")
let quizAreaCntainer = document.querySelector(".quiz-area");
let answerArea = document.querySelector(".answer-area");
let submitButton = document.querySelector(".submit-button");
let bullets = document.querySelector(".bullets");
let resultContainer = document.querySelector(".results");
let countDownElement = document.querySelector(".countdown")

// set option 
let currentIndex = 0;
let reightAnswer = 0 ;
let countdownInterval;

function getQuestions(){
    let repRequst = new XMLHttpRequest();

    repRequst.onreadystatechange = function (){

        if (this.readyState === 4 && this.status === 200) {
            let questionObject = JSON.parse(this.responseText)
            let qCount = questionObject.length;

            // create bulltes + set qusetion count 
            createBulltes(qCount)   


            // start countdown 
            countdown(5 , qCount)

            // add question data
            addQuestionData(questionObject[currentIndex] , qCount);

            // click on submit
            submitButton.onclick = function (){

                // get right answer 
                let rightAnswer = questionObject[currentIndex].right_answer

                // increase index
                currentIndex ++

                // check the answer 
                checkAnswer( rightAnswer , qCount)

                // remove previos questions  
                quizAreaCntainer.innerHTML = ""
                answerArea.innerHTML = ""

                // add question data
                addQuestionData(questionObject[currentIndex] , qCount);

                // handel bulltes class 
                handelBullts();

                
                // start countdown 
                clearInterval(countdownInterval)
                countdown(5 , qCount)

                // shwo result
                showResult(qCount);
            }

        }

    }




    repRequst.open ("GET" , "qusetions.json" , true);
    repRequst.send ();
}
getQuestions()

function createBulltes(num){

    countSpan.innerHTML = num;

    // create spans 
    for (let i = 0 ; i < num; i ++){

        // create sapn 
        let theBullt = document.createElement("span");

        // cheeck if its frist question
        if (i === 0){

            theBullt.classList.add ("on")

        }

        // appen span to spans 
        bulletsContainer.appendChild(theBullt)

    }

}
function addQuestionData(obj , count){

    if (currentIndex < count){

    // create h2 title 
    let qustionTitle = document.createElement("h2");

    // create question text 
    let questionText = document.createTextNode(obj['title']);

    // add questionText to qustionTitle 
    qustionTitle.appendChild(questionText)

    // add qustionTitle to quizAreaCntainer
    quizAreaCntainer.appendChild(qustionTitle);

    // create the answers 
    for (let i = 1 ; i <= 4 ; i++){

        // create amin div 
        let mainDiv = document.createElement("div");

        // add class to main div 
        mainDiv.classList.add("answer")

        // create the input 
        let reideoInput = document.createElement("input")

        // add type + name + id + data attribute the input 
        reideoInput.name ='questions';
        reideoInput.type ='radio';
        reideoInput.id =`answer_${i}`;
        reideoInput.dataset.answer = obj[`answer_${i}`] ;

        // make frist option selectd
        if (i == 1){

            reideoInput.checked = true  ;

        }


        // create lable 
        let theLable = document.createElement ("label");

        // add for to lable 
        theLable.htmlFor =  `answer_${i}`

        // create text to lable 
        let lebleText = document.createTextNode(obj[`answer_${i}`] );

        // add the text to lable 
        theLable.appendChild(lebleText)

        // add input +  lable  to main div 
        mainDiv.appendChild(reideoInput)
        mainDiv.appendChild(theLable)

        // add main div to answer 
        answerArea.appendChild(mainDiv)
    }
    }

}

function checkAnswer(rAnswer , Count){

    let answers = document.getElementsByName("questions")
    let theCheooseAnswer ;

    for (let i = 0 ; i < answers.length ; i++){

        if (answers[i].checked){
            theCheooseAnswer = answers[i].dataset.answer
        }

    }

    if (rAnswer === theCheooseAnswer){
        reightAnswer++;
    }
}
function handelBullts(){

    let bulltSoan =document.querySelectorAll(".bullets .spans span")
    
    let arrayOfSpans = Array.from(bulltSoan)

    arrayOfSpans.forEach((span , index) => {

        if (currentIndex === index){

            span.className = "on";

        }

    })

}

function showResult(count){
    let theRuslet;
    if (currentIndex === count){
        quizAreaCntainer.remove();
        // answerArea.remove();
        submitButton.remove();
        bullets.remove();

        if (reightAnswer > count / 2 && reightAnswer < count){

            theRuslet = `<span class="good">Good</span> , ${reightAnswer} From ${count} Is Good`;

        } else if (reightAnswer === count ){
            
            theRuslet = `<span class="perfect">Perfect</span> , ${reightAnswer} From ${count} Is Perfect`;
        } else{

            theRuslet = `<span class="bad">Bad</span> , ${reightAnswer} From ${count} Is Bad`;

        }

        resultContainer.innerHTML = theRuslet;
        resultContainer.style.padding = "10px";
        resultContainer.style.backgroundColor = "white";
        resultContainer.style.marginTop = "10px";
    }
} 
function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countDownElement.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countdownInterval);
        submitButton.click();
      }
    }, 1000);
  }
}



// function countdown (duration , count){
//     if (currentIndex < count){
//         let minuts , seconds ; 
//         countdownInterval = setInterval(function(){

//             minuts = parseInt (duration / 60)
//             seconds = parseInt (duration % 60)

//             minuts = minuts < 10 ? `0${minuts}` : minuts;
//             seconds = seconds < 10 ? `0${seconds}` : seconds;

//             countDownElement.innerHTML = `${minuts}:${seconds}`

//             if (--duration < 0 )

//                 clearInterval(countdownInterval)
                
//                 submitButton.click()
//         } , 1000)
//     }
// }