
(function () {
    'use strict';

    angular
        .module('evolution.core.main')
        .component('ciNotifications', {
            controller: notificationCtrl,
            templateUrl:'app/core/components/notifications/notifications.tpl.html'
        });


    /* @ngInject */

    notificationCtrl.$inject = ['notificationService'];
    /* @ngInject */
    function notificationCtrl(
        notificationService
    ) {
        var vm = this;
        vm.notificationService = notificationService;
        console.log('hello world123');

    }

})();
