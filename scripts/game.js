let choiceContainers=$('.choice-container');
let choiceTexts=$('.choice-text');

let questions=[];
let currentQuestion={};

let questionCounter=-1;
let acceptingAnswers=false;

$.ajax({
    method:'GET',
    url:'https://opentdb.com/api.php?amount=3',
    dataType:"json"

})
.done(function(response){
    for(let loadedQuestion of response.results){
        let formattedQuestion={
            'question':$.parseHTML(loadedQuestion.question)[0].textContent
        };
        let answerChoices=[];
        for(let incorrectAnswer of loadedQuestion.incorrect_answers){
            let parsedIncorrectAnswer=$.parseHTML(incorrectAnswer)[0].textContent;
            answerChoices.push(parsedIncorrectAnswer);
        }
        formattedQuestion.answerIndex=Math.floor(Math.random()*answerChoices.length);
        let parsedCorrectAnswer=$.parseHTML(loadedQuestion.correct_answer)[0].textContent;
        answerChoices.splice(formattedQuestion.answerIndex,0,parsedCorrectAnswer);
        formattedQuestion.answerChoices=answerChoices;
        questions.push(formattedQuestion);
    }
    getNewQuestion();
})
.fail(function(err){
    console.log(err);
})

for(let choice of choiceTexts){
    $(choice).click(function(event){
        if(!acceptingAnswers) return;
        acceptingAnswers=false;
        let selectedChoice=event.target;
        let selectedAnswerIndex=$(event.target).attr("id");
        let classToApply=currentQuestion.answerIndex==selectedAnswerIndex?"correct":"incorrect";
        $(selectedChoice.parentElement).addClass(classToApply);
        setTimeout(function(){
            $(selectedChoice.parentElement).removeClass(classToApply);
            getNewQuestion();
        },1000);
        
    });
}


function getNewQuestion(){
    questionCounter++;
    if(questionCounter>=questions.length){
        return window.location.assign('menu.html');
    }
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