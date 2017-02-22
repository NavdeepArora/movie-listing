
movieList.service('MovieListViewModel', [
    MovieListViewModelFn
]);

function MovieListViewModelFn(){
    this.movieList = '';
    this.displayList = '';
    this.displayListSet = '';
};
