
(function () {
    'use strict';

    angular
        .module('evolution.features.searchByName')
        .service('advisorService', advisorService);

    advisorService.$inject = [
        'removeDiacriticsService',
        'server',
        'ELEMENTS_PER_PAGE',
        '$q',
        'BASE_URL',
        'ENDPOINT_URI'
    ];

    function advisorService(removeDiacriticsService, server, ELEMENTS_PER_PAGE, $q, BASE_URL, ENDPOINT_URI) {
        var service = this;
        service.imageNotFound = imageNotFound;
        //This array stores results that contain some but not all the search terms. This is displayed IF AND ONLY IF there are no results that contain all search terms.
        var secondaryResults = [];

        var advisorAPI = '';
        //path to mobile templates.
        service.mobileTemplatePath = '';
        //path to desktop templates.
        service.desktopTemplatePath = '';


        advisorAPI = BASE_URL + ENDPOINT_URI + '/advisors';
        var path = BASE_URL + '/app/features/components/advisorList/templates';
        service.mobileTemplatePath = path + '/mobile.tpl.html';
        service.desktopTemplatePath = path + '/desktop.tpl.html';


        /*
            Array of advisors that match search criteria.
         */
        service.searchResults = [];

        //Subset of service.searchResults that passes filters.
        service.filteredSearchResults = [];
        /*
            path to mobile/desktop templates used when rendering infinite scroll/pagination component.
            Not currently being used.
         */



        //This is the flag that determines if we are sorting in ascending or descending order. This is automatically changed to true on search
        //var sortAscending = true;

        //This is the last sort order chosen by the user. This is automatically changed to 'lastname' on search
        //var lastSort = '';

        //Stores the contents of the search input
        service.searchTerm = '';

        //Used in infinite scroll/pagination component to determine what property of this service contains the array of data to be rendered.
        service.objectName = 'filteredSearchResults'; //this string should be the same as the property holding your whole array of data.

        //Flag that indicates if the service is still loading. Either init function hasn't been called yet, or it has not finished yet.
        service.isLoading = true;

        //Flag used to trigger "search term too short" validation error message.
        service.searchTermTooShort = true;

        //Used by infinite scroll/pagination component to determine how many advisors to display per page.
        service.numPerPage = ELEMENTS_PER_PAGE;

        //Used by infinite scroll/pagination component to determine how many advisors to display on scroll.
        service.mobileMaxNumDisplay = ELEMENTS_PER_PAGE;

        //Used to keep track of the current page.
        service.currentPage = 1;
        //Used to keep track of the maximum number of pages.
        service.maxPages = 0;

        //Function used by infinite scroll/pagination component to display more results on scroll.
        service.loadMore = loadMore;

        //Function used to retrieve all advisors from backend(or cache)
        service.init = init;

        //Function to update the current page
        service.pageChanged = pageChanged;

        /*
            Function to find advisors matching search logic and add them to the service.searchResults array.
            Note: service.searchResults array will be emptied when this function is called, and then new matching advisors will be added.
         */
        service.search = search;

        //Function to sort service.searchResults
        service.sortBy = sortBy;

        //Comparator function to be passed to the array sort function to sort advisors by firstname.
        var compareFirstname;
        //Comparator function to be passed to the array sort function to sort advisors by lastname.
        var compareLastname;
        //Comparator function to be passed to the array sort function to sort advisors by province.
        var compareProvince;
        //Comparator function to be passed to the array sort function to sort advisors by city.
        var compareCity;
        //Comparator function to be passed to the array sort function to sort advisors by advisor id.
        var compareId;

        /*
        Array that lists the properties of an advisor that can be sorted by.
        Note: these values are not exactly the same as the properties found on the advisor object. See comments beside each value to determine mapping.
         */
        service.sortableColumns = [
            'firstname',//firstName
            'lastname',//lastName
            'city',//city
            'province'//province
        ];

        /*
            Used to store all advisors from the backend.
            NOTE: On search, a new boolean property called "showCommon" will be added to each advisor.
         */
        service.allAdvisors = [];

        //Function updates the maximum number of items allowed to be displayed on mobile.
        function loadMore() {
            //increase the number of results to display by the default amount if this does not exceed the total number of search results.
            if (service.mobileMaxNumDisplay < (service.searchResults.length - service.numPerPage) ) {
                service.mobileMaxNumDisplay += service.numPerPage;
            //There are not enough search results to increase the mobileMaxNumDisplay by the default, therefore just make it the same as the number of results.
            } else {
                service.mobileMaxNumDisplay = service.searchResults.length;
            }
        }

        //Load all advisors from backend
        function init() {
            //clear allAdvisors
            service.allAdvisors = [];
            var deferred = $q.defer();

            //make http call for all advisors.
            var ret = server.get(advisorAPI, false, 'localStorage', false).then(function(data) {
                //all advisors have been retrieved. Dissable isLoading.

                //precompute names with punctuation, spacing and accents removed. This will speed up searches later.
                _.forEach(data.data, function(advisor, index){
                    advisor.hasPicture = true;//assume each advisor has a picture until the err-src directive tells us otherwise.
                    if (advisor.spokenLanguage !== 'French' && advisor.spokenLanguage !== 'Bilingual') {
                        advisor.spokenLanguage = 'English';
                    }
                    
                    var commonName = advisor.commonName ? removeDiacriticsService.remove(advisor.commonName).toLowerCase() : null;
                    var firstName = removeDiacriticsService.remove(advisor.firstName).toLowerCase();
                    var lastName = removeDiacriticsService.remove(advisor.lastName).toLowerCase();
                    var cName = stripPunctuation(commonName);
                    var fName = stripPunctuation(firstName);
                    var lName = stripPunctuation(lastName);

                    var cNameArr = cName ? cName.split(' ') : [];
                    var lNameArr = lName.split(' ');
                    var fNameArr = fName.split(' ');
                    //this section will make each name unique if advisors have the same name twice in their name, ie. "Jean paul Jean"
                    //I don't think we currently have anyone like this though.
                    _.forEach(cNameArr, function(cName, i){
                        for (var z = 0; z < i; z++) {
                            if (cNameArr[z] === cName) {
                                cNameArr[i] = cNameArr[i] + "0";
                                break;
                            }
                        }
                    });

                    _.forEach(lNameArr, function(lName, i){
                        for (var z = 0; z < i; z++) {
                            if (lNameArr[z] === lName) {
                                lNameArr[i] = lNameArr[i] + "0";
                                break;
                            }
                        }
                    });

                    _.forEach(fNameArr, function(fName, i){
                        for (var z = 0; z < i; z++) {
                            if (fNameArr[z] === fName) {
                                fNameArr[i] = fNameArr[i] + "0";
                                break;
                            }
                        }
                    });

                    data.data[index].cNameArr = cNameArr;
                    data.data[index].lNameArr = lNameArr;
                    data.data[index].fNameArr = fNameArr;
                });
                //Store all advisors.
                service.allAdvisors = data.data;
                service.isLoading = false;
                deferred.resolve();

            },
            function() {
                //on error
                deferred.reject();
            });

            return deferred.promise;

        }

        //update the currentPage tracker
        function pageChanged(newPage) {
            service.currentPage = newPage;
        }

        //Sort the searchResults
        function sortBy(sortOption) {
            /*
            //If the user clicked the same sortby option(firstname, lastname, city, province), then toggle the sort order.
            if (lastSort === sortOption) {
                sortAscending = !sortAscending;
            //If the user is sorting by a different sort order than last used, change it back to the default value of ascending.
            } else {
                lastSort = sortOption;
                sortAscending = true;
            }

            //sort by first name.
            if (sortOption === service.sortableColumns[0]) {
                service.filteredSearchResults.sort(compareFirstname);
            //sort by last name.
            } else if (sortOption === service.sortableColumns[1]) {
                service.filteredSearchResults.sort(compareLastname);
            //sort by city.
            } else if (sortOption === service.sortableColumns[2]) {
                service.filteredSearchResults.sort(compareCity);
            //sort by province.
            } else if (sortOption === service.sortableColumns[3]) {
                service.filteredSearchResults.sort(compareProvince);
            }
            */
            service.searchResults.sort(compareLastname);
        }
        //we want to group all the single letter characters at the end.
        function singleLetterComparator(a,b) {
            if (a.length === 1) {
                return -1;
            } else if (b.length === 1) {
                return 1;
            } else {
                return 0;
            }
        }

        function singeLettersAtEnd(a, b) {
            if (a.length > 1) {
                return -1;
            } else {
                return 1;
            }
        }

        /*
            Find all advisors that conform to the search logic.
            1. Remove all leading and trailing spaces from the searchTerm.
            2. Search term is space separated words.
            3. Punctuation is not considered when searching. Ie. punctuation is removed from the searchTerm AND the advisor name before searching.
            4. Accents are not considered when searching. Ie. accented characters in both the searchTerm and advisor name are replaced with their non-accented equivalents before searching.
            5. Search is not case sensitive
            6. If only one word is provided as a searchTerm, find all advisors whose firstname, common name or last name CONTAIN the searchTerm.
            7. If more than one word is provided as a searchTerm, then find all advisors whose:
                a) firstName + " " + lastName matches the searchTerm or
                b) commonName + " " + lastName matches the searchTerm.
         */
        function search(searchTerm) {
            //empty the searchResults

            service.filteredSearchResults = [];
            service.searchResults = [];
            secondaryResults = [];
            //remove punctuation, accents and multispaces.
            service.searchPhrase = stripPunctuation(removeDiacriticsService.remove(searchTerm.replace(/ +(?= )/g,'')));
            //split the searchTerm into an array of words
            var subTerms = service.searchPhrase.toLowerCase().split(' ');
            var i = 0;
            /*
            while (i < subTerms.length) {
                if (subTerms[i].length < 2) {
                    subTerms.splice(i, 1);
                } else {
                    i++;
                }
            }
            */

            //only one word was searched.
            if (subTerms.length === 1 && subTerms[0].length > 1) {
                service.searchTermTooShort = false;
                searchAllNames(subTerms[0]);

            //2 or more words were entered for the searchTerm
            } else if (subTerms.length >= 2) {

                service.searchTermTooShort = false;
                //convert searchTerm to lower case.
                var tempSearchTerm = service.searchPhrase.toLowerCase();
                /*
                loop through all advisors and see if either their:
                    1. firstName + " " + lastName combination, with accents/punctuation, and capitalization removed, matches the searchTerm.
                    2. commonName + " " + lastName combination, with accents/punctuation, and capitalization removed, matches the searchTerm.
                 */

                subTerms = subTerms.sort(singeLettersAtEnd);

                _.forEach(service.allAdvisors, function(advisor, index) {
                    containsSearch(advisor.cNameArr, advisor.fNameArr, advisor.lNameArr,  subTerms, index);
                });
                if (service.searchResults.length === 0) {
                    service.searchResults = secondaryResults;
                } else {
                }
            } else {
                //none of the search functions were invoked, thus searchTerm must be too short.
                service.searchTermTooShort = true;
            }

            //sort searchResults and update the pagination/infinite scroll related trackers(maxPages, mobileMaxNumDisplay, currentPage).
            sortBy('lastname');
            //service.filter();

            service.filterRunnerService.allData = service.searchResults;
            _.forEach(service.allAdvisors, function(advisor) {
               advisor.showName = advisor.showCommon ? advisor.commonName : advisor.firstName;
            });
            /*
            service.filteredSearchResults = _.map(service.filterRunnerService.filter(), function(advisor){
                if (advisor.showCommon) {
                    advisor.showName = advisor.commonName;
                } else {
                    advisor.showName = advisor.firstName;
                }
                return advisor;
            });
            */
            service.filteredSearchResults = service.filterRunnerService.filter();

                updatePaginationInfiniteScroll();
        }

        /*
            If the searchTerm only has one letter, only show advisors that start with that letter.
            Otherwise show any advisors who's name contains the searchTerm. Ie there exists a suffix s, and prefix p, such that s + searchTerm + p === name.
            notMatched contains an array of searchTerms that have not yet been matched to a name. It does this by starting off as an array of all searchTerms and removes search terms everytime a match is found.
            namesSearched is an array of all names that have been matched against one-letter search terms already. This prevents us from matching the same word against multiple searchTerms if the user searches for something like "m m"
            Single-letter search terms should be the last to be compared because if it starts with the same letter as another search term, it might add the only name that would match the other search term to the namesSearched array and then it won't be matched later.
        */
        function termComparator(name, nameIndex, searchTerm, notMatched, namesSearched) {
            var ret;

            if (searchTerm.length === 1) {
                if (namesSearched.indexOf(nameIndex) < 0) {
                    ret = name.substring(0, 1) === searchTerm;
                } else {//this name has already been checked against a one-letter searchTerm, don't check it again.
                    return false;
                }

            } else {
                if (namesSearched.indexOf(nameIndex) < 0) {
                    ret = name.indexOf(searchTerm) >= 0;
                } else {
                    return false;
                }
            }

            if (ret) {
                var i = notMatched.indexOf(searchTerm);
                notMatched.splice(i, 1);

                namesSearched.push(nameIndex);
                //notMatched.push(searchTerm);
            }
            return ret;
        }

        function termNameChecker(names, searchTerms, notMatched, namesSearched, showCommon, index) {
            var matches = 0;
            _.forEach(searchTerms, function(searchTerm) {
                _.forEach(names, function (name, nameIndex) {
                    if (termComparator(name, nameIndex, searchTerm, notMatched, namesSearched)) {
                        matches++;
                        if (showCommon) {
                            service.allAdvisors[index].showCommon = true;
                        }
                        return false;
                    }
                });
            });
            return matches;
        }

        //check to see if the arrays of common names, first names, or last names contain the searchTerms as per above termComparator logic.
        function containsSearch(cNameArr, fNameArr, lNameArr, searchTerms, index) {
            var notMatched = searchTerms.slice();//array of searchTerms that have already been matched
            var partialMatch = false;//flag that indicates advisor matched some but not all of the searchTerms.
            var lastNamesSearched = [];

            //current number of matched search results.
            var matches = termNameChecker(lNameArr, searchTerms, notMatched, lastNamesSearched);
            if (matches === searchTerms.length) {
                if (service.allAdvisors[index].commonName) {
                    var firstNameMatchCount = termNameChecker(fNameArr, searchTerms, [], []);
                    service.allAdvisors[index].showCommon = true;
                } else {
                    service.allAdvisors[index].showCommon = false;
                }
                service.searchResults.push(service.allAdvisors[index]);
                return;
            } else if (matches > 0) {
                partialMatch = true;
            }

            var searchTerms3 = notMatched.slice();
            var tempMatches = matches;
            var commonNamesSearched = [];

            tempMatches += termNameChecker(cNameArr, notMatched, [], commonNamesSearched, true, index);
            if (tempMatches === searchTerms.length) {
                service.searchResults.push(service.allAdvisors[index]);
                return;
            } else if(tempMatches > 0) {
                partialMatch = true;
            }

            tempMatches = matches;
            var firstNamesSearched = [];
            tempMatches += termNameChecker(fNameArr, searchTerms3, [], firstNamesSearched);
            if (tempMatches === searchTerms.length) {
                service.allAdvisors[index].showCommon = false;
                service.searchResults.push(service.allAdvisors[index]);

                return;
            } else if (tempMatches > 0) {
                secondaryResults.push(service.allAdvisors[index]);
            }
        }

        //update the pagination/infinite scroll related trackers(maxPages, mobileMaxNumDisplay, currentPage).
        function updatePaginationInfiniteScroll() {
            service.maxPages = Math.ceil(service.searchResults.length / service.numPerPage);
            service.mobileMaxNumDisplay = service.numPerPage;
            service.currentPage = 1;
        }

        function searchAllNames(searchTerm) {
            //loop through all advisors and see if either firstName, commonName, or lastName CONTAINS the searchTerm with punctuation, accents and capitalization removed.
            _.forEach(service.allAdvisors, function(advisor, index) {

                //Convert all names to lowercase and remove punctuation/accents.
                var cName = advisor.cNameArr.join(" ");
                var fName = advisor.fNameArr.join(" ");
                var lName = advisor.lNameArr.join(" ");

                //check if commonName CONTAINS the searchTerm
                if (cName && cName.indexOf(searchTerm) >= 0) {
                    service.allAdvisors[index].showCommon = true;
                    service.searchResults.push(advisor);
                    //check if firstName CONTAINS the searchTerm
                } else if(fName.indexOf(searchTerm) >= 0) {
                    service.allAdvisors[index].showCommon = false;
                    advisor.showCommon = false;
                    service.searchResults.push(advisor);
                    //check if lastName CONTAINS the searchTerm
                } else if(lName.indexOf(searchTerm) >= 0) {
                    //lastName CONTAINS the search term, see if they have a commonName to display.
                    if (advisor.commonName) {
                        //commonName exists, show it
                        service.allAdvisors[index].showCommon = true;
                    } else {
                        //commonName does not exist, show firstName
                        service.allAdvisors[index].showCommon = false;
                    }
                    service.searchResults.push(advisor);
                }
                /*
                var commonName = advisor.commonName ? removeDiacriticsService.remove(advisor.commonName).toLowerCase() : null;
                var firstName = removeDiacriticsService.remove(advisor.firstName).toLowerCase();
                var lastName = removeDiacriticsService.remove(advisor.lastName).toLowerCase();
                var cName = stripPunctuation(commonName);
                var fName = stripPunctuation(firstName);
                var lName = stripPunctuation(lastName);

                //check if commonName CONTAINS the searchTerm
                if (commonName && (commonName.indexOf(searchTerm) >= 0 || cName.indexOf(searchTerm) >= 0)) {
                    service.allAdvisors[index].showCommon = true;
                    service.searchResults.push(advisor);
                //check if firstName CONTAINS the searchTerm
                } else if(firstName.indexOf(searchTerm) >= 0 || fName.indexOf(searchTerm) >= 0) {
                    service.allAdvisors[index].showCommon = false;
                    advisor.showCommon = false;
                    service.searchResults.push(advisor);
                //check if lastName CONTAINS the searchTerm
                } else if(lastName.indexOf(searchTerm) >= 0 || lName.indexOf(searchTerm) >= 0) {
                    //lastName CONTAINS the search term, see if they have a commonName to display.
                    if (advisor.commonName) {
                        //commonName exists, show it
                        service.allAdvisors[index].showCommon = true;
                    } else {
                        //commonName does not exist, show firstName
                        service.allAdvisors[index].showCommon = false;
                    }
                    service.searchResults.push(advisor);
                }
                */
            });
        }

        //comparitor function used to sort by advisor id
        compareId = function(obj1, obj2, order) {
            //advisorId's are always unique, will never equal.
            if (obj1.id < obj2.id) {
                return -1;
            } else {
                return 1;
            }
        };

        //comparitor function used to sort by advisor firstname
        compareFirstname = function(obj1, obj2, order) {

            var name1 = obj1.commonName ? obj1.commonName.toLowerCase() : obj1.firstName.toLowerCase();
            var name2 = obj2.commonName ? obj2.commonName.toLowerCase() : obj2.firstName.toLowerCase();

            if (name1 < name2) {
                return -1;
            } else if (name1 === name2) {
                return compareId(obj1, obj2, 4);
            } else {
                return 1;
            }
        };


        //comparitor function used to sort by advisor lastname
        compareLastname = function(obj1, obj2, order) {
            if (obj1.lastName < obj2.lastName) {
                return -1;
            } else if (obj1.lastName > obj2.lastName) {
                return 1;
            } else {
                return compareFirstname(obj1, obj2, 2);
            }
        };

        //Remove punctuation from string
        function stripPunctuation(string) {
            if (!string) {
                return string;
            } else {
                return string.replace(/[.,\/#!$%\^&\*;:{}=\-_`'~()]/g, "");
            }
        }

        //advisor locator is not used that often, thus we will only update the current dataset with the advisors whose images are not found.
        //if it was used more frequently, like on a daily basis, it would be better to store this in cache.
        function imageNotFound(advisorId) {
            _.forEach(service.allAdvisors, function(advisor) {
                if (advisor.id === advisorId) {
                    advisor.hasPicture = false;
                }
            });
        }

    }

})();
