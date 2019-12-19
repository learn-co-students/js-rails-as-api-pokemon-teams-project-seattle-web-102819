const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', () => {
    fetchTrainers()


})


fetchTrainers = () => {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(data => buildTrainerCard(data))
}

buildTrainerCard = (trainers) => {
    trainers.forEach(trainer => {
        const div = document.createElement('div')
        div.classList.add('card')
        div.id = trainer.id
        
        const h2 = document.createElement('h2')
        h2.textContent = trainer.name

        const addBtn = document.createElement('button')
        addBtn.textContent = 'Add Pokemon'
        addBtn.setAttribute('data-trainer-id', `${trainer.id}`)
        addBtn.addEventListener('click', addPokemon)

        const ul = document.createElement('ul')
        ul.id = `trainer-${trainer.id}-pokemon`

        // function to add pokemon to ul
        const pokemonRoster = trainer.pokemons
        buildPokemonRoster(pokemonRoster, ul)

        //add all elements to card and card to main
        div.appendChild(h2)
        div.appendChild(addBtn)
        div.appendChild(ul)
        main.appendChild(div)
    })
}

addPokemon = (event) => {
    const trainerId = event.target.dataset.trainerId
    const ul = document.getElementById(`trainer-${trainerId}-pokemon`)
    if (ul.childElementCount < 6) {                    
        fetch(POKEMONS_URL, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: trainerId
            })
        })
        .then(resp => resp.json())
        .then((data) => {
            const dataArray = []
            dataArray.push(data)
        buildPokemonRoster(dataArray, ul)})
    }
}

buildPokemonRoster = (array, ul) => {
    array.forEach(pokemon => {
        if (ul.childElementCount < 6) {
        const li = document.createElement('li')
        li.textContent = `${pokemon.nickname} (${pokemon.species})`

        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Release'
        deleteBtn.setAttribute('data-pokemon-id', `${pokemon.id}`)
        deleteBtn.addEventListener('click', deletePokemon)
        deleteBtn.classList.add('release')

        li.appendChild(deleteBtn)
        ul.appendChild(li)
        }
    })
}

deletePokemon = (event) => {
    const pokemonId = event.target.dataset.pokemonId
    fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: 'DELETE'
    })
    // .then(resp => resp.json())
    // .then(data => data)
    event.target.parentNode.remove()
}
