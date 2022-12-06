const paraJuego = document.querySelector('#precentacion-game');
const paraTitulo = document.querySelector('#game-titulo');
const paraImagen = document.querySelector('#game-img');
const paraDescripcion = document.querySelector('#game-descripcion');

const game = JSON.parse(localStorage.getItem('Jueguito'));



let div = document.createElement('div');


div.innerHTML = `


<div class="container">
      <div class="row g-2">

      <div class="title-info justify-content-center py-2">
      <h1 id="game-titulo" class="mt-5 text-white">
          Nombre del Titulo: ${game.titulo}
      </h1>
      </div>
  
      <h5 class="card-categoria">
          ${game.categoria}</h5>
      <div id="game-img" class="d-flex justify-content-center">
  
      <iframe width="560" height="315" src="${game.video}?autoplay=1" 
      title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
      encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      
      </div>
  
      <div class="row g-2 text-dark py-2 justify-content-center">
      <h3 class="text-white ">Descripcion :</h3>
      <p id="game-descripcion" class="text-white">
          ${game.descripcion}
      </p>
  
      <div class="row justify-content-center">
      <div class="col-4 p-4 col-md-4 col-xl-3">
          <a href="/pages/error404.html" class="btn btn-light ir-detalle">Comprar</a>
      </div>
      </div>
      </div>


      </div>

    </div>


    

    
`;
paraJuego.appendChild(div);





