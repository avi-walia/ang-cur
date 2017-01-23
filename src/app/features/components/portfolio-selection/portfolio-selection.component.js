(function () {
    'use strict';

    angular
        .module('evolution.features.portfolioSelection')
        .component('portfolioSelection', {
            controller: portfolioSelectionCtrl,
            bindings: {},
            templateUrl: 'app/features/components/portfolio-selection/portfolio-selection.tpl.html'

        });

    portfolioSelectionCtrl.$inject = ['$scope'];

    /* @ngInject */
    function portfolioSelectionCtrl($scope) {
        var vm = this;
        this.functionName = functionName;
        console.log('portfolioSelection');
        ////////////////

        function functionName() {

        }
    }

})();

