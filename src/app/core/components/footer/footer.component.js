/**
 * Note: You cannot submit if user is any of these roles:
 UNLICENSED ASSISTANT, CORPORATE or INSURANCE ONLY .
 Submit btn is also disabled IF
 the user makes only non-financial changes to an Active and Submitted profile, the profile does not have to be re-submitted to the back office: the Submit button from Screen 7 (Reports) is disabled.
 Submit btn is also disabled if status = submitted and have had no changes at all.
 */

(function () {
    'use strict';

    angular
        .module('evolution.core.main')
        .component('ciFooter', {
            controller: footerCtrl,
            templateUrl:'app/core/components/footer/footer.tpl.html'
        });


    /* @ngInject */

    footerCtrl.$inject = ['$state', 'pageConfigService'];
    /* @ngInject */
    function footerCtrl($state, pageConfigService) {
        var vm = this;
        vm.nextLabel = '';
        // vm.test = "TEst";
        // vm.next = next;
        vm.pageConfig = pageConfigService.pageConfig;
        // console.log(vm.nextState);
        // console.log($state);
        if ($state.current.name === 'main.evolution.selectClientProfile'){
            vm.nextLabel = 'Open Profile';
        }else{
            vm.nextLabel = 'Next';
        }

        //only display Create Template button if we are in : IPQ, Portfolio Selection, Fund Cust, Advisor Info
        // vm.displayCreateTemplate =
        // var createTemplate = ['ipq', ]


    }

})();