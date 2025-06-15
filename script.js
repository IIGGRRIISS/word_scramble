import { word } from "./word.js";

const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
const inputField = document.querySelector("input");
const timeText = document.querySelector(".time span b");

let selectedWord;
let timer;
let maxTime = 30;

const iniTime = (time) => {
    clearInterval(timer);
    maxTime = time;
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            timeText.innerText = maxTime;
        } else {
            clearInterval(timer);
            alert(`⏰ Time's up! The correct word was "${selectedWord}".`);
            initGame();
        }
    }, 1000);
};

const initGame = () => {
    iniTime(30);
    const randomObj = word[Math.floor(Math.random() * word.length)];
    selectedWord = randomObj.word.toLowerCase();
    const hint = randomObj.hint;

    // Scramble the word
    const wordArray = selectedWord.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    wordText.innerText = wordArray.join("");
    hintText.innerText = hint;
    inputField.value = "";
};

const checkWord = () => {
    const userWord = inputField.value.toLowerCase();
    if (!userWord) return alert("⚠️ Please enter a word!");
    if (userWord !== selectedWord) {
        return alert(`❌ "${userWord}" is incorrect. Try again!`);
    }
    alert(`✅ Correct! "${userWord}" is the right word.`);
    initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
window.addEventListener("load", initGame); // Start game on page load