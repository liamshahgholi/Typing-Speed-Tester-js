const theTimer = document.querySelector(".timer");
const testArea = document.querySelector("#test-area");
const originTextElement = document.querySelector("#origin-text p");
const testWrapper = document.querySelector(".test-wrapper");
const resetButton = document.querySelector("#reset");
const nextLevelButton = document.querySelector("#next-level");
const resultDisplay = document.querySelector("#result");

let timer = [0, 0, 0, 0];
let timerRunning = false;
let interval;

// Array of texts with increasing difficulty
const textSamples = [
    "The text to test.",
    "A quick brown fox jumps over the lazy dog.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "The five boxing wizards jump quickly.",
    "Pack my box with five dozen liquor jugs."
];

let currentTextIndex = 0;
let originText = textSamples[currentTextIndex];
originTextElement.innerHTML = originText;

function leadingZero(time) {
    return time <= 9 ? "0" + time : time;
}

function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;

    timer[3]++;
    timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor(timer[3] / 100) - (timer[0] * 60);
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);

    if (textEntered === originText) {
        testWrapper.style.borderColor = "green";
        clearInterval(interval);
        showResult();
    } else {
        if (textEntered === originTextMatch) {
            testWrapper.style.borderColor = "yellow";
        } else {
            testWrapper.style.borderColor = "red";
        }
    }
}

function showResult() {
    resultDisplay.innerHTML = `زمان شما: ${theTimer.innerHTML}`;
    resultDisplay.style.display = "block";
    nextLevelButton.style.display = "block";
    testArea.disabled = true;
}

function goToNextLevel() {
    if (currentTextIndex < textSamples.length - 1) {
        currentTextIndex++;
        originText = textSamples[currentTextIndex];
        originTextElement.innerHTML = originText;
        reset();
        resultDisplay.style.display = "none";
        nextLevelButton.style.display = "none";
        testArea.disabled = false;
    } else {
        alert("Congratulations! You've completed all levels.");
        reset();
    }
}

function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}

function start() {
    let textEnteredLength = testArea.value.length;

    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

testArea.addEventListener("keypress", start);
testArea.addEventListener("keyup", spellCheck);
resetButton.addEventListener("click", reset);
nextLevelButton.addEventListener("click", goToNextLevel);
