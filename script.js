'use strict';
/*
    WEB230 Final Project - Hangman Game
    { name, student number, date }
*/

/*
Name: Bhavdeep singh Chahal
Student Number: 0765830
Date: 23 April 2021
*/

const DOM = {
    Clue: document.getElementById('clue'),
    Letters: document.getElementById('letters'),
    Image: document.getElementById('image').querySelector("img")
 },
 SecretWord = 'JAVASCRIPT';
 
 let maximumGuess = 6, 
    wrongGuessCount = 0,
    noOfCharactersUnmatched = SecretWord.split("").filter(v => v !== " ").length,
    hintMessage = [];
 
 // Display hint message in format of underscore and space
 prepareHintMessage();
 
 // Add event listener to letters
 DOM.Letters.addEventListener('click', onLetterClickHandler)
 
 function onLetterClickHandler(event) {
    
    const SelectedCharacter = event.target.innerText;
	if(SelectedCharacter.length>1) return;
    console.log(`SecretWord: ${SecretWord}`)
    console.log(`SelectedCharacter: ${SelectedCharacter}`);

    let matchedIndexes = [];
    
    // find all the indexes(position) of selected character in a secret word
    SecretWord.split('').filter((value, index) => {
       if(value === SelectedCharacter) {
          matchedIndexes.push(index);
       }
    })
 
    // If selected character is not in a secret word then update image
    if(!matchedIndexes.length) {
       wrongGuessCount++;
       DOM.Image.src = `assets/hangman${wrongGuessCount}.png`;      
    }
 
    // If a character is found in a secret word and a character is not selected again 
    if(matchedIndexes.length && !event.target.classList.value) {
       event.target.classList.add('used');
       matchedIndexes.forEach((value) => hintMessage[value] = SelectedCharacter);
       DOM.Clue.innerText = hintMessage.join('');
       noOfCharactersUnmatched -= matchedIndexes.length;
       matchedIndexes = [];
    }
 
    if(noOfCharactersUnmatched === 0 || wrongGuessCount === maximumGuess) {
       // Show winner image when all characters are matched
       if(noOfCharactersUnmatched === 0) {
          DOM.Image.src = `assets/winner.png`;
       }
       DOM.Letters.removeEventListener('click', onLetterClickHandler);
       document.getElementById("gameover").querySelector("p").style.display = "block";
       DOM.Clue.innerText = SecretWord;
    }
 }
 
 function prepareHintMessage() {   
    for(let index = 0; index < SecretWord.length; index++) {
       if(SecretWord[index] === " ") {
          hintMessage[index] = " ";
          continue;
       }
       hintMessage[index] = "_";
    }
    DOM.Clue.innerText = hintMessage.join('');
 }
 
 function resetGame(event) {
    maximumGuess = 6,
    wrongGuessCount = 0,
    noOfCharactersUnmatched = SecretWord.split("").filter(v => v !== " ").length,
    hintMessage = [];
 
    // Removed used class from all letters 'span tag'
    const AllLetters = document.getElementsByClassName('letters')[0].children
    for(let count = 0; count < AllLetters.length; count++) {
       AllLetters[count].className = '';
    }
 
    // Set default hangman Image
    DOM.Image.src = `assets/hangman0.png`;
 
    // Add event listener to all letters 'div tag'
    DOM.Letters.addEventListener('click', onLetterClickHandler);
    
    // Prepare hint
    prepareHintMessage();

 }
 