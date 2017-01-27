(function () {
    'use strict';

    var cssDesktopClass = 'full',
        cssMobileClass = 'mobile';

    angular
        .module('evolution.utils')
        .service('detectMobile', detectMobile);

    detectMobile.$inject = ['screenSize'];

    /* @ngInject */
    function detectMobile(screenSize) {
        var service = this;

        service.cssClass = '';
        service.isDesktop = false;
        service.isMobile = false;

        init();
        /**
         * Set variables isDesktop and isMobile depend on the size of the screen (sm - less 767px) - Match media module
         */
        function init() {

            // detect viewport
            service.isDesktop = screenSize.is('sm, md, lg');
            service.isMobile = screenSize.is('xs');


            // add css class
            if (!service.isMobile) {
                updateCSSClass(cssDesktopClass);
            } else {
                updateCSSClass(cssMobileClass);
            }

            // register viewport resize events
            service.isDesktop = screenSize.on('sm, md, lg', function (match) {
                service.isDesktop = match;
                if (service.isDesktop) {
                    updateCSSClass(cssDesktopClass);
                }
            });
            service.isMobile = screenSize.on('xs', function (match) {
                service.isMobile = match;
                if (service.isMobile) {
                    updateCSSClass(cssMobileClass);
                }
            });

        }

        function updateCSSClass(aClass) {
            service.cssClass = aClass;
        }
    }

})();

