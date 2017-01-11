var envConfigServiceMockConstructor =  function() {
    var ret = {
        BASE_URL: '',
        CONTEXT_ROOT: '',
        ENDPOINT_URI: '',
        GOOGLE_MAPS_URL: '',
        ASSANTE_URL: '',
        init: function () {
        },
        promise: {
            'then': function() {
                return {
                    "BASE_URL": "http://localhost:3000",
                    "CONTEXT_ROOT": "/advisorLocator",
                    "ENDPOINT_URI": "/locatorws",
                    "GOOGLE_MAPS_URL": "https://maps.googleapis.com/maps/api/js?key=AIzaSyD6y9w2sHNaVOAQN3ESPmYe_tSxCBE6d-Q&libraries=geometry,places&region=CA&language=",
                    "ASSANTE_URL": "https://assantedev.corporate.ciglobe.net",
                    "PROFILE_PICTURE_BASE_PATH": "/advisors-profile-pictures/"
                };
            }
        }
    };
    return ret;
}
