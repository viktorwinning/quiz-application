let choiceContainers = $('.choice-container');
let choiceTexts = $('.choice-text');

let questions = [
  {
    question: 'How many questions are expected in quiz?',
    answerChoices: ['5', '6 - 10', '11 - 15', '16 - 20']
  },
  {
    question: 'Select category',
    answerChoices: ['any category', 'random category']
  },
  {
    question: 'Select Difficulty',
    answerChoices: ['any difficulty', 'easy', 'medium', 'hard'],
  },
  {
    question: 'Select Type',
    answerChoices: ['any type', 'multiple', 'boolean'],
  }
];
let questionCounter = -1;
let acceptingAnswers = false;

for (let choice of choiceTexts) {
  $(choice).click(function (event) {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    let selectedAnswerText = $(event.target).text();
    console.log(selectedAnswerText);
    getNewQuestion();
  });
}
getNewQuestion();

function getNewQuestion() {
  questionCounter++;
  if (questionCounter >= questions.length) {
    return window.location.assign('menu.html');
  }
  let currentQuestion = questions[questionCounter];
  $('#question').text(currentQuestion.question);
  for (let index = 0; index < choiceContainers.length; index++) {
    if (index < currentQuestion.answerChoices.length) {
      choiceContainers.eq(index).find(".choice-text").text(currentQuestion.answerChoices[index]);
      choiceContainers.eq(index).css({ 'visibility': 'visible' });
    } else {
      choiceContainers.eq(index).css({ 'visibility': 'hidden' });
    }
  }
  acceptingAnswers = true;
}