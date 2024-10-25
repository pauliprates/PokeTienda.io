document.addEventListener('DOMContentLoaded', () => {
    const botonEliminarEquipo = document.getElementById('limpiar-equipo')
    const botonVolverTienda = document.getElementById('volver-tienda')
    const equipoContainer = document.getElementById('equipo-container');

    const equipo = JSON.parse(localStorage.getItem('equipoPokemon')) || [];
    console.log(equipo);
    console.log("hola");

    equipo.forEach(pokemon => {
        const tipos = pokemon.types.map(typeInfo => typeInfo.type.name).join(',');
        const card =  `<div class="col-md-2 mb-4">
                <div class="card">
                    <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                    <div class="card-body">
                        <h5 class="card-title">${pokemon.name}</h5>
                        <p class="card-text">Tipo: ${tipos}</p> 
                    </div>
                </div>
            </div>`;    

        equipoContainer.innerHTML += card;
    });

    botonEliminarEquipo.addEventListener('click', () => {
        localStorage.removeItem('equipoPokemon') 
        equipoContainer.innerHTML = ''

    })
    botonVolverTienda.addEventListener('click', () => {
        window.location.href = 'index.html'

    })
     
});
