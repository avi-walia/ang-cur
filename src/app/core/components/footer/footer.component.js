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
            bindings: {
                nextState: '=?',
                previousState: '=?',
                submit: '<?',
                split: '<?',
                reset: '<?',
                createTemplate: '<?', //aka Clone!!!
                save: '<?',
                preview: '<?' //used in Reports screen only!
            },
            templateUrl:'app/core/components/footer/footer.tpl.html'
        });


    /* @ngInject */

    footerCtrl.$inject = ['$state', 'pageStateResolver'];
    /* @ngInject */
    function footerCtrl($state, pageStateResolver) {
        var vm = this;
        vm.nextLabel = '';
        vm.pageStateResolver = pageStateResolver;
        // console.log(vm.nextState);
        // console.log($state);
        if ($state.current.name === 'main.evolution.selectClientProfile'){
            vm.nextLabel = 'Open Profile';
        }else{
            vm.nextLabel = 'Next';
        }
    }

})();