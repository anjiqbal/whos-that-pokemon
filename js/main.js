//Example fetch using pokemonapi.co


document.querySelector('#check').addEventListener('click', checkAnswer)
document.querySelector('#playAgain').addEventListener('click', reload)
let randomNum = Math.floor(Math.random() * 1008)
const url = 'https://pokeapi.co/api/v2/pokemon/'+randomNum
let pokemonName 



  fetch(url)

      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        pokemonName = data.name
        document.querySelector('img').src = data.sprites.front_default
      })
      .catch(err => {
          console.log(`error ${err}`)
      });


function checkAnswer() {
  console.log('hello')
  let guess = document.querySelector('input').value
  document.querySelector('img').style.filter = 'none'
  document.querySelector('img').style.transition = 'none'
  if(guess === pokemonName){
    document.querySelector('#guessResult').innerText = 'You got it!'
        document.querySelector('#answer').innerText = `It's ${pokemonName}!`
    return true
  } else {
    document.querySelector('#guessResult').innerText = 'Wrong'
    document.querySelector('#answer').innerText = `The correct answer is ${pokemonName}`
    return false
  }

}


function reload() {
  location.reload()
}
