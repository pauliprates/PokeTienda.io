document.addEventListener('DOMContentLoaded', () => {
    const regionSelect = document.getElementById('region-select');
    const containerPokemons = document.getElementById('pokemon-container');
    const agregarPokemon = document.getElementsByClassName('add-to-team');
    const botonCarrito= document.getElementById('ir-carrito')
    const urlApi = "https://pokeapi.co/api/v2/";

    fetch(urlApi + 'pokedex/')
        .then(response => response.json())
        .then(data => {
            if (data.results) { // Asegúrate de que results esté definido
                data.results.forEach(region => {
                    const opcion = document.createElement('option');
                    opcion.value = region.url.split('/')[6]; // Obtener el ID de la región desde la URL
                    opcion.textContent = region.name.charAt(0).toUpperCase() + region.name.slice(1); // Capitalizar el nombre
                    regionSelect.appendChild(opcion);
                });
            } else {
                console.error('No se encontraron regiones en la respuesta:', data);
            }
        })
        .catch(error => console.error('Error al cargar las regiones:', error));

    // Manejar el cambio de región
    regionSelect.addEventListener('change', (evento) => {
        const regionID = evento.target.value;
    
        if (regionID) {
            containerPokemons.innerHTML = ''; 
            fetch(`${urlApi}pokedex/${regionID}/`) 
                .then(r => r.json())
                .then(data => {
                    const pokemonEntradas = data.pokemon_entries.slice(0, 50); // Limitar a 50 Pokémon
    
                    pokemonEntradas.forEach(e => {
                        const nombre = e.pokemon_species.name; 
                        fetch(`${urlApi}pokemon/${nombre}/`) 
                            .then(r => r.json())
                            .then(pokemonData => {
                                const card = createPokemnonCard(pokemonData);
                                containerPokemons.innerHTML += card;
                            })
                            .catch(error => console.error('Error al cargar el Pokémon:', error)); // Manejo de errores
                    });
                })
                .catch(error => console.error('Error al cargar la Pokédex:', error)); // Manejo de errores para la Pokédex
        }
    });
    // Función para crear una tarjeta de Pokémon
    function createPokemnonCard(pokemon) {
        const tipos = pokemon.types.map(typeInfo => typeInfo.type.name).join(','); 
        return `
            <div class="col-md-2 mb-4">
                <div class="card">
                    <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                    <div class="card-body">
                        <h5 class="card-title">${pokemon.name}</h5>
                        <p class="card-text">Tipo: ${tipos}</p>
                        <button class="btn btn-primary add-to-team" data-pokemon='${JSON.stringify(pokemon)}'>Agregar a mi equipo</button>
                    </div>
                </div>
            </div>
        `;
    }

   document.body.addEventListener('click', (evento) => {
        const boton = evento.target;

        if (evento.target.classList.contains('add-to-team')) {
            const pokemon = JSON.parse(evento.target.getAttribute('data-pokemon'))
            
            let equipo = JSON.parse(localStorage.getItem('equipoPokemon')) || [];
            equipo.push(pokemon);

            localStorage.setItem('equipoPokemon', JSON.stringify(equipo));

            alert(`${pokemon.name} ha sido agregado a tu equipo`);

            window.location.href = 'carritoPokemons.html'
        }
    } )

    botonCarrito.addEventListener('click', () => {
        window.location.href = 'carritoPokemons.html'

    })
});