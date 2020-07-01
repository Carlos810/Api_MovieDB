const URL_PATH = 'https://api.themoviedb.org';
const API_KEY = '445e2f1c3c3b37faf4a98b983577e886';

document.addEventListener('DOMContentLoaded', () => {
    renderNewsMovies()
    renderListMovies('popular', 'now-playing_list')
    renderListMovies('top_rated', 'top-rated-playing_list')
});

const getMovies = (filmGroup) => {
    //https://api.themoviedb.org/3/movie/now_playing?api_key=445e2f1c3c3b37faf4a98b983577e886&language=es-ES&page=1
    const url = `${URL_PATH}/3/movie/${filmGroup}?api_key=${API_KEY}&language=es-ES&page=1`;    
    
    return fetch(url)
    .then(response => response.json())
    .then(result => result.results)
    .catch(error => console.log(error));
}

const renderNewsMovies = async () => {
    const newMovies = await getMovies('now_playing');
    
    let html = '';

    newMovies.forEach((movie, index) => {
        const { id, title, overview, backdrop_path , poster_path } = movie;
        const urlImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
        const urlMovie = `../movie.html?id=${id}`;

        html += `
            <div class="carousel-item ${index === 0 ? "active" : null}" style="background-image: url('${urlImage}')">
                <div class="carousel-caption">
                    <h5>${title}</h5>
                    <p>${overview}</p>
                    <a href="${urlMovie}" class="btn btn-primary">Mas informacion</a>
                </div>
            </div>
        `;
        
    });

    html += `
        <a class="carousel-control-prev" href="#carousel-news-movies" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Anterior</span>
        </a>
        <a class="carousel-control-next" href="#carousel-news-movies" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Siguiente</span>
        </a>
    `;

    document.getElementsByClassName('list-news-movies')[0].innerHTML = html;
}

const renderListMovies = async (filmGroup, targetId) => {
    const movies = await getMovies(filmGroup);

    let html = '';
    movies.forEach((movie, index) => {
        const {id, title, poster_path} = movie;
        const movieCover = `https://image.tmdb.org/t/p/w500${poster_path}`;
        const urlMovie = `../movie.html?id=${id}`;

        if(index < 5) {
            html += `
                <li class="list-group-item">
                    <img src="${movieCover}" alt="${title}">
                    <h3>${title}</h3>
                    <a href="${urlMovie}" class="btn btn-primary">Ver más</a>
                </li>
            `;
        }
        document.getElementsByClassName(targetId)[0].innerHTML = html;
    })
    
}


