/*

API Doc:
https://pokeapi.co/docs/v2#pokemon
Endpoint:
https://pokeapi.co/api/v2/pokemon/{id or name}/

Create an app that searches the pokemon API for a
specific pokemon and displays in #pokemon that pokemon's
- Name
- Image (front_default in the response) with the pokemon name
as the alt text
- height in inches rounded to a whole number (the response
is in decimeters)
- weight in pounds rounded to a whole number (the response
is in hectograms)
- types as a comma separated list

(Helper functions are provided to convert the pokemon's height
and weight to imperial units from metric.)

After a successful search, it should clear the input field's value.
The app should also only display one pokemon's information at a time.

BONUS:
If the pokemon is not found, it should display
"pokemon not found"

If fetch throws an error, the app should display the error message

*/
var form=document.querySelector('form')
var pokemonDivEl=document.getElementById('pokemon')
form.addEventListener('submit', function(event){
  event.preventDefault();
  var userInput=this.pokemonName.value
  if (!userInput) return
  fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`)
  .then(function(res){
    if (res.status !== 200) throw new Error('Pokemon not found')
    return res.json()
  })
  .then(renderedPokemon)
  .catch(function(error){
    var errorEl=document.createElement('p')
    errorEl.textContent=error.message
    pokemonDivEl.appendChild(errorEl)
  })
})

function renderedPokemon(pokemon){
  this.pokemonName.value=''
  pokemonDivEl.textContent=''

  var h3 = document.createElement('h3')
  h3.textContent=pokemon.name.toUpperCase()
  pokemonDivEl.appendChild(h3)

  var img=document.createElement('img')
  img.src=pokemon.sprites.front_default;
  img.alt=pokemon.name
  pokemonDivEl.appendChild(img)

  var height=document.createElement('p')
  height.textContent=convertToInches(pokemon.height)+" inches"
  pokemonDivEl.appendChild(height)

  var weight=document.createElement('p')
  weight.textContent=convertToPounds(pokemon.weight)+" pounds"
  pokemonDivEl.appendChild(weight)

  var types=document.createElement('p')
  types.textContent="Types: "+pokemon.types.map(function(typeObj){
    return typeObj.type.name
  }).join(", ")
  pokemonDivEl.appendChild(types)
}


function convertToInches(decimeters) {
  // 2.54 centimeters per inch
  return Math.round(decimeters * 10 / 2.54)
}

function convertToPounds(hectograms) {
  // 2.2 lbs per kilogram
  return Math.round(hectograms / 10 * 2.2)
}