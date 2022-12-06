const cardDejuego = document.querySelector('#cardJuego');


cardDejuego.addEventListener('click',verDetalle);

function verDetalle(e){
    e.preventDefault();
    if(e.target.classList.contains('ir-detalle')){
    
    const juegoSeleccionado=e.target.parentElement.parentElement;
    console.log(juegoSeleccionado);
    
    pasarJuego(juegoSeleccionado);
    }else{
       //falta alerta de error 
    }
    }

    
function pasarJuego(juego){
    const infoJuego={
        imagen: juego.querySelector('img').src,
        video: juego.querySelector('a'). href,
		titulo: juego.querySelector('h3').textContent,
		categoria: juego.querySelector('h5').textContent,
        descripcion: juego.querySelector('p').textContent,
		
    };

    
    localStorage.setItem('Jueguito',JSON.stringify(infoJuego));

    location.href='/pages/detalleJuego.html';

}