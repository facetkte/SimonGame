var buttonColour = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;


$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){

  if(!started){

    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;

  }

});

function nextSequence(){

  userClickedPattern = []; //將之前紀錄清0，否則無法重新判別
  level++;

  $("#level-title").text("Level " + level);

  var next = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColour[next];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);


};

function playSound(name){

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

};

function animatePress(currentColour){

  $("#"+currentColour).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 200)

};

function checkAnswer(currentLevel){

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }

  else{

    $("body").addClass("game-over");
    playSound("wrong");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key To Restart");
    startOver();

    }
}

function startOver(){

  level = 0, gamePattern = [], started = false;

}
