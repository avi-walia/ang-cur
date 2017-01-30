
(function () {
    'use strict';

    angular
        .module('evolution.utils')
        .component('modalComponent', {
            controller: modalCtrl,
            bindings: {
                resolve: '<',
                close: '&',
                dismiss: '&'
            },
        templateUrl:'app/utils/components/modal/modal.tpl.html'
        });


    /* @ngInject */
//    modalCtrl.$inject = ['$uibModalInstance'];
  
    /* @ngInject */
    function modalCtrl() {
        var vm = this;
        vm.ok = ok;
        vm.cancel = cancel;
        vm.msg = '';
          
        vm.$onInit = function () {

            vm.msg = vm.resolve.dynamicMsg;
            vm.title = vm.resolve.title;

        };

        function ok() {
           vm.close();
            
        }

        function cancel() {
            vm.dismiss();
        }
        
    }

})();





