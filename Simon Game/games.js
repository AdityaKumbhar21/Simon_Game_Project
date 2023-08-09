let colors = ["red", "blue", "green", "yellow"];
let gamePattern =[];
let userClickedPattern = [];
let randomNumber = Math.floor(Math.random()*4);
let level = 0;
let started = false;

$(document).keydown(function(){
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
    });

$(".btn").click(function (){
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
   playSound(userChosenColor);
   animatePress(userChosenColor);
   checkAnswer(userClickedPattern.length-1);
})

function nextSequence(){
    userClickedPattern = [];
    $("h1").text("Level " + level);
    level++;
    let randomNumber = Math.floor(Math.random()*4);
    console.log(randomNumber);
    
    let randomChosenNumbers = colors[randomNumber];
    $("#" + randomChosenNumbers).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenNumbers);
    playSound(randomChosenNumbers);
    
        
}

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel])
    {
        console.log("success");

        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else{
        $("body").addClass("game-over");
        $("h1").text("Game over, Press any key to restart")
        setTimeout(function (){
            $("body").removeClass("game-over"); 
        },200)
        console.log("wrong");
        startOver();
    }

}

function startOver(){
     level = 0;
      started = false;
    gamePattern =[];

}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
   setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
   },100);
}



