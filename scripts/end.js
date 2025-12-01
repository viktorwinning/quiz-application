const mostRecentScore=localStorage.getItem('mostRecentScore');
const username=$('#username');
const saveScoreBtn=$('#saveScoreBtn');

$('#finalScore').text(mostRecentScore);

username.keyup(function(){
    saveScoreBtn.attr('disabled',!username.val());
})

saveScoreBtn.click(function(){
    console.log("Save score!")
})
