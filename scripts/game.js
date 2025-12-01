const choiceContainers=$('.choice-container');
const choiceTexts=$('.choice-text');
const progressText=$('#progressText');
const progressBarFull=$('#progressBarFull');
const scoreText=$('#score');

const scoreBonus=10;

let questions=[];
let currentQuestion={};

let questionCounter=-1;
let acceptingAnswers=false;
let score=0;

$.ajax({
    method:'GET',
    url:'https://opentdb.com/api.php?amount=7',
    dataType:"json"

})
.done(function(response){
    for(const loadedQuestion of response.results){
        const formattedQuestion={
            'question':$.parseHTML(loadedQuestion.question)[0].textContent
        };
        const answerChoices=[];
        for(const incorrectAnswer of loadedQuestion.incorrect_answers){
            const parsedIncorrectAnswer=$.parseHTML(incorrectAnswer)[0].textContent;
            answerChoices.push(parsedIncorrectAnswer);
        }
        formattedQuestion.answerIndex=Math.floor(Math.random()*answerChoices.length);
        const parsedCorrectAnswer=$.parseHTML(loadedQuestion.correct_answer)[0].textContent;
        answerChoices.splice(formattedQuestion.answerIndex,0,parsedCorrectAnswer);
        formattedQuestion.answerChoices=answerChoices;
        questions.push(formattedQuestion);
    }
    getNewQuestion();
})
.fail(function(err){
    console.log(err);
})

for(const choice of choiceTexts){
    $(choice).click(function(event){
        if(!acceptingAnswers) return;
        acceptingAnswers=false;
        const selectedChoice=event.target;
        const selectedAnswerIndex=$(event.target).attr("id");
        const classToApply=currentQuestion.answerIndex==selectedAnswerIndex?"correct":"incorrect";
        $(selectedChoice.parentElement).addClass(classToApply);
        if(classToApply==='correct'){
            increamentScore(scoreBonus);
        }
        setTimeout(function(){
            $(selectedChoice.parentElement).removeClass(classToApply);
            getNewQuestion();
        },1000);
        
    });
}


function getNewQuestion(){
    questionCounter++;
    if(questionCounter>=questions.length){
        return window.location.assign('index.html');
    }
    progressText.text(`${questionCounter+1}/${questions.length}`);
    progressBarFull.css({'width':`${((questionCounter+1)/questions.length)*100}%`});
    currentQuestion=questions[questionCounter];
    $('#question').text(currentQuestion.question);
    for(let index=0;index<choiceContainers.length;index++){
        if(index<currentQuestion.answerChoices.length){
            choiceContainers.eq(index).find(".choice-text").text(currentQuestion.answerChoices[index]);
            choiceContainers.eq(index).css({'visibility':'visible'});
        }
        else{
            choiceContainers.eq(index).css({'visibility':'hidden'});
        }

    }
    acceptingAnswers=true;

}

function increamentScore(number){
    score+=number;
    scoreText.text(score);
}

