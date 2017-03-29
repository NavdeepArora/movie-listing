movieList.service('MovieListService', [
    'MovieListProxy',
    MovieListServiceFn
    ]);

    function MovieListServiceFn(MovieListProxy) {
        this.movieListProxy = MovieListProxy;
    };

    MovieListServiceFn.prototype.getMovieList = function () {
        return this.movieListProxy.getMovieList();
    };