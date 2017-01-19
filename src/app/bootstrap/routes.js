(function () {
    'use strict';

    angular.module('evolution.core.main')
        .config([
            '$stateProvider',
            '$urlMatcherFactoryProvider',
            '$urlRouterProvider',
            function ($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {
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
                        // if (!(deviceDetector.browser === 'ie' && deviceDetector.browser_version <= '9.0')  ) {
                            // @todo: check if back btn functionality apply
                            //$state.go('main.advisorLocator.portfolio');
                            $state.go('main.evolution.selectClientProfile');
                        // }
                           // $state.go('main.evolution.fee.profileSearch');
                            // $state.go('main.evolution.abstract.test4');
                        // }
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
                            'header': {},
                            'content': {},
                            'footer': {}
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
                    //You can create profile & open existing profile in this state
                    .state('main.evolution.selectClientProfile', {
                        url: '/select-client-profile',
                        views: {
                            'header@main': {
                                template: '<ci-header></ci-header>'
                            },
                            'content@main': {
                                // template: '<test></test>'
                                template: '<select-client-profile></select-client-profile>'
                            },
                            'footer@main': {
                                template: '<ci-footer reset="false" next-state="\'main.evolution.clientAccountInfo\'"></ci-footer>'
                            }
                        }
                    })
                    .state('main.evolution.clientAccountInfo', {
                        url: '/client-account-info',
                        views: {
                            'header@main': {
                                template: '<ci-header step-indicator="true"></ci-header>'
                            },
                            'content@main': {
                                // template: '<test></test>'
                                template: '<client-account-info></client-account-info>'
                            },
                            'footer@main': {
                                template: '<ci-footer save="true" reset="true" create-template="false" next-state="\'main.evolution.ipq\'" previous-state="\'main.evolution.selectClientProfile\'"></ci-footer>'
                            }
                        }
                    })
                    .state('main.evolution.ipq', {
                        url: '/ipq',
                        views: {
                            'header@main': {
                                template: '<ci-header step-indicator="true"></ci-header>'
                            },
                            'content@main': {
                                // template: '<test></test>'
                                template: '<ipq></ipq>'
                            },
                            'footer@main': {
                                template: '<ci-footer save="true" reset="true" create-template="true" next-state="\'main.evolution.portfolioSelection\'" previous-state="\'main.evolution.clientAccountInfo\'"></ci-footer>'
                            }
                        }
                    })
                    .state('main.evolution.portfolioSelection', {
                        url: '/portfolio-selection',
                        views: {
                            'header@main': {
                                template: '<ci-header step-indicator="true"></ci-header>'
                            },
                            'content@main': {
                                // template: '<test></test>'
                                template: '<portfolio-selection></portfolio-selection>'
                            },
                            'footer@main': {
                                template: '<ci-footer save="true" split="true" create-template="true" next-state="\'main.evolution.fundCustomization\'" previous-state="\'main.evolution.ipq\'"></ci-footer>'
                            }
                        }
                    })
                    .state('main.evolution.fundCustomization', {
                        url: '/fund-customization',
                        views: {
                            'header@main': {
                                template: '<ci-header step-indicator="true"></ci-header>'
                            },
                            'content@main': {
                                // template: '<test></test>'
                                template: '<fund-customization></fund-customization>'
                            },
                            'footer@main': {
                                template: '<ci-footer create-template="true" save="true" reset="true" next-state="\'main.evolution.advisorInfo\'" previous-state="\'main.evolution.portfolioSelection\'"></ci-footer>'
                            }
                        }
                    })
                    .state('main.evolution.advisorInfo', {
                        url: '/advisor-info',
                        views: {
                            'header@main': {
                                template: '<ci-header step-indicator="true"></ci-header>'
                            },
                            'content@main': {
                                // template: '<test></test>'
                                template: '<advisor-info></advisor-info>'
                            },
                            'footer@main': {
                                template: '<ci-footer create-template="true" save="true" reset="true" next-state="\'main.evolution.profileSummary\'" previous-state="\'main.evolution.fundCustomization\'"></ci-footer>'
                            }
                        }
                    })
                    .state('main.evolution.profileSummary', {
                        url: '/profile-summary',
                        views: {
                            'header@main': {
                                template: '<ci-header step-indicator="true"></ci-header>'
                            },
                            'content@main': {
                                // template: '<test></test>'
                                template: '<profile-summary></profile-summary>'
                            },
                            'footer@main': {
                                template: '<ci-footer next-state="\'main.evolution.reports\'" previous-state="\'main.evolution.advisorInfo\'"></ci-footer>'
                            }
                        }
                    })
                    .state('main.evolution.reports', {
                        url: '/reports',
                        views: {
                            'header@main': {
                                template: '<ci-header step-indicator="true"></ci-header>'
                            },
                            'content@main': {
                                // template: '<test></test>'
                                template: '<reports></reports>'
                            },
                            'footer@main': {
                                template: '<ci-footer save="true" submit="true" preview="true" previous-state="\'main.evolution.profileSummary\'"></ci-footer>'
                            }
                        }
                    })
                    .state('main.evolution.split', {
                        url: '/split-profile',
                        views: {
                            'header@main': {
                                template: '<ci-header step-indicator="true"></ci-header>'
                            },
                            'content@main': {
                                // template: '<test></test>'
                                template: '<split-profile></split-profile>'
                            }
                            // 'footer@main': {
                            //     template: '<ci-footer ></ci-footer>'
                            // }
                        }
                    })

                    .state('main.evolution.help', {
                        url: '/help',
                        views: {
                            'header@main': {
                                template: '<ci-header step-indicator="false"></ci-header>'
                            },
                            'content@main': {
                                // template: '<test></test>'
                                template: '<help></help>'
                            }
                            // 'footer@main': {
                            //     template: '<ci-footer ></ci-footer>'
                            // }
                        }
                    })

                    /****** FEE PROPOSAL ROUTES STARTS HERE **/
                    .state('main.evolution.fee.profileSearch', {
                        url: '/fee/profile-search',
                        views: {
                            'header@main': {
                                template: '<ci-header></ci-header>'
                            },
                            'content@main': {

                                template: '<profile-search display-toolbar="false"></profile-search>'
                            },
                            'footer@main': {
                                template: '<ci-footer next-state="\'main.evolution.fee.contactInfo\'" ></ci-footer>'
                            }
                        }
                    })
                    .state('main.evolution.fee.contactInfo', {
                        url: '/fee/contact-info',
                        views: {
                            'header@main': {
                                template: '<ci-header></ci-header>'
                            },
                            'content@main': {

                                template: '<contact-info></contact-info>'
                            },
                            'footer@main': {
                                template: '<ci-footer next-state="\'main.evolution.fee.investmentOverview\'" previous-state="\'main.evolution.fee.profileSearch\'"></ci-footer>'
                            }
                        }
                    })
                    .state('main.evolution.fee.investmentOverview', {
                        url: '/fee/investment-overview',
                        views: {
                            'header@main': {
                                template: '<ci-header></ci-header>'
                            },
                            'content@main': {

                                template: '<investment-overview></investment-overview>'
                            },
                            'footer@main': {
                                template: '<ci-footer next-state="\'main.evolution.fee.serviceFees\'" previous-state="\'main.evolution.fee.contactInfo\'"></ci-footer>'
                            }
                        }
                    })
                    .state('main.evolution.fee.serviceFees', {
                        url: '/fee/service-fees',
                        views: {
                            'header@main': {
                                template: '<ci-header></ci-header>'
                            },
                            'content@main': {

                                template: '<service-fees></service-fees>'
                            },
                            'footer@main': {
                                template: '<ci-footer next-state="\'main.evolution.fee.summary\'" previous-state="\'main.evolution.fee.investmentOverview\'"></ci-footer>'
                            }
                        }
                    })
                    .state('main.evolution.fee.summary', {
                        url: '/fee/summary',
                        views: {
                            'header@main': {
                                template: '<ci-header></ci-header>'
                            },
                            'content@main': {

                                template: '<fee-summary></fee-summary>'
                            },
                            'footer@main': {
                                template: '<ci-footer next-state="\'main.evolution.fee.reports\'" previous-state="\'main.evolution.fee.serviceFees\'"></ci-footer>'
                            }
                        }
                    })
                    .state('main.evolution.fee.reports', {
                        url: '/fee/reports',
                        views: {
                            'header@main': {
                                template: '<ci-header></ci-header>'
                            },
                            'content@main': {

                                template: '<fee-reports></fee-reports>'
                            },
                            'footer@main': {
                                template: '<ci-footer submit="true" previous-state="\'main.evolution.fee.summary\'"></ci-footer>'
                            }
                        }
                    })
                    /*** END OF FEE PROPOSAL ROUTES ***/


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