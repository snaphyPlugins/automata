'use strict';
/*global $snaphy, angular*/
angular.module($snaphy.getModuleName())

//Controller for automataControl ..
.controller('automataControl', ['$scope', '$stateParams', 'Database',
    function($scope, $stateParams, Database) {
        //Checking if default templating feature is enabled..
        var defaultTemplate = $snaphy.loadSettings('automata', "defaultTemplate");
        $snaphy.setDefaultTemplate(defaultTemplate);




        $scope.checkType = function(rowObject, columnHeader){
            var key = $scope.getKey(rowObject, columnHeader);
            var colValue = rowObject[key];
            var type = Object.prototype.toString.call(colValue);
            return type;
        };


        $scope.getKey = function(rowObject, columnHeader){
            var keyName;
            if(rowObject[columnHeader] !== undefined){
                keyName = columnHeader;
            }else{
                //Its a relational header properties name... map the header.. replace `customer_name` to name
                var patt = /\_[A-Z0-9a-z]+$/;
                keyName = columnHeader.replace(patt, '');
            }
            return keyName;
        };


        /**
         * INITIALIZING SOME DUMMY DATA..
         */

        $scope.tableTitle = "Testing";
        $scope.currentState = "automata";
        $scope.title = "Automata Plugin";
        $scope.description = "Automata Plugin for auto generating CRUD methods.";

        //Its a model properties for customer..
        $scope.customerModelSettings = {
            "header":['name', 'email', 'access_level', 'phoneNumber'],
            "properties":{
                "name":{
                    type:"string",
                    required: true
                },
                "email":{
                    type:"string",
                    required: true
                },
                "access":{
                    "level":{
                        type:"object",
                        required: true
                    }
                }
            },
            "tables":{
                name:{
                    onClick:{
                        state:"dashboard",
                        params:{
                            name:"name"
                        }
                    }
                }

            }
        };


        $scope.rowListValues = [
            {
                name:"Robins Gupta",
                email:"robinskumar73@gmail.com",
                access:{
                    level:{
                        type:1,
                        height:1
                    }
                },
                "phoneNumber": 9953242338
            },
            {
                name:"Ravi Gupta",
                email:"ravikumar73@gmail.com",
                access:{
                    level:{
                        type:2,
                        height:0
                    }
                },
                "phoneNumber": 9953242338
            },
        ];



    }//controller function..
]);