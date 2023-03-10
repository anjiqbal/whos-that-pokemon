
let pokemonName 
let questionCount = 0
let wins = 0
let losses = 0
let start 
let totalQuestions = 4
let clock = new Clock({template: 's'});

document.querySelector('#start').addEventListener('click', startGame)
document.querySelector('#playAgain').addEventListener('click', reload)

// checks answer on pressing enter (key 13)
function onEnter(event){
  if (event.keyCode === 13) {
    event.preventDefault()
    checkAnswer()
  }
}

function startGame(){
  start = Date.now()
  clock.start()
  document.querySelector('#input').addEventListener('keyup', onEnter)
  fetchPokemon()
  document.querySelector('.wins').innerText = wins
  document.querySelector('.losses').innerText = losses
  document.querySelector('#start').removeEventListener('click', startGame)
}


function fetchPokemon(){
  let randomNum = Math.floor(Math.random() * 1008)
  const url = 'https://pokeapi.co/api/v2/pokemon/'+randomNum
  fetch(url)
  .then(res => res.json())
  .then(data => {
    pokemonName = data.name
    console.log(pokemonName)
    document.querySelector('img').src = data.sprites.front_default
  })
  .catch(err => {
      console.log(`error ${err}`)
  });

}

function checkAnswer() {
  questionCount++
  document.querySelector('img').classList.add('show')
  
  let guess = document.querySelector('input').value
  if(guess === pokemonName){
      wins++
      document.querySelector('#guessResult').innerText = 'You got it!'
      document.querySelector('#answer').innerText = `It's ${pokemonName}!`
      document.querySelector('input').value = ''
      document.querySelector('.wins').innerText = wins
      if(questionCount <= totalQuestions){
        setTimeout(nextQuestion, 1000)
      }else {
        gameOver()
      }
      return true
  } else {
      losses++
      document.querySelector('#guessResult').innerText = 'Wrong'
      document.querySelector('#answer').innerText = `The correct answer is ${pokemonName}`
      document.querySelector('input').value = ''
      document.querySelector('.losses').innerText = losses
      if(questionCount <= totalQuestions){
        setTimeout(nextQuestion, 1000)
      }else {
        gameOver()
      }
      return false
  }
}

function nextQuestion() {
  clearAnswerAndGuess()
  document.querySelector('img').classList.toggle('show')
  setTimeout(fetchPokemon, 500)
}

function gameOver(){
  clock.stop()
  document.querySelector('#input').removeEventListener('keyup', onEnter)
  document.querySelector('#start').removeEventListener('click', startGame)
  document.querySelector('.gameOver').innerText = `Game Over!`
  document.querySelector('.scoreText').innerText =`You scored ${wins} out of ${totalQuestions + 1}`
  let end = Date.now()
  let timeTaken = (end - start) / 1000
  document.querySelector('.timeTaken').innerText = `You took ${Math.round(timeTaken)} seconds`
}

function clearAnswerAndGuess(){
  document.querySelector('#guessResult').innerText = ''
  document.querySelector('#answer').innerText = ''
}

function Clock() {
  let timer;
  let seconds = 0
  function render() {
    document.querySelector('.seconds').innerText = seconds;
    seconds++
  }

  this.stop = function() {
    clearInterval(timer);
  };

  this.start = function() {
    render();
    timer = setInterval(render, 1000);
  };
}

function reload() {
  location.reload()
}



