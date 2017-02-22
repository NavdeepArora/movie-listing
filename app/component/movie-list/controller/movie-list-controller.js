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
    this.getMovieList();
    this.page = 1;
};

MovieListCtrlFn.prototype.getMovieList = function () {
    var self = this;
    this.movieListService.getMovieList().then (function (response) {
        self.movieListViewModel.movieList = response.data;
        self.resetDisplayList();
    });
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

