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
    this.searchArray = [];
    this.autoCompleteOptions = {};
    this.setSearchArray();
};

MovieListCtrlFn.prototype.setSearchArray = function () {
    var self = this;
    this.searchArray = _.chain(self.movieListViewModel.movieList).map(function(item) { return item.movie_title }).uniq().value();
    this.setAutoCompleteOptions();
    this.resetDisplayList();
};

MovieListCtrlFn.prototype.setAutoCompleteOptions = function () {
    var self = this;
    this.autoCompleteOptions = {
        minimumChars: 1,
        dropdownWidth: '50%',
        data: function (term) {
            term = term.toUpperCase();
            var match = _.filter(self.searchArray, function (value) {
                return value.toUpperCase().startsWith(term);
            });
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

