(function () {
    'use strict';

    angular
        .module('evolution.utils')
        .component('postForBlob', {
            controller: postForBlobCtrl,
            bindings: {
				'fileName': '<?',
				'linkText': '<?',
				'postUrl' : '<',
				'imgUrl' : '<?',
				'payload': '<?',
				'errorHandler': '@'
			},
            templateUrl: 'app/utils/components/postForBlob/post-for-blob.tpl.html'

        });

    postForBlobCtrl.$inject = ['server', '$window'];

    /* @ngInject */
    function postForBlobCtrl(server, $window) {
        var vm = this;
		vm.openBlob = openBlob;
		vm.isLoaded = false;
        if (!vm.fileName) {
			vm.fileName = '';
		}
		vm.dataURL = '';
		
		//Technically this is used to update the component when the bindings change, however, these bindings should only change once(when they are first assigned).
		//This is used to determine when the bindings are finally resolved, because bindings start as undefined.
		vm.$onChanges = function(obj) {
			//initiallize optional bindings
			if (!vm.payload) {
				vm.payload = {};
			}
			if (!vm.linkText) {
				vm.linkText = '';
			}
			if (!vm.imgURL){
				vm.imgURL = '';
			}
			//make a post request for the blob(can be any type of file, but for Evolution it's only PDFs)
			if (obj.hasOwnProperty('postUrl')) {
				console.log('vm.postURL: ', vm.postUrl);
				server.postNoStorage(vm.postUrl, true, vm.payload).then(
					function(fileBlob) {
						//convert blob to a url and show the button/link to access it.
						console.log('data: ', fileBlob.data);
						vm.dataURL = URL.createObjectURL(fileBlob.data);
						vm.isLoaded = true;
						console.log('isLoaded: ', vm.isLoaded);
					},
					function(error ){
						//encountered an error retrieving pdf, handle it.
						console.log('loading error: ', error);
					}
				);
			}
		};
		
		function openBlob() {
			console.log(vm.dataURL);
			$window.open(vm.dataURL);
			
			/* below is used to demo this directive with a built in pdf blob(created from a base64 encoded pdf)
			vm.dataURL = URL.createObjectURL(b64toBlob(base64Pdf, 'application/pdf'));
			window.open(vm.dataURL);
			*/
		}
		
		


    }

})();
