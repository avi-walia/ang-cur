(function () {
    'use strict';

    angular.module('evolution.core.main')
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            '$urlMatcherFactoryProvider',
            function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
                function valToString(val) {
                    return val !== null ? decodeURIComponent(val).toString() : val;
                }

                $urlMatcherFactoryProvider.type('doURIdecode', {
                    encode: valToString,
                    decode: valToString,
                    is: function () {
                        return true;
                    }
                });

                /**
                 * There seems to be a problem with otherwise('/url') it keeps looping.
                 * Instead redirect to a state $urlRouterProvider.otherwise('/aio/portfolio');
                 */

                $urlRouterProvider.otherwise(function ($injector) {
                    $injector.invoke(['$state', 'deviceDetector', function ($state, deviceDetector) {
                       
                        // //if we are not in IE 9 then lets try to go to portfolio.
                        if (!(deviceDetector.browser === 'ie' && deviceDetector.browser_version <= '9.0')  ) {
                            // @todo: check if back btn functionality apply
                            //$state.go('main.advisorLocator.portfolio');
                            $state.go('main.evolution.test');
                        }
                    }]);

                });



                $stateProvider
                    .state('main', {
                        url: '/{locale:(?:en|fr)}',
                        abstract: true,
                        controller: 'MainCtrl as Main',
                        templateUrl: 'app/core/layout/main.layout.html'
                    })
                    .state('main.evolution', {
                        url: '/evolution',
                        abstract: true,
                        views: {
                            'content': {}
                        }
                    })

                    /************Search by Name ****************/
             /*       .state('main.advisorLocator.searchByName', {
                        abstract: true,
                        url: '/searchByName',
                        views: {
                            // use absolute naming [view-name @ state where the view is defined]
                            'content@main': {
                                controller: 'SearchByNameCtrl as SearchByName',
                                templateUrl: 'app/features/containers/searchByName/searchByName.layout.tpl.html'

                            }
                        }
                    })*/
                    .state('main.evolution.test', {
                        url: '/test',
                        reloadOnSearch: false,
                        views: {
                            'content@main': {
                                template: '<test></test>'
                            }
                        }
                    })
                    .state('main.evolution.abstract', {
                        url: '/abstract',
                        abstract: true,
                        views: {
                            "content@main": {
                                controller: 'test3Ctrl as Test',
                                //templateUrl: 'app/core/layout/main.layout.html'
                                templateUrl: 'app/features/components/test3/test3.tpl.html'
                            }
                        }
                    })
                    .state('main.evolution.abstract.test4', {
                        url: '/test4',
                        abstract: false,
                        views: {
                            'content2@main.evolution.abstract': {
                                template: '<test4></test4>'
                            }
                        }
                    })


                   ;


            }
        ]);
})();