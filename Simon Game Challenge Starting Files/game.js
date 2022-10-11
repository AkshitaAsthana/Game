gamePattern = [];
userClickedPattern = [];
buttonColours = ["red", "blue", "yellow", "green"];
var level = 0;
started = false;
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
})

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor((Math.random() * 3) + 1);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);

}

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userSequence = userClickedPattern.length - 1;
    checkAnswer(userSequence);


})
function playSound(_name) {
    var audio = new Audio("sounds/" + _name + ".mp3");
    audio.play();
}
function animatePress(currenColour) {
    $("#" + currenColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currenColour).removeClass("pressed");
    }, 200); //delay is in milliseconds 
}
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 500);
            userClickedPattern = [];
        }
    }
    else {
        var audio1 = new Audio("sounds/wrong.mp3");
        audio1.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }

}


function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}
