const mostRecentScore=localStorage.getItem('mostRecentScore');
const highScores=JSON.parse(localStorage.getItem('highScores')) || [];
const username=$('#username');
const saveScoreBtn=$('#saveScoreBtn');
const maxHighScores=5;

$('#finalScore').text(mostRecentScore);

username.keyup(function(){
    saveScoreBtn.attr('disabled',!username.val());
})

saveScoreBtn.click(function(){
    const score={
        score:mostRecentScore,
        name:username.val(),

    };
    if(highScores.length<maxHighScores || mostRecentScore>highScores[maxHighScores-1].score){
        highScores.push(score);
        highScores.sort(function(a,b){
            return b.score-a.score;
        });
        highScores.splice(maxHighScores);
    }
    else if(mostRecentScore<highScores[maxHighScores-1].score){
        alert('Recent score is not saved as it is less than the last high score in top 5');
    }
    else{
        for(let i=0;i<highScores.length-1;i++){
            if(highScores[i].score===mostRecentScore){
                highScores[i]=score;
                break;
            }

        }
    }
    console.log(highScores);
    localStorage.setItem('highScores',JSON.stringify(highScores));
    window.location.assign('index.html');
    
})
