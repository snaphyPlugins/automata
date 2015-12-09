'use strict';
/*global $snaphy, angular*/
angular.module($snaphy.getModuleName())

//Controller for automataControl ..
.controller('automataControl', ['$scope', '$stateParams', 'Database',
    function($scope, $stateParams, Database) {
        //Checking if default templating feature is enabled..
        var defaultTemplate = $snaphy.loadSettings('automata', "defaultTemplate");
        $snaphy.setDefaultTemplate(defaultTemplate);


        /**
         * INITIALIZING SOME DUMMY DATA..
         */

        $scope.tableTitle = "Testing";
        $scope.currentState = "automata";
        $scope.title = "Automata Plugin";
        $scope.description = "Automata Plugin for auto generating CRUD methods.";


        $scope.tableValueSettings = {
            "header":['name', 'email', 'access_level'],
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
                }
            },
            {
                name:"Ravi Gupta",
                email:"ravikumar73@gmail.com",
                access:{
                    level:{
                        type:2,
                        height:0
                    }
                }
            }
        ];



    }//controller function..
]);