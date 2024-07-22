const moviePopular = 'discover/movie?include_adult=false&include_video=false&language=es-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}';
const topRated = 'discover/movie?include_adult=false&include_video=false&language=es-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200';
const seriesPopular = 'discover/tv?include_adult=false&language=es-US&page=1&sort_by=popularity.desc';



export {
    moviePopular,
    topRated,
    seriesPopular
}