let rA = 0;
    let currentindex = 0;    
function get_ques() {

    let my_request = new XMLHttpRequest();
    my_request.onreadystatechange = function () {
        

        if (my_request.readyState === 4 && my_request.status === 200) {
           
            let questionobj = JSON.parse(this.responseText);
            let questioncount = questionobj.length;
            console.log(questioncount);
            createBullets(questioncount);

            addQuestiondata(questionobj[currentindex], questioncount);

            //click on submit
            submitbtn.onclick = function () {
                let therightAnswer = questionobj[currentindex].Right_Answer;
           
            
            //increase index
            currentindex++;
            //check Answer
            checkAnswer(therightAnswer, questioncount);
            //empty area question&Answer
                questionarea.innerHTML="";
                answerArea.innerHTML = "";
                addQuestiondata(questionobj[currentindex], questioncount);
               
                countdown(3, questioncount);
                handelbullets();
                showResults(questioncount);


            };
           
            
    }
    
    };

        my_request.open("GET", "proj1.json", true);
        my_request.send();
}
get_ques();

let mySpansCount = document.querySelector(".count span");
let mybulletscontainer = document.querySelector(".bullets .spans");
let questionarea = document.querySelector(".question-area");
let answerArea = document.querySelector(".answers-area");
let submitbtn = document.querySelector(".submit-button");
let bullets = document.querySelector('.bullets');
let cd = document.querySelector(".countdown");
let Rcontainer = document.querySelector(".results");
function createBullets(num) {
    mySpansCount.innerHTML = num;

    //create spans
    for (let i = 0; i < num; i++){
        //create Bullet
        let theBullet = document.createElement("span");
        //check if its first Bullet
        if (i === 0) {
            theBullet.className= "on";
        }
        mybulletscontainer.appendChild(theBullet);
        
          
    }
}

function addQuestiondata(obj, count) {

    if (currentindex < count) {
        //create question title
        let questionhead = document.createElement("h2");

        let questiontext = document.createTextNode(obj['Title']);
        //Append text to question
        questionhead.appendChild(questiontext);
        //Append h2 to quiz area
        questionarea.appendChild(questionhead);

        

        //create the answers
        for (i = 1; i <= 4; i++) {
            //create main answer div
            let mainDiv = document.createElement("div");
            //add class to answer
            mainDiv.className = "answer hvr-wobble-vertical";
        
        
            let radioInput = document.createElement("input");
            //add input type +id+Data attribute
            radioInput.name = "question"; //we use it in Check Answer 
            radioInput.type = "radio";
            radioInput.id = `Answer_${i}`;
            radioInput.dataset.answer = obj[`Answer_${i}`];
            //make first option checked
            if (i === 1) {
                radioInput.checked = true;
            }
    
            //create label
            let thelabel = document.createElement('label');
            //add for attribute
            thelabel.htmlFor = `Answer_${i}`;
            //create label txt
            let thelabeltxt = document.createTextNode(obj[`Answer_${i}`]);
            thelabel.appendChild(thelabeltxt);
            //add input+label to main div
            mainDiv.appendChild(radioInput);
            mainDiv.appendChild(thelabel);
            answerArea.appendChild(mainDiv);
        
        }
    }
}
function checkAnswer(arAnswer, count) {

    let All_answers = document.getElementsByName("question");
    let theChoosenAnswer;
    for (i = 0; i < All_answers.length; i++) {
        if (All_answers[i].checked) {
            theChoosenAnswer = All_answers[i].dataset.answer;
        }
    }

    //      console.log(`The right Answer is ${arAnswer}`);
    //  console.log(`The choosen Answer is ${theChoosenAnswer}`);
        if (arAnswer === theChoosenAnswer) {
            rA++;
            console.log("good Answer");
     }
    }
   
function handelbullets() {
    
    let bulletspans = document.querySelectorAll(".bullets .spans span");
    let arrofbullets = Array.from(bulletspans);
    arrofbullets.forEach((span, index )=> {
        if (currentindex === index) {
            span.className = "on";
        }
    });
}
    
function showResults(count) {
    let theR;
    if (currentindex === count) {
        questionarea.remove();
        answerArea.remove();
        submitbtn.remove();
        bullets.remove();
        cd.remove();
        if (rA > count / 2 && rA < count) {
            theR = `<span class="good">Good</span>, ${rA} from ${count} is good`;
                
        } else if (rA === count) {
            theR = `<span class="perfect">Perfect</span>,All Answers are correct`;
        } else {
            theR = `<span class="bad">Bad</span>,Bad Try Again`;
        }
        Rcontainer.innerHTML = theR;
        }
    }
function countdown(dur,count) {
    if (currentindex < count) {
        let min, sec;
        countdowninter = setInterval(function () {
            min = parseInt(dur / 60); 
            sec = parseInt(dur % 60); 

            min = min < 10 ? `0${min}` : min;
            sec = min < 10 ? `0${sec}` : sec;
            cd.innerHTML = `${min}: ${sec}`;
            cd.className = "countdown ";
            if (--dur < 0) {
                clearInterval(countdowninter);
                submitbtn.click();
               
            }

        },1000);
    }
}



