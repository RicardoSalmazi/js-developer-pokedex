const pokeApi = {
    getPokemons: (offset = 0, limit = 10) => {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        return fetch(url)
            .then(response => response.json())
            .then(jsonBody => jsonBody.results)
            .then(pokemonList => {
                return Promise.all(pokemonList.map(pokemon => 
                    fetch(pokemon.url)
                        .then(response => response.json())
                        .then(details => ({
                            name: details.name,
                            number: details.id,
                            types: details.types.map(typeSlot => typeSlot.type.name),
                            photo: details.sprites.other['official-artwork'].front_default
                        }))
                ));
            })
            .catch(error => {
                console.error("Error fetching Pokémon list:", error);
                return [];
            });
    },

    getPokemonById: (id) => {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
            .then(data => ({
                name: data.name,
                types: data.types.map(typeInfo => typeInfo.type.name),
                imageUrl: data.sprites.other['official-artwork'].front_default
            }))
            .catch(error => {
                console.error("Error fetching Pokémon by ID:", error);
                return null;
            });
    }
};



// -------------------------- Abaixo, original que estava funcionando precariamente ----------------------------- //
// pokeApi.getPokemons = async (offset = 0, limit = 12) => {
//     const url = "https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}"
//     try {
//         const response = await fetch(url)
//         const jsonBody = await response.json()
//         const basicPokemons = jsonBody.results
//         // Tive que explorar isto aqui e mudar o script do Renan. 
//         // Mapeia cada Pokémon para obter detalhes adicionais
//         const detailRequests = basicPokemons.map((pokemon) => fetch(pokemon.url)
//             .then((response_1) => response_1.json())
//             .then((details) => ({
//                 number: details.id,
//                 name: details.name,
//                 types: details.types.map((typeSlot) => typeSlot.type.name),
//                 photo: details.sprites.other["official-artwork"].front_default
//             }))
//         )
//         return await Promise.all(detailRequests)
//     } catch (error) {
//         return console.error(error)
//     }
// }
