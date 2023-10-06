const botonBuscar = document.getElementById('btnBuscar');
const cabecera = document.getElementById('cabecera');
const titulo = document.getElementById('titulo');
const subtitulo = document.getElementById('subtitulo');
const categorias = document.getElementById('categorias');
const lista = document.getElementById('lista');
const btnClose = document.getElementById('btnClose');

URL = 'https://japceibal.github.io/japflix_api/movies-data.json';

fetch(URL)
.then (response => response.json())
.then (data => {
    console.log(data);
    botonBuscar.addEventListener('click', () => {
        let busqueda = document.getElementById('inputBuscar').value;
        addMovies(data,busqueda)
        console.log(busqueda)
      
    });
})


function addMovies(arr, peliculaABuscar){
    let moviesList = [];
    arr.map(i => {
        if (i.title.toLowerCase().includes(peliculaABuscar.toLowerCase()) || i.title.toUpperCase().includes(peliculaABuscar.toUpperCase()) ||
        i.overview.toLowerCase().includes(peliculaABuscar.toLowerCase()) || i.overview.toUpperCase().includes(peliculaABuscar.toUpperCase()) ||
        i.tagline.toLowerCase().includes(peliculaABuscar.toLowerCase()) || i.tagline.toUpperCase().includes(peliculaABuscar.toUpperCase())
        //i.genres.name.filte   r(peliculaABuscar.toLowerCase()).includes(peliculaABuscar.toLowerCase()) || i.genres.name.filter(peliculaABuscar.toUpperCase()).includes(peliculaABuscar.toUpperCase())
        
        //  i.genres.name.toLowerCase().includes(peliculaABuscar.toLowerCase()) || i.genres.name.toUpperCase().includes(peliculaABuscar.toUpperCase())
        ) 
        {
            moviesList.push(i)
        }else {
            for (let j=0 ; j < i.genres.length ; j++){
                if(i.genres[j].name.toLowerCase().includes(peliculaABuscar.toLowerCase()) || i.genres[j].name.toUpperCase().includes(peliculaABuscar.toUpperCase())) {
                    moviesList.push(i)
            }
                }
        }
        

    })
    let htmlContentToAppend = "";
    for (let movie of moviesList) {
        htmlContentToAppend += `

        <li class="list-group-item list-group card" id="${movie.id}">
           <div class="listMovies d-flex justify-content-between align-items-center">
                <div>
                <h3>${movie.title}</h3>
                <p>${movie.tagline}</p>
                </div>
                 <div class="estrellas">${stars(movie.vote_average / 2)}</div>
            </div>
        </li>
    
        `
    }
    
    lista.innerHTML = htmlContentToAppend;
    
    abrirVentana(moviesList)


}
function stars(cantidadStars) {
    const maxStars = 5;
    const filledStars = Math.round(cantidadStars);
    const emptyStars = maxStars - filledStars;
    const starHTML = '<span class="fa fa-star checked"></span>';
    const emptyStarHTML = '<span class="fa fa-star"></span>';
    const starsHTML =
      starHTML.repeat(filledStars) + emptyStarHTML.repeat(emptyStars);
    return starsHTML;
  }
  
  function abrirVentana(moviesList) {
    let cards = document.getElementsByClassName('card');
    console.log(cards)
    
    for (let card of cards){
        card.addEventListener('click', () => {
            for (let movie of moviesList){
                if (movie.id == card.id){
                    let categoriesToAppend = ""
                    titulo.innerHTML = movie.title;
                    subtitulo.innerHTML = movie.overview;
                    for (let categories of movie.genres){
                        categoriesToAppend += categories.name + " | "
                    }
                    categorias.innerHTML = categoriesToAppend;
                    cabecera.classList.remove('d-none')

                    let date = movie.release_date.split('-')

                    cabecera.innerHTML+= `
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">More</button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Year: ${date[0]}</a></li>
                                <li><a class="dropdown-item" href="#">Runtime: ${movie.runtime} mins</a></li>
                                <li><a class="dropdown-item" href="#">Budget: $${movie.budget}</a></li>
                                <li><a class="dropdown-item" href="#">Revenue: $${movie.revenue}</a></li>
                            </ul>
                        </div>
                    `

                }
        }})
    }
    btnClose.addEventListener('click', () => {
        cabecera.classList.add('d-none');
        console.log(btnClose)
    });
  }