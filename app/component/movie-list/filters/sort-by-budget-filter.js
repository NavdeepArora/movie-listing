movieList.filter('sortByBudget', [
	sortByBudgetFn
]);

function sortByBudgetFn(){

	return function(arr, order){
		
		angular.forEach(arr, function(value, key) {
   			arr[key].budget = parseInt(value.budget);
		});

		var result = [], arrayLength = arr.length;
		var temp = 10;

		while(result.length != arrayLength && temp != 0) {
			temp = 0, keys = [];
			
			angular.forEach(arr, function(item){
				if(item.budget > temp){
					temp = item.budget;
				}
			});
		
			angular.forEach(arr, function(item, key){
				if(item.budget === temp){
					result.push(item);
					keys.push(key);
				}
			});
			
			var indexSetter = 0;
			angular.forEach(keys, function(item){
				arr.splice(item-indexSetter++,1);
			});

		}
		
		if (order === 'lowToHigh') {
			return result.reverse();	
		} else {
			return result;	
		}
		
	};
};