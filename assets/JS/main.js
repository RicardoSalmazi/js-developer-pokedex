const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 12;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <a href="detalhePk.html?id=${pokemon.number}" class="pokemon-link">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${(pokemon.types || []).map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </a>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        if (!pokemons || pokemons.length === 0) {
            console.warn('Sem Pokemons disponíveis. Checar a fonte.');
            return;
        }
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});

// ---------------------------- Até aqui não alterar nada. Acima tá tudo certo --------------------------------- //


// Teste. Ok Funcionou
function renderPokemon(pokemon) {
    const pokemonList = document.getElementById('pokemonList');

    // Cria o item de lista com o link para a página de detalhes
    const listItem = document.createElement('li');
    listItem.classList.add('pokemon');

    // Adiciona um link que abre detalhePk.html com o ID do Pokémon
    listItem.innerHTML = `
        <a href="detalhePk.html?id=${pokemon.id}">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map(type => `<li class="type">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.imageUrl}" alt="${pokemon.name}">
            </div>
        </a>
    `;

    pokemonList.appendChild(listItem);
}
