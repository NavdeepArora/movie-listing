movieList.filter('searchForNameOrGenre', [
	searchForNameOrGenreFn
]);

function searchForNameOrGenreFn(){

	return function(arr, searchString){

		var result = [], arrayLength = arr.length;
		
		angular.forEach(arr, function(item, key){

			if(item.movie_title.toLowerCase().indexOf(searchString.toLowerCase()) > -1 || item.genres.toLowerCase().indexOf(searchString.toLowerCase()) > -1){
				result.push(item);
			}

		});
		return result;
	};

};