const pokemon_container = document.getElementById('pokemon_container');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 100; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle"><span>Type :</span><br>${pokeman.type}</p>
            <p class="card-subtitle"><span>Ability :</span><br>${pokeman.moves}</p>
        </li>
    `
        )
        .join('');
    pokemon_container.innerHTML = pokemonHTMLString;
};

fetchPokemon();
