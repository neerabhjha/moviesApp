const APIURL = 'https://api.themoviedb.org/3/discover/movie?api_key=88216e588e3e9a2b9f15653339f628b6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate';
const IMGPATH = 'https://image.tmdb.org/t/p/original';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?api_key=88216e588e3e9a2b9f15653339f628b6&language=en-US&query=';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

//
getMovies(APIURL);

async function getMovies(url){
    const res = await fetch(url);
    const resData = await res.json();

    showMovies(resData.results);
    // console.log(resData);
};

function showMovies(movies){
    //clear main initially
    main.innerHTML = '';

    movies.forEach((movie) => {
        const {poster_path, title, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMGPATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class = "${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
            `
        main.appendChild(movieEl);
    });

};

form.addEventListener('submit' , (e)=>{
    e.preventDefault();

    const searchTerm = search.value;
    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm);
        search.value = ''; 
    }
})

function getClassByRate(vote){
    if(vote >= 8){
        return 'green';
    } else if(vote >= 6){
        return 'orange';
    } else{
        return 'red';
    }
};

