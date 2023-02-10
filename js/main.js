//Example fetch using pokemonapi.co
document.querySelector('#play').addEventListener('click', getFetch)
document.querySelector('#check').addEventListener('click', checkAnswer)

function getFetch(){
  let randomNum = Math.floor(Math.random() * 1008)
  const url = 'https://pokeapi.co/api/v2/pokemon/'+randomNum

 
  let pokeStore = []
  let pokeImg = []


  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        const pokemonName = data.name
        //document.querySelector('h1').innerText = pokemonName
        document.querySelector('img').src = data.sprites.front_default

        // pokeStore.push(data.types[0].type.name)
        // pokeImg.push(data.sprites.front_shiny)
        // pokeStore.push(data.types[0].type.name)
        // pokeImg.push(data.sprites.front_shiny)
    
        // if((pokeStore[0] === "grass" && pokeStore[1] === 'water')){
        //   document.querySelector('#pokeImg1').src = pokeImg[0]
        //   document.querySelector('#pokeImg2').src = pokeImg[1]
        //   document.querySelector('h2').innerText = " 2x > "
        // }
        
        


      })
      .catch(err => {
          console.log(`error ${err}`)
      });

}





