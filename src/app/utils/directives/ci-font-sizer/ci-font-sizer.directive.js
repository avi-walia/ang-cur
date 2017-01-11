(function () {
    'use strict';

    angular
        .module('evolution.utils')
        .directive('ciFontSizer', ciFontSizer);

    var fontSizeCacheKey = 'advLocatorFontSize',
        bodyElement = angular.element(document).find('body').eq(0),
        fontSizeID;

    function setActive(activeElement, size, targetedElement) {
        // remove all active classes
        activeElement.find('li').removeClass('active');

        // set clickedElement to active
        angular.element(activeElement[0].querySelector('#' + size)).parent().addClass('active');

        // set body to clicked state
        targetedElement.removeClass('font-size-normal font-size-large font-size-largest');
        targetedElement.addClass(size);
    }

    /* @ngInject */
    function ciFontSizer() {
        return {
            restrict: 'E',
            scope: {},
            bindToController: {},
            replace: true,
            controllerAs: 'ctrl',
            controller: CiFontSizerController,
            templateUrl: 'app/utils/directives/ci-font-sizer/ci-font-sizer.tpl.html'
        };
    }

    CiFontSizerController.$inject = ['$element', 'dataCacheLocalStorage'];

    /* @ngInject */
    function CiFontSizerController($element, dataCacheLocalStorage) {

        activate();

        function activate() {
            // is it already cached ? Then, use it.
            fontSizeID = dataCacheLocalStorage.get(fontSizeCacheKey);

            // default
            if (_.isEmpty(fontSizeID) || !_.isString(fontSizeID)) {
                updateCacheAndActive('font-size-normal');
            } else {
                // it is already cached! Then, use it.
                setActive($element, fontSizeID, bodyElement);
            }

            $element.on('click', function (e) {
                var clickedElementId = e.target.id;
                //clickedElementId will not have a value if the user clicks on the whitespace between font size selectors. First condition of if statement protects against this.
                //Second condition of if statement is merely for efficiency. The user clicked the same font size selector, therefore we don't need to change anything.
                if (clickedElementId && (fontSizeID !== clickedElementId)) {
                    fontSizeID = clickedElementId;
                    updateCacheAndActive(clickedElementId);
                }
            });
        }
        //store font-size value in local storage and update the selected element.
        function updateCacheAndActive(size){
            dataCacheLocalStorage.put(fontSizeCacheKey, size);
            setActive($element, size, bodyElement);
        }

    }

})();
