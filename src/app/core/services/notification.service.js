(function () {
    'use strict';

    function stripDots(state) {
        return state.replace(/\./g,'');
    }

    angular
        .module('evolution.core.main')
        .service('notificationService', notificationService);

    notificationService.$inject = [
        'parseService',
        '$sce'
    ];

    /* @ngInject */
    function notificationService(
        parseService,
        $sce
    ) {
        var service = this;
        service.addMessage = addMessage;
        service.messages = {};
        service.messageKey = '';//stripDots($state.current.name);
        service.updateMessageKey = updateMessageKey;
        service.dismissMessage = dismissMessage;

        function updateMessageKey(msgKey) {
            service.messageKey = parseService.stripDots(msgKey);
            //console.log('service.messageKey: ', service.messageKey);
        }


        /*
        msg is of the form:
        {
            msg: string
            type: 0|1|2
        }
        type = 0 = informational
        type = 1 = validation error/warning
        type = 2 = server error
         */
        function addMessage(msg) {
            if (!_.isArray(service.messages[service.messageKey])) {
                service.messages[service.messageKey] = [];
            }
            service.messages[service.messageKey].push({text: $sce.trustAsHtml(msg.msg), type: msg.type});

            //console.log('service.messages: ', service.messages);
        }

        function dismissMessage(index) {
            service.messages[service.messageKey].splice(index, 1);
        }
    }

})();