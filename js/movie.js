const URL_PATH = 'https://api.themoviedb.org';
const API_KEY = '445e2f1c3c3b37faf4a98b983577e886';
let MOVIE_ID = "";

document.addEventListener('DOMContentLoaded', () => {
    MOVIE_ID = getUrlVars().id;    
    renderMovieDetails(MOVIE_ID);    
});

const getUrlVars = () => {
    let dict = {};    
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value){
        dict[key] = value;
    });
    return dict;    
}

const getMovieDetails = (movieId) => {
    const url = `${URL_PATH}/3/movie/${movieId}?api_key=${API_KEY}&language=es-ES`;

    return fetch(url)
        .then(response => response.json() )
        .then(result => result ) 
        .catch(error => console.log(error) )
}

const renderMovieDetails = async (movieId) => {
    const movieDetails = await getMovieDetails(movieId);      
    const { backdrop_path, poster_path, title } = movieDetails;
    renderBackground(backdrop_path);
    renderPoster(poster_path, title);
}

const renderBackground = (backdrop_path) => {
    const urlBackground = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    document.getElementsByClassName('movie-info')[0].style.backgroundImage = `url( '${urlBackground}' )`;
}

const renderPoster = (poster_path, title) => {
    const urlPoster = `https://image.tmdb.org/t/p/original${poster_path}`;
    const html = `<img src="${urlPoster}" class="img-fluid movie-info__poster-img" alt="${title}" />`;
    document.getElementsByClassName('movie-info__poster')[0].innerHTML = html;
}
