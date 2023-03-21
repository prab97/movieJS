const API_KEY = 'abaf24bab013d49df9cfdcd02f2d3bd3';
const url = `https://api.themoviedb.org/3/discover/movie/?api_key=${API_KEY}&page=1`;
const image_url = `https://image.tmdb.org/t/p/w342`

const main = document.getElementById('main');
const form = document.getElementById('#form');
const search = document.getElementById('#search');

const search_query = `https://api.themoviedb.org/3/search/movie/?api_key=${API_KEY}&query=`


async function getMovies(url) {
    const resp = await fetch(url);
    const resData = await resp.json()
    //console.log(resData)
    showMovies(resData.results);
}

getMovies(url);


function showMovies(movies){
    main.innerHTML = '';
    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview} = movie
        const movieEl = document.createElement('div');
        // img.src = image_url + movie.poster_path;
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        
            <div class="movie">
                <img src=${image_url + movie.poster_path} alt=${title} />
                  <div class="movie-info">
                     <h3>${movie.title}</h3>
                     <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                   </div>
                <div class="overview">
                  <h4>Overview:</h4>
                  ${overview}
                </div>
             </div>
        
        `
       main.appendChild(movieEl);

    })
   // return resData;
   

}

function getClassByRate(vote) {
    if(vote >= 8){
        return 'green'

    }else if(vote >= 5 && vote < 8){
        return 'orange'
    }else{
        return 'red';
    }
}



form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const searchTerm = search.value

    if(searchTerm){
        getMovies(search_query + searchTerm );
        search.value = '';
    } 
})