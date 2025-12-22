const highScores=JSON.parse(localStorage.getItem("highScores")) || [];

$('#highScoresList').html(formHighScoresList(highScores));

function formHighScoresList(highScores){
    let scoreList="";
    for(let highScore of highScores){
        scoreList+=`<li class="high-score">${highScore.name}-${highScore.score}</li>`;
    }
    return scoreList;
}