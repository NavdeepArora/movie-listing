var similityMovieListingApp = angular.module('simility-movie-listing', ['ui.router', 'movie-list']);

similityMovieListingApp.config([
    '$urlRouterProvider',
    '$stateProvider',
    function ( $urlRouterProvider, $stateProvider) {
        'use strict';

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('sml-web', {
            abstract: true,
            views: {
                '': {
                    templateUrl: "/component/sml-web.html"
                }
            }
        });

        $stateProvider.state('sml-web.movieListing', {
            url:'/movie-listing',
            views: {
                'content@sml-web': {
                    templateUrl: '/component/movie-list/assets/movie-list.html',
                    controller: 'MovieListController',
                    controllerAs: 'MLC'
                }
            },
            resolve: {
                UserSelectionData: ['MovieListService', 'MovieListViewModel', function (MovieListService, MovieListViewModel) {
                    MovieListService.getMovieList().then (function (response) {
                        MovieListViewModel.movieList = response.data;
                        MovieListViewModel.showTemplate = true;
                    });
                }]
            }
        });

}]).run(['$state', 'MovieListService', 'MovieListViewModel', function($state, MovieListService, MovieListViewModel){
    $state.go('sml-web.movieListing');
}]);

angular.element(document).ready(function (){
    'use strict';
    angular.bootstrap(document.getElementById('mlapp'), [similityMovieListingApp.name])
});