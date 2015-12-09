'use strict';
/*global angular, $snaphy, jQuery, BaseTableDatatables*/

angular.module($snaphy.getModuleName())


.directive('snaphyLoadDatatable', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function () {
           $timeout(function(){
               // Initialize when page loads
               jQuery(function(){ BaseTableDatatables.init(); });
           }); //timeout method..
        }//End of Link function...
    }; // End of return
}])

/**
 * For mapping the table values..with desired property.
 */
    .directive('automataMapValue', [function () {
    return {
        restrict: 'A',
        scope:{
            modelProp    : "=modelProp",
            rowObject    : "=rowObject",
            columnHeader : "=columnHeader",
            rowId        : "=rowId"
        },
        link: function (scope, element, attrs) {
            var keyName;
            if(scope.rowObject[scope.columnHeader] !== undefined){
                keyName = scope.columnHeader;
            }else{
                //Its a relational header properties name... map the header.. replace `customer_name` to name
                var patt = /^[A-Z0-9a-z]*\_/;
                keyName = scope.columnHeader.replace(patt, '');
            }


            var processData = function(propConfig, rowObject, propertyName, rootTag, value){
                //Getting the root tag..
                rootTag = $(rootTag);
                //For tracking current assosiated tags..
                var currentTag = $(rootTag);

                //If table info not present..
                if(!propConfig){
                    return rootTag.val(value);
                }

                if(propConfig.onClick !== undefined){
                    //get the params values..
                    var params = {},
                        definedParams = propConfig.onClick.params;
                    if(definedParams !== undefined){
                        for (var key_ in definedParams) {
                            if (definedParams.hasOwnProperty(key_)) {
                                var value_ = definedParams[key_];
                                //Now create a params object..
                                params[key_] = rowObject[value_];
                            }
                        }
                    }//if

                    //Now exposing the state and params over scope
                    scope.propConfig = {};
                    scope.propConfig.onClick = {};
                    scope.propConfig.onClick.state = propConfig.onClick.state;
                    //Now adding params to the scope..
                    scope.propConfig.onClick[scope.rowId] = params;

                    //manage onclick here..
                    //Add the anchor tag
                    currentTag = $('<a></a>');
                    var attrValue = "propConfig.onClick.state(scope.propConfig.onClick[" + scope.rowId + "])";
                    currentTag.attr("ui-sref", attrValue);
                    //Now add rootTag to currentTag
                    rootTag.append(currentTag);
                }
                else if(propConfig.tag !== undefined){
                    var value = rowObject[propertyName];
                    //Then add tag to the properties..
                    //Now get the label type tag to be used by the value used..
                    var labelType = propConfig.tag[value];
                    currentTag = $('<span class="label" ></span>');
                    currentTag.addClass(labelType);
                    //Now add rootTag to currentTag
                    rootTag.append(currentTag);
                }
                else{
                    /*Do nothing*/
                }

                //Now add value to the current tag
                currentTag.val(value);
                return rootTag;
            }; //processOnClick


            /**
             * Find model property from the config file
             */
            var findModelPropertyConfig = function(configModelObj, propertyName){
                if(configModelObj === undefined){
                    return null;
                }
                if(configModelObj[propertyName] !== undefined){
                    return configModelObj[propertyName];
                }
                return null;
            };
            var parseColumn = function(modelProp, rowObject, key, element){
                var colValue = rowObject[key];
                //Now checking cheking the type of the value and returning the value according to it..
                var type = Object.prototype.toString.call(colValue);
                var propConfig;
                if(type === '[object String]'){
                    //Do the string processing..
                    propConfig = findModelPropertyConfig(modelProp.tables, key);
                    processData(propConfig, rowObject, key, element, colValue);
                }
                else if(type === '[object Number]'){
                    //Do the number processing..
                    propConfig = findModelPropertyConfig(modelProp.tables, key);
                    processData(propConfig, rowObject, key, element, colValue);
                }
                else if(type === '[object Array]'){
                    //Do the Array processing..
                    propConfig = findModelPropertyConfig(modelProp.tables, key);
                    processData(propConfig, rowObject, key, element, colValue);
                }
                else {
                    var list = $('<ul></ul>');
                    //The value is object..
                    //first loop and find the further elements..
                    for (var modelProperty in colValue) {
                        if (colValue.hasOwnProperty(modelProperty)) {
                            //Now find the properties..
                            var listItem = $('<li></li>'),
                            propertyValueElement = $('<span></span>');
                            propConfig = findModelPropertyConfig(modelProp.tables[colValue], modelProperty);
                            processData(propConfig, rowObject, modelProperty, propertyValueElement, colValue);
                            var propertyName = $('<span></span>');
                            propertyName.val(modelProperty);
                            //Now add this to list..
                            listItem.append( propertyName + ' : ' + propertyValueElement );
                            //Now add this to list
                            list.append(listItem);
                        }
                    }
                    //Now add this list to root element..
                    $(element).append(list);
                }
            }//parseColumn


            //Now call the function..
            parseColumn(scope.modelProp, scope.rowObject, keyName, element);

        }//End of Link function...
    }; // End of return
}])


.directive('snaphyLoadFilters', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function () {

            $timeout(function(){
                $(function () {
                    // Init page helpers (BS Datepicker + BS Colorpicker + Select2 + Masked Input + Tags Inputs plugins)
                    App.initHelpers(['datepicker',  'select2']);
                });
            }); //timeout method..
        }//End of Link function...
    }; // End of return
}]);