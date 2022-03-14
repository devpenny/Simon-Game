var blueAudio = new Audio("sounds/blue.mp3");
var greenAudio = new Audio("sounds/green.mp3");
var redAudio = new Audio("sounds/red.mp3");
var yellowAudio = new Audio("sounds/yellow.mp3");
var wrongAudio = new Audio("sounds/wrong.mp3");
var answerList = [];
var playerAnswers = [];
var clickable = false;
var interval = 800;
var isRunning = false;


function generateColor() {
    var colorList = ["red", "blue", "green", "yellow"];
    var randomColor = colorList[Math.floor(Math.random() * 4)];
    return randomColor;
}

function playAnswers(answersArray) {
    answersArray.forEach((answer, index) => {
        setTimeout(() => {
            switch (answer) {
                case "blue":
                    blueAudio.play();
                    break;
                case "red":
                    redAudio.play();
                    break;
                case "yellow":
                    yellowAudio.play();
                    break;
                case "green":
                    greenAudio.play();
                    break;
            }
            $("." + answer).addClass("pressed");
            setTimeout(() => $("." + answer).removeClass("pressed"), 100);
        }, index * interval);
    })
}


function gameStart() {
    answerList.push(generateColor());
    $("h1").text("level " + answerList.length);
    console.log(answerList);
    playAnswers(answerList);
    setTimeout(() => clickable = true, interval * answerList.length);
}

const asyncPlayAnswer = (answer) => new Promise((resolve, reject) => {
    switch (answer) {
        case "blue":
            blueAudio.play();
            break;
        case "red":
            redAudio.play();
            break;
        case "yellow":
            yellowAudio.play();
            break;
        case "green":
            greenAudio.play();
            break;
    }
    $("." + answer).addClass("pressed");
    setTimeout(() => $("." + answer).removeClass("pressed"), 100);
    setTimeout(() => {
        resolve();
    }, interval);
});

const asyncGameStart = async () => {
    answerList.push(generateColor());
    $("h1").text("level " + answerList.length);
    for (answer of answerList) {
        await asyncPlayAnswer(answer);
    }
    clickable = true;
}

$("body").on("keydown", (event) => {
    if (event.key === "a" && !isRunning) {
        $("h1").text("level 1");
        isRunning = true;
        $("body").removeClass("game-over");
        gameStart();
    }

})

$(".btn").on("click", (button) => {
    if (clickable) {
        playerAnswers.push(button.target.id);


        // ANIMAÇAO DO BOTAO PRESSIONADO
        $("." + button.target.id).addClass("pressed");
        setTimeout(() => $("." + button.target.id).removeClass("pressed"), 100);

        switch (button.target.id) {
            case "blue":
                blueAudio.play();
                break;
            case "red":
                redAudio.play();
                break;
            case "yellow":
                yellowAudio.play();
                break;
            case "green":
                greenAudio.play();
                break;
        }


        // CHECKS THE FAILURE
        if (playerAnswers[playerAnswers.length - 1] !== answerList[playerAnswers.length - 1]) {
            gameOver();


            // DESATIVA O CLICK E INVOCA O ROUND QUANDO TERMINA A SELEÇAO
        } else if (playerAnswers.length == answerList.length) {
            clickable = false;
            playerAnswers = [];
            setTimeout(asyncGameStart, 800);
        }
    }
})

function gameOver() {
    wrongAudio.play();
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press A to continue.");

    answerList = [];
    playerAnswers = [];
    isRunning = false;
    clickable = false;
}