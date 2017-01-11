//this object uses all unique advisor names(first, common or last) as keys and the values are the outputs after running the name through the removeDemocraticService function.

var removeDiacriticsServiceMock = {

    mockForInit: function() {
        spyOn(removeDiacriticsServiceMock, "remove").and.returnValues(
            "Michael",
            "Andrews",
            "James",
            "Peter",
            "Kingston",
            "Daniel",
            "Johnstone",
            "Jean Pierre",
            "Beauchamp",
            "Claudio",
            "Di Sante",
            "Jocelyn",
            "CÃ´tÃ©",
            "gaÃ«l",
            "LalibertA©",
            "Ashley",
            "D'Souza",
            "Michel",
            "St.-Georges",
            "Barb",
            "Barbara",
            "Stranak-St-Georges",
            "Eric",
            "Thomas",
            "Thomson",
            "Troy",
            "Thomson",
            "Alex",
            "Alexander",
            "Argento",
            "Jay",
            "Robert",
            "Rayner",
            "Richard",
            "James Richard",
            "Johnson"
        );
    },
    mockForPaginationInit: function() {
        spyOn(removeDiacriticsServiceMock, "remove").and.returnValues(
            "Dean",
            "Cormier",
            "Ron",
            "Ronald",
            "Schmidt",
            "Chris",
            "Benjamin",
            "Horan",
            "Scott",
            "Jamieson",
            "Kyle",
            "Matthew",
            "Cumming",
            "Robert J.M.",
            "Robert",
            "Smith",
            "Jamie",
            "James",
            "Geisler",
            "Eeva",
            "Niemi",
            "Jamie",
            "James",
            "Thomas",
            "Paul",
            "Lermitte"
        );
    },
    search: {//every property of search is a search term. It's correlated value is the mock removeDiacriticsService for that search. Underscores represent spaces.
        mi: function() {
            spyOn(removeDiacriticsServiceMock, "remove").and.returnValues(
                "mi"
            );
        },
        m_m: function() {
            spyOn(removeDiacriticsServiceMock, "remove").and.returnValues(
                "m",
                "m ",
                "m m"
            );
        },
        j_ric_j: function() {
            spyOn(removeDiacriticsServiceMock, "remove").and.returnValues(
                "j",
                "j ",
                "j r",
                "j ri",
                "j ric",
                "j ric ",
                "j ric j"
            );
        },
        thom_t: function() {
            spyOn(removeDiacriticsServiceMock, "remove").and.returnValues(
                "thom t"
            );
        },
        thom: function() {
            spyOn(removeDiacriticsServiceMock, "remove").and.returnValues(
                'thom'/*,
                'Michael',
                'Andrews',
                'James',
                'Peter',
                'Kingston',
                'Daniel',
                'Johnstone',
                'Jean Pierre',
                'Beauchamp',
                'Claudio',
                'Di Sante',
                'Jocelyn',
                'CA´tA©',
                'GaA«l',
                'LalibertA©',
                'Ashley',
                "D'Souza",
                'Michel',
                'St.-Georges',
                'Barb',
                'Barbara',
                'Stranak-St-Georges',
                'Eric',
                'Thomas',
                'Thomson',
                'Troy',
                'Thomson',
                'Alex',
                'Alexander',
                'Argento',
                'Jay',
                'Robert',
                'Rayner',
                'Richard',
                'James Richard',
                'Johnson'
                */
            );
        },
        thom_tho: function() {
            spyOn(removeDiacriticsServiceMock, "remove").and.returnValues(
                "thom tho"
            );
        },
        a_a: function() {
            spyOn(removeDiacriticsServiceMock, "remove").and.returnValues(
                "a a"
            );
        },
        a_alex: function() {
            spyOn(removeDiacriticsServiceMock, "remove").and.returnValues(
                "a alex"
            );
        },
        alexa_a: function() {
            spyOn(removeDiacriticsServiceMock, "remove").and.returnValues(
                "alexa a"
            );
        },
        r_r: function() {
            spyOn(removeDiacriticsServiceMock, "remove").and.returnValues(
                "r r"
            );
        },
        r_j: function() {
            spyOn(removeDiacriticsServiceMock, "remove").and.returnValues(
                "r j"
            );
        },
        r_j_j: function() {
            spyOn(removeDiacriticsServiceMock, "remove").and.returnValues(
                "r j j"
            );
        }
    },
    remove: function(){}
    /*
    remove: function (name) {
        if (!name) {
            return name;
        } else if (!this.removeDemocraticsServiceMap[name]) {
            //console.log('returning: ', name);
            throw "Missing removeDemocraticMap for: " + name
        }
        return this.removeDemocraticsServiceMap[name];
    },
    */
    //includes names and search terms
    /*
    removeDemocraticsServiceMap: {
        "Michael":"Michael",
        "Peter":"Peter",
        "Daniel":"Daniel",
        "Jean Pierre":"Jean Pierre",
        "Jean":"Jean",
        "Pierre":"Pierre",
        "Claudio":"Claudio",
        "Jocelyn":"Jocelyn",
        "GaÃ«l":"Gael",
        "Ashley":"Ashley",
        "Michel":"Michel",
        "Barbara":"Barbara",
        "Thomas":"Thomas",
        "Troy":"Troy",
        "Alexander":"Alexander",
        "Robert":"Robert",
        "James Richard":"James Richard",
        "Barb":"Barb",
        "Eric":"Eric",
        "Alex":"Alex",
        "Jay":"Jay",
        "Richard":"Richard",
        "James":"James",
        "Johnson":"Johnson",
        "Rayner":"Rayner",
        "Argento":"Argento",
        "Thomson":"Thomson",
        "Eric":"Eric",
        "Stranak-St-Georges":"Stranak-St-Georges",
        "St.-Georges":"St.-Georges",
        "D'Souza":"D'Souza",
        "LalibertÃ©":"Laliberte",
        "CÃ´tÃ©":"Cote",
        "Di Sante":"Di Sante",
        "Di":"Di",
        "Sante":"Sante",
        "Beauchamp":"Beauchamp",
        "Johnstone":"Johnstone",
        "Kingston":"Kingston",
        "Andrews":"Andrews",
        "m m": "m m",
        "j ric j": "j ric j",
        "r j": "r j",
        "thom": "thom",
        "thom t": "thom t",
        "thom tho": "thom tho",
        "a a": "a a",
        "a alex": "a alex",
        "alexa a": "alexa a",
        "r r": "r r",
        "r j j": "r j j"
    },
    */
};

/*
removeDiacraticsServiceMock = {
    remove: function(name){},
    mockForInit: function() {
        spyOn(removeDiacraticsServiceMock, "remove").and.returnValues(
            'Michael',
            'Andrews',
            'James',
            'Peter',
            'Kingston',
            'Daniel',
            'Johnstone',
            'Jean Pierre',
            'Beauchap',
            'Claduio',
            'Di Sante',
            'Jocelyn',
            'Cote',
            'Gael',
            'Laliberte',
            'Ashley',
            "D'Souza",
            'Michel',
            'St.-Georges',
            'Barb',
            'Barbara',
            'Stranak-St-Georges',
            'Eric',
            'Thomas',
            'Thomson',
            'Troy',
            'Thomson',
            'Alex',
            'Alexander',
            'Jay',
            'Robert',
            'Rayner',
            'Richard',
            'James Richard',
            'Johnson'
        );
    }
*/