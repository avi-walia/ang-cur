(function () {
    'use strict';
    angular.module('evolution').config(frenchTranslations);
    frenchTranslations.$inject = ['$translateProvider'];
    function frenchTranslations($translateProvider) {
        $translateProvider.translations('fr', {
            TITLE: '<h1>FR test title</h1>',
            searchPlaceHolder: 'FR Please enter words atleast 2 characters',
            appTitle: "FR Evolution",
            pages: {
                strangeTableTest: {
                    title: "FR strangeTableTest"
                },
                test: {
                    title: "FR test test"
                },
                test4: {
                    title: "FR test4"
                }
            },
            navbar: {
                en: 'EN',
                fr: 'FR'
            },
            testNotification: "<h1>FR TEST MSG</h1>",
            testNotification2: "FR 2nd test msg",
            errors: {
                noData: "No Data Error Msg"
            },
            strangeTable: {
                profileName: 'FR Profile Name',
                clientName: 'FR Client Name',
                modificationDate: 'FR Modification Date',
                logs: 'FR Logs',
                pdf: 'FR PDF',
                status: 'FR Status',
                fundsReceived: 'FR Funds Received',
                cafReceived: 'FR CAF Received',
                createdBy: 'FR Created By',
                creationDate: 'FR Creation Date'
            }
        });
    }
})();