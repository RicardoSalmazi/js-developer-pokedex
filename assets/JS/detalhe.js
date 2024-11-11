document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');

    if (pokemonId) {
        loadPokemonDetails(pokemonId);
    }
});

function loadPokemonDetails(pokemonId) {
    pokeApi.getPokemonById(pokemonId).then((pokemon) => {
        if (pokemon) {
            const pokemonDetails = document.getElementById('pokemonDetails');
            pokemonDetails.innerHTML = `
                <h2>${pokemon.name}</h2>
                <p><strong>ID:</strong> #${pokemonId}</p>
                <p><strong>Types:</strong> ${pokemon.types.join(', ')}</p>
                <img src="${pokemon.imageUrl}" alt="${pokemon.name}">
            `;
        } else {
            console.error('Pokémon not found!');
            pokemonDetails.innerHTML = `<p>Pokémon not found!</p>`;
        }
    }).catch((error) => {
        console.error('Error loading Pokémon details:', error);
        document.getElementById('pokemonDetails').innerHTML = `<p>Error loading Pokémon details.</p>`;
    });
}