'use strict';
/*global angular, $snaphy */

angular.module($snaphy.getModuleName())

/**
 * Filter for capitalizing the first word.
 */
.filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
})

/**
 * For replacing underscope to spaces
 * @param  {[type]} 'underscoreless'
 * @param  {[type]} function         (             [description]
 * @return {[type]}                  [description]
 */
.filter('underscoreless', function () {
  return function (input) {
      return input.replace(/_/g, ' ');
  };
})

.filter('removeSpaces', function () {
    return function (text) {
        var str = text.replace(/\s+/g, '');
        return str;
    };
})


/**
 * Filters out all duplicate items from an array by checking the specified key
 * @param [key] {string} the name of the attribute of each object to compare for uniqueness
 if the key is empty, the entire object will be compared
 if the key === false then no filtering will be performed
 * @return {array}
 */
.filter('unique', function () {

  return function (items, filterOn) {

    if (filterOn === false) {
      return items;
    }

    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];

      var extractValueToCompare = function (item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {
          return item[filterOn];
        } else {
          return item;
        }
      };

      angular.forEach(items, function (item) {
        var valueToCheck, isDuplicate = false;

        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          newItems.push(item);
        }

      });
      items = newItems;
    }
    return items;
  };
});
