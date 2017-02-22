movieList.service('MovieListProxy', [
    '$http',
    '$q',
    MovieListProxyFn
    ]);

    function MovieListProxyFn($http, $q) {
        this.http = $http;
        this.q = $q;
        this.serviceUrl = 'http://starlord.hackerearth.com/simility/movieslisting';
    };

    MovieListProxyFn.prototype.getMovieList = function () {
        var deferred = this.q.defer();
        return this.http.get(this.serviceUrl);
    };