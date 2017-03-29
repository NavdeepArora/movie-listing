movieList.controller('MovieListController', [
    '$filter',
    'MovieListService',
    'MovieListViewModel',
    MovieListCtrlFn
]);

function MovieListCtrlFn($filter, MovieListService, MovieListViewModel){
    this.filter = $filter;
    this.movieListService = MovieListService;
    this.movieListViewModel = MovieListViewModel;
    this.page = 1;
    this.resetDisplayList();
    this.searchArray = [];
    this.autoCompleteOptions = {};
    this.setSearchArray();
    this.setAutoCompleteOptions();
};

/*MovieListCtrlFn.prototype.getMovieList = function () {
    var self = this;
    this.movieListService.getMovieList().then (function (response) {
        self.movieListViewModel.movieList = response.data;
        self.resetDisplayList();
    });
};*/

MovieListCtrlFn.prototype.setSearchArray = function () {
    var self = this;
    this.searchArray = _.chain(self.movieListViewModel.movieList).map(function(item) { return item.movie_title }).uniq().value();
};

MovieListCtrlFn.prototype.setAutoCompleteOptions = function () {
    var self = this;
    this.autoCompleteOptions = {
        minimumChars: 1,
        dropdownWidth: '50%',
        data: function (term) {
            console.log('hi');
            term = term.toUpperCase();
            var match = _.filter(self.searchArray, function (value) {
                console.log(value, term);
                return value.toUpperCase().startsWith(term);
            });
            console.log('match', match);
            //return _.pluck(match, 'name');
            return match;
        }
    }
};

MovieListCtrlFn.prototype.resetDisplayList = function () {
    this.movieListViewModel.displayList = angular.copy(this.movieListViewModel.movieList);
    this.budget = false;
    this.year = false;
    this.searchString = '';
    this.page = 1;
    this.showMovieSet();
};

MovieListCtrlFn.prototype.searchitems = function () {
    var self = this;
    this.movieListViewModel.displayList = this.filter('searchForNameOrGenre')(angular.copy(self.movieListViewModel.movieList), self.searchString);
    this.budget = false;
    this.year = false;
    this.page = 1;
    this.showMovieSet();
};

MovieListCtrlFn.prototype.sortByBudget = function () {
    var self = this;
    this.movieListViewModel.displayList = this.filter('sortByBudget')(angular.copy(self.movieListViewModel.displayList), self.budget);
    this.page = 1;
    this.showMovieSet();
};

MovieListCtrlFn.prototype.sortByYear = function () {
    var self = this;
    this.movieListViewModel.displayList = this.filter('sortByYear')(angular.copy(self.movieListViewModel.displayList), self.year);
    this.page = 1;
    this.showMovieSet();
};

MovieListCtrlFn.prototype.showPreviousMovieSet = function () {
    this.page = this.page - 1;
    this.showMovieSet();
};

MovieListCtrlFn.prototype.showNextMovieSet = function () {
    this.page = this.page + 1;
    this.showMovieSet();
};

MovieListCtrlFn.prototype.showMovieSet = function () {
    var self = this;
    this.movieListViewModel.displayListSet = angular.copy(self.movieListViewModel.displayList.slice((self.page - 1) * 10, self.page * 10));
};

