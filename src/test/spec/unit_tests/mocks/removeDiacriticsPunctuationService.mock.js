//this object uses all unique advisor names(first, common or last) as keys and the values are the outputs after running the name through the removeDemocraticService function.
var removeDiacriticsPunctuationMock = [
    {
        fNameArr: ["michael"],
        cNameArr: [],
        lNameArr: ["andrews"]
    },
    {
        fNameArr: ["peter"],
        cNameArr: ["james"],
        lNameArr: ["kingston"]
    },
    {
        fNameArr: ["daniel"],
        cNameArr: [],
        lNameArr: ["johnstone"]
    },
    {
        fNameArr: [
            "jean",
            "pierre"
        ],
        cNameArr: [],
        lNameArr: [
            "beauchamp"
        ]
    },
    {
        fNameArr: ["claudio"],
        cNameArr: [],
        lNameArr: [
            "di",
            "sante"
        ]
    },
    {
        fNameArr: ["jocelyn"],
        cNameArr: [],
        lNameArr: ["cã´tã©"]
    },
    {
        fNameArr: ["gaã«l"],
        cNameArr: [],
        lNameArr: ["laliberta©"]
    },
    {
        fNameArr: ["ashley"],
        cNameArr: [],
        lNameArr: ["dsouza"]
    },
    {
        fNameArr: ["michel"],
        cNameArr: [],
        lNameArr: ["stgeorges"]
    },
    {
        fNameArr: ["barbara"],
        cNameArr: ["barb"],
        lNameArr: ["stranakstgeorges"]
    },
    {
        fNameArr: ["thomas"],
        cNameArr: ["eric"],
        lNameArr: ["thomson"]
    },
    {
        fNameArr: ["troy"],
        cNameArr: [],
        lNameArr: ["thomson"]
    },
    {
        fNameArr: ["alexander"],
        cNameArr: ["alex"],
        lNameArr: ["argento"]
    },
    {
        fNameArr: ["robert"],
        cNameArr: ["jay"],
        lNameArr: ["rayner"]
    },
    {
        fNameArr: ["james", "richard"],
        cNameArr: ["richard"],
        lNameArr: ["johnson"]
    }
]
/*
var removeDiacriticsPunctuationMock = {
    remove: function (name) {

        if (name === 'GaÃ«l') {
            console.log('name: ', this.newRemoveDemocraticsPunctuationMap[name]);
        }
        if (!name) {
            return name;
        } else if (!this.newRemoveDemocraticsPunctuationMap[name]) {
            //console.log('returning: ', name);
            throw "Missing removeDemocraticMap for: " + name
        }
        return this.newRemoveDemocraticsPunctuationMap[name];
    },
    //includes names and search terms
    newRemoveDemocraticsPunctuationMap: {
        "Michael":"michael",
        "Peter":"peter",
        "Daniel":"daniel",
        "Jean Pierre":"jean pierre",
        "Jean":"jean",
        "Pierre":"pierre",
        "Claudio":"claudio",
        "Jocelyn":"jocelyn",
        "GaÃ«l":"gaã«l",
        "Ashley":"ashley",
        "Michel":"michel",
        "Barbara":"barbara",
        "Thomas":"thomas",
        "Troy":"troy",
        "Alexander":"alexander",
        "Robert":"robert",
        "James Richard":"james richard",
        "Barb":"barb",
        "Eric":"eric",
        "Alex":"alex",
        "Jay":"jay",
        "Richard":"richard",
        "James":"james",
        "Johnson":"johnson",
        "Rayner":"rayner",
        "Argento":"argento",
        "Thomson":"thomson",
        "Eric":"eric",
        "Stranak-St-Georges":"stranakstgeorges",
        "St.-Georges":"stgeorges",
        "D'Souza":"dsouza",
        "LalibertÃ©":"laliberta©",
        "CÃ´tÃ©":"cã´tã©",
        "Di Sante":"di sante",
        "Di":"di",
        "Sante":"sante",
        "Beauchamp":"beauchamp",
        "Johnstone":"johnstone",
        "Kingston":"kingston",
        "Andrews":"andrews"
    }
};
    */