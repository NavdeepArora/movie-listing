movieList.filter('sortByYear', [
	sortByYearFn
]);

function sortByYearFn(){

	return function(arr, order){
		
		angular.forEach(arr, function(value, key) {
   			arr[key].title_year = parseInt(value.title_year);
		});

		var result = [], arrayLength = arr.length;
		var temp = 10;

		while(result.length != arrayLength && temp != 0) {
			temp = 0, keys = [];
			
			angular.forEach(arr, function(item){
				if(item.title_year > temp){
					temp = item.title_year;
				}
			});
		
			angular.forEach(arr, function(item, key){
				if(item.title_year === temp){
					result.push(item);
					keys.push(key);
				}
			});
			
			var indexSetter = 0;
			angular.forEach(keys, function(item){
				arr.splice(item-indexSetter++,1);
			});

		}
		
		if (order === 'oldTONew') {
			return result.reverse();	
		} else {
			return result;	
		}
		
	};
};