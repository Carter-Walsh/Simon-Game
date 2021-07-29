let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

// Starting the game
$(document).on("keypress", function() {
  $("#level-title").text("Level " + level);
  nextSequence();
});

// What the button will do when clicked
$(".btn").on("click", function() {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

});

// Checking the user's answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {

    // Play wrong sound
    playSound("wrong");

    // Add and take away game over class
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // Change title
    $("#level-title").text("Game Over, Press Any Key to Restart.");

    // Start over
    startOver();

  }
}

// Next button to be selected
function nextSequence() {

  userClickedPattern = [];

  // Selecting a random color from array
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Assigning flash animation to random button from array
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play correct sound for the next button in the sequence
  playSound(randomChosenColor);

  // Go up a Level
  level++;

  // Update title of game
  $("#level-title").text("Level " + level);

}

// Restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}


// Play sounds for corresponding buttons
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animation for pressed button
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};
