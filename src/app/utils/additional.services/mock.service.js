


(function () {
    'use strict';

    angular
        .module('evolution.utils')
        .service('mockService', mockService);

    mockService.$inject = ['$httpBackend', 'FUND_LIST_BY_CLASS', 'ASSET_CLASS_MIX', 'ADVISOR', 'PROFILE_GROUPS', 'TESTS'];

    /* @ngInject */
    function mockService($httpBackend, FUND_LIST_BY_CLASS, ASSET_CLASS_MIX, ADVISOR, PROFILE_GROUPS, TESTS) {
        var service = this;
        service.init = init;
        service.data = {};

        function init() {
            $httpBackend.whenGET(/(app|styles|scripts|assets|fonts).*/).passThrough();

            //Note will need to setup a version of this for each webservice call
            $httpBackend.whenGET(/evolutionws\/.*/).respond(function (method, url, data, headers) {
                var mockData = {};
                //data = angular.fromJson(data); //only used for post params. Not sure about query params.
                //var message = angular.fromJson(data);
                var urlParams = url.split('/');
                urlParams.shift();//get rid of the first element in the array as it is just the web service endpoint
                var id = urlParams[1];
                //urlParams[0] holds the name of the webservice we are trying to call
                //urlParams[>= 1] holds route params passed to our service
                if (urlParams[0] === 'tests') {
                    mockData = TESTS[id];
                } else if(urlParams[0] === 'getProfileGroups') {
                    mockData = PROFILE_GROUPS[id];
                } else if(urlParams[0] === 'getFundListByClass') {
                    mockData = FUND_LIST_BY_CLASS[id];
                } else if(urlParams[0] === 'getAdvisor') {
                    mockData = ADVISOR;
                } else if(urlParams[0] === 'getAssetClassMix') {
                    mockData = ASSET_CLASS_MIX[id];
                }

                //var mockData = mockBackend[urlParams[0]][urlParams[1]];

                return [200, mockData, {/*headers*/}];
            });

            //used to generate mock data
            service.data = repeater(50, assetClassMixTemplate);
        }










        var names = [
            "Sophia",
            "Emma",
            "Olivia",
            "Isabella",
            "Ava",
            "Lily",
            "Zoe",
            "Chloe",
            "Mia",
            "Madison",
            "Emily",
            "Ella",
            "Madelyn",
            "Abigail",
            "Aubrey",
            "Addison",
            "Avery",
            "Layla",
            "Hailey",
            "Amelia",
            "Hannah",
            "Charlotte",
            "Kaitlyn",
            "Harper",
            "Kaylee",
            "Sophie",
            "Mackenzie",
            "Peyton",
            "Riley",
            "Grace",
            "Brooklyn",
            "Sarah",
            "Aaliyah",
            "Anna",
            "Arianna",
            "Ellie",
            "Natalie",
            "Isabelle",
            "Lillian",
            "Evelyn",
            "Elizabeth",
            "Lyla",
            "Lucy",
            "Claire",
            "Makayla",
            "Kylie",
            "Audrey",
            "Maya",
            "Leah",
            "Gabriella",
            "Aiden",
            "Jackson",
            "Ethan",
            "Liam",
            "Mason",
            "Noah",
            "Lucas",
            "Jacob",
            "Jayden",
            "Jack",
            "Logan",
            "Ryan",
            "Caleb",
            "Benjamin",
            "William",
            "Michael",
            "Alexander",
            "Elijah",
            "Matthew",
            "Dylan",
            "James",
            "Owen",
            "Connor",
            "Brayden",
            "Carter",
            "Landon",
            "Joshua",
            "Luke",
            "Daniel",
            "Gabriel",
            "Nicholas",
            "Nathan",
            "Oliver",
            "Henry",
            "Andrew",
            "Gavin",
            "Cameron",
            "Eli",
            "Max",
            "Isaac",
            "Evan",
            "Samuel",
            "Grayson",
            "Tyler",
            "Zachary",
            "Wyatt",
            "Joseph",
            "Charlie",
            "Hunter",
            "David"
        ];
        function randomName() {

            return names[Math.floor(Math.random() * names.length)];
        }

        function randomDate() {
            var rndDate = new Date(5);
            var rndMonth = Math.floor(Math.random() * 12);
            var rndYear = Math.floor(Math.random() * 25) + 1990;
            var rndDay = Math.floor(Math.random() * 28);//to handle february
            rndDate.setDate(rndDay);
            rndDate.setYear(rndYear);
            rndDate.setMonth(rndMonth);
            return rndDate.toUTCString();
        }

        var profileGroupTemplate =  {
            "id": 1,
            "profileSummary": {
                "id": 1,
                "profileName": "",
                "clientName": "",
                "modificationDate": "date",
                "logs": false,
                "pdf": false,
                "status": "",
                "fundsReceived": true,
                "cafReceived": true,
                "createdBy": "",
                "creationDate": "date"
            }
        };

        var fundListTemplate =  {
            "id": 1,
            "fundNameFR": "",
            "fundNameEN": "",
            "portMgmtEN": "",
            "portMgmtFR": "",
            "currencyEN": "",
            "currencyFR": "",
            "assetClassEN": "",
            "assetClassFR": "",
            "platformEN": "",
            "platformFR": ""
        };

        var assetClassMixTemplate = {
            "id": 1,
            "profileName": "",
            "assetClassMix": [
                {
                    "assetClassNameEN": "",
                    "assetClassNameFR": "",
                    "percentage": 1.12
                }
            ],
            "assetFundMix": [
                {
                    "assetFundNameEN": "",
                    "assetFundNameFR": "",
                    "percentage": 1.10
                }
            ]
        }



        function dataMocker(obj, max, index) {
            _.forEach(obj, function(val, key) {
                if (_.isArray(val)) {
                    //dataMocker(obj[key], max, index);
                    obj[key] = repeater(7, angular.copy(val[0]));
                } else if (typeof val === 'object') {
                   dataMocker(obj[key], max, index);
                } else if (typeof key === "string" && !Number.isInteger(key)) {
                    var local = key.substring(key.length - 2, key.length);
                    var root = key.substring(0, key.length - 2);
                    if (local === "EN") {
                        if (obj[root + "FR"] !== "") {
                            obj[key] = obj[root + "FR"].substring(3, obj[root + "FR"].length);
                        } else {
                            obj[key] = randomName();
                        }
                    } else if (local === "FR") {
                        if (obj[root + "EN"] !== "") {
                            obj[key] = "FR " + obj[root + "EN"];
                        } else {
                            obj[key] = "FR " + randomName();
                        }
                    } else {
                        if (val === "date") {
                            obj[key] = randomDate();
                        } else if (typeof val === "number") {
                            if (Number.isInteger(val)) {
                                if (key === 'id') {
                                    obj[key] = index;
                                }else {
                                    obj[key] = Math.floor(Math.random() * max) + 1;
                                }
                            } else {
                                obj[key] = Math.floor(Math.random() * 101) / 100;
                            }
                        } else if (typeof val === "boolean") {
                            obj[key] = Math.random() > 0.5;

                        } else {
                            obj[key] = randomName();
                        }
                    }
               } else {
                   if (val === "date") {
                       obj[key] = randomDate();
                   } else if (typeof val === "number") {
                       if (Number.isInteger(val)) {
                           if (key === 'id') {
                               obj[key] = index;
                           }else {
                               obj[key] = Math.floor(Math.random() * max) + 1;
                           }
                       } else {
                           obj[key] = Math.floor(Math.random() * 101) / 100;
                       }
                   } else if (typeof val === "boolean") {
                       obj[key] = Math.random() > 0.5;

                   } else {
                       obj[key] = randomName();
                   }
               }
            });
            return obj;
        }

        service.repeater = repeater;

        function repeater(num, obj) {
            var ret = [];
            for(var i = 0; i < num; i++) {
                ret.push(dataMocker(angular.copy(obj), num, i));

            }
            return ret;
        }

    }
})();



/*
 {
 "PROFILE_GROUPS" : [
 {
 "id": 1,
 "profileSummary": {
 "id": 1,
 "profileName": "",
 "clientName": "",
 "modificationDate": "date",
 "logs": false,
 "pdf": false,
 "status": "",
 "fundsReceived": true,
 "cafReceived": true,
 "createdBy": "",
 "creationDate": "date"
 }
 }
 ]
 }


 {
 "FUND_LIST_BY_CLASS": [
 {
 "fundNameFR": "",
 "fundNameEN": "",
 "portMgmtEN": "",
 "portMgmtFR": "",
 "currencyEN": "",
 "currencyFR": "",
 "assetClassEN": "",
 "assetClassFR": "",
 "platformEN": "",
 "platformFR": ""
 }
 ]
 }


 {
 "ASSET_CLASS_MIX": [
 {
 "id": 1,
 "profileName": "",
 "assetClassMix": [
 {
 "assetClassNameEN": "",
 "assetClassNameFR": "",
 "percentage": 1.12
 }
 ],
 "assetFundMix": [
 {
 "assetFundNameEN": "",
 "assetFundNameFR": "",
 "percentage": 1.10
 }
 ]
 }
 ]
 }


 {
 "ADVISOR": {
 "dealerNameEN": [],
 "dealerNameFR": [],
 "fullName": "",
 "street": "",
 "province": 1,
 "email": "",
 "phone": "",
 "fax": "",
 "city": "",
 "postalCode": "",
 "chosenDealerName": 1
 }
 }
 */