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
            }
        });

}]).run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $state.go('sml-web.movieListing');
}]);

angular.element(document).ready(function (){
    'use strict';
    angular.bootstrap(document.getElementById('mlapp'), [similityMovieListingApp.name])
});