var advisors = newAdvisors();
function newAdvisors() {
    return [
        {
            //0
            firstName: 'Michael',
            commonName: null,
            lastName: 'Andrews',
            partialBranchInfo: {
                city: 'London',
                provinceAbbr: 'ON'
            },
            email: 'mandrews@assante.com',
            phone: '519-438-0338',
            spokenLanguage: 'English'
        },
        {
            //1
            firstName: 'Peter',
            commonName: 'James',
            lastName: 'Kingston',
            partialBranchInfo: {
                city: 'Kingston',
                provinceAbbr: 'ON'
            },
            email: '',
            phone: '',
            spokenLanguage: 'English'
        },
        {
            //2
            firstName: 'Daniel',
            commonName: null,
            lastName: 'Johnstone',
            partialBranchInfo: {
                city: 'toronto',
                provinceAbbr: 'ON'
            },
            email: 'djohnstone@assante.com',
            phone: '416-348-9994',
            spokenLanguage: 'English'
        },
        {
            //3
            firstName: 'Jean Pierre',
            commonName: null,
            lastName: 'Beauchamp',
            partialBranchInfo: {
                city: 'Dorval',
                provinceAbbr: 'QC'
            },
            email: 'jpbeauchamp@assante.com',
            phone: '',
            spokenLanguage: 'Bilingual'
        },
        {
            //4
            firstName: 'Claudio',
            commonName: null,
            lastName: 'Di Sante',
            partialBranchInfo: {
                city: 'Hamilton',
                provinceAbbr: 'ON'
            },
            email: 'cdisante@assante.com',
            phone: '',
            spokenLanguage: 'English'
        },
        {
            //5
            firstName: 'Jocelyn',
            commonName: null,
            lastName: 'CÃ´tÃ©',
            partialBranchInfo: {
                city: 'Laval', provinceAbbr: 'QC',
                email: 'JCote@assante.com'
            },
            phone: '450-668-2400',
            spokenLanguage: 'French'
        },
        {
            //6
            firstName: 'GaÃ«l',
            commonName: null,
            lastName: 'LalibertÃ©',
            partialBranchInfo: {
                city: 'Quebec',
                provinceAbbr: 'QC'
            },
            email: 'GLaliberte@assante.com',
            phone: '418-559-4484',
            spokenLanguage: 'French'
        },
        {
            //7
            firstName: 'Ashley',
            commonName: null,
            lastName: "D'Souza",
            partialBranchInfo: {
                city: 'Mississauga',
                provinceAbbr: 'ON',
            },
            email: 'adsouza@assante.com',
            phone: '',
            spokenLanguage: 'English'
        },
        {
            //8
            firstName: 'Michel',
            commonName: null,
            lastName: 'St.-Georges',
            partialBranchInfo: {
                city: 'St. Laurent',
                provinceAbbr: 'QC'
            },
            email: '',
            phone: '',
            spokenLanguage:'Bilingual'
        },
        {
            //9
            firstName: 'Barbara',
            commonName: 'Barb',
            lastName: 'Stranak-St-Georges',
            partialBranchInfo: {
                city: 'St. Laurent',
                provinceAbbr: 'QC',
            },
            email: 'bstranakstgeorges@assante.com',
            phone: '',
            spokenLanguage:'Bilingual'
        },
        {
            //10
            firstName: 'Thomas',
            commonName: 'Eric',
            lastName: 'Thomson',
            partialBranchInfo: {
                city: 'North Bay',
                provinceAbbr: 'ON'
            },
            email: 'ethomson@assante.com',
            phone: '',
            spokenLanguage:'English'
        },
        {
            //11
            firstName: 'Troy',
            commonName: null,
            lastName: 'Thomson',
            partialBranchInfo: {
                city: 'Brandon',
                provinceAbbr: 'MB'
            },
            email: 'troy.thomson@assante.com',
            phone: '204-7252300  ext. 32',
            spokenLanguage: 'English'
        },
        {
            //12
            firstName: 'Alexander',
            commonName: 'Alex',
            lastName: 'Argento',
            partialBranchInfo: {
                city: 'Dorval',
                provinceAbbr: 'QC'
            },
            email: '',
            phone: '',
            spokenLanguage: 'English'
        },
        {
            //13
            firstName: 'Robert',
            commonName: 'Jay',
            lastName: 'Rayner',
            partialBranchInfo: {
                city: 'Kingston',
                provinceAbbr: 'ON'
            },
            email: 'jrayner@assante.com',
            phone: '613-766-7220',
            spokenLanguage: 'English'
        },
        {
            //14
            firstName: 'James Richard',
            commonName: 'Richard',
            lastName: 'Johnson',
            partialBranchInfo: {
                city: 'Antigonish',
                provinceAbbr: 'NS'
            },
            email: 'RJohnson@assante.com',
            phone: '',
            spokenLanguage: 'English'
        }
    ];
};

var ON_Advisors = function() {
    return [
        advisors[0],
        advisors[1],
        advisors[2],
        advisors[4],
        advisors[7],
        advisors[10],
        advisors[13]
    ];
}
var AB_Advisors = function() {
    return [
        advisors[0],
        advisors[1],
        advisors[2],
        advisors[4],
        advisors[7],
        advisors[10],
        advisors[13]
    ];
}
var englishBilingualAdvisors = [
    {
        firstName: 'Michael',
        commonName: null,
        lastName: 'Andrews',
        partialBranchInfo: {
            city: 'London',
            provinceAbbr: 'ON'
        },
        email: 'mandrews@assante.com',
        phone: '519-438-0338',
        spokenLanguage: 'English'
    },
    {
        firstName: 'Peter',
        commonName: 'James',
        lastName: 'Kingston',
        partialBranchInfo: {
            city: 'Kingston',
            provinceAbbr: 'ON'
        },
        email: '',
        phone: '',
        spokenLanguage: 'English'
    },
    {
        firstName: 'Daniel',
        commonName: null,
        lastName: 'Johnstone',
        partialBranchInfo: {
            city: 'toronto',
            provinceAbbr: 'ON'
        },
        email: 'djohnstone@assante.com',
        phone: '416-348-9994',
        spokenLanguage: 'English'
    },
    {
        firstName: 'Jean Pierre',
        commonName: null,
        lastName: 'Beauchamp',
        partialBranchInfo: {
            city: 'Dorval',
            provinceAbbr: 'QC'
        },
        email: 'jpbeauchamp@assante.com',
        phone: '',
        spokenLanguage: 'Bilingual'
    },
    {
        firstName: 'Claudio',
        commonName: null,
        lastName: 'Di Sante',
        partialBranchInfo: {
            city: 'Hamilton',
            provinceAbbr: 'ON'
        },
        email: 'cdisante@assante.com',
        phone: '',
        spokenLanguage: 'English'
    },
    {
        firstName: 'Ashley',
        commonName: null,
        lastName: "D'Souza",
        partialBranchInfo: {
            city: 'Mississauga',
            provinceAbbr: 'ON',
        },
        email: 'adsouza@assante.com',
        phone: '',
        spokenLanguage: 'English'
    },
    {
        firstName: 'Michel',
        commonName: null,
        lastName: 'St.-Georges',
        partialBranchInfo: {
            city: 'St. Laurent',
            provinceAbbr: 'QC'
        },
        email: '',
        phone: '',
        spokenLanguage:'Bilingual'
    },
    {
        firstName: 'Barbara',
        commonName: 'Barb',
        lastName: 'Stranak-St-Georges',
        partialBranchInfo: {
            city: 'St. Laurent',
            provinceAbbr: 'QC',
        },
        email: 'bstranakstgeorges@assante.com',
        phone: '',
        spokenLanguage:'Bilingual'
    },
    {
        firstName: 'Thomas',
        commonName: 'Eric',
        lastName: 'Thomson',
        partialBranchInfo: {
            city: 'North Bay',
            provinceAbbr: 'ON'
        },
        email: 'ethomson@assante.com',
        phone: '',
        spokenLanguage:'English'
    },
    {
        firstName: 'Troy',
        commonName: null,
        lastName: 'Thomson',
        partialBranchInfo: {
            city: 'Brandon',
            provinceAbbr: 'MB'
        },
        email: 'troy.thomson@assante.com',
        phone: '204-7252300  ext. 32',
        spokenLanguage: 'English'
    },
    {
        firstName: 'Alexander',
        commonName: 'Alex',
        lastName: 'Argento',
        partialBranchInfo: {
            city: 'Dorval',
            provinceAbbr: 'QC'
        },
        email: '',
        phone: '',
        spokenLanguage: 'English'
    },
    {
        firstName: 'Robert',
        commonName: 'Jay',
        lastName: 'Rayner',
        partialBranchInfo: {
            city: 'Kingston',
            provinceAbbr: 'ON'
        },
        email: 'jrayner@assante.com',
        phone: '613-766-7220',
        spokenLanguage: 'English'
    },
    {
        firstName: 'James Richard',
        commonName: 'Richard',
        lastName: 'Johnson',
        partialBranchInfo: {
            city: 'Antigonish',
            provinceAbbr: 'NS'
        },
        email: 'RJohnson@assante.com',
        phone: '',
        spokenLanguage: 'English'
    }
];
var englishBilingual_NS_Advisors = [
    {
        firstName: 'James Richard',
        commonName: 'Richard',
        lastName: 'Johnson',
        partialBranchInfo: {
            city: 'Antigonish',
            provinceAbbr: 'NS'
        },
        email: 'RJohnson@assante.com',
        phone: '',
        spokenLanguage: 'English'
    }
];
var initializedAdvisors = [
    {
        firstName: 'Michael',
        commonName: null,
        lastName: 'Andrews',
        partialBranchInfo: {
            city: 'London',
            provinceAbbr: 'ON'
        },
        email: 'mandrews@assante.com',
        phone: '519-438-0338',
        spokenLanguage: 'English',
        hasPicture: true,
        cNameArr: [],
        lNameArr:['andrews'],
        fNameArr:['michael']
    },
    {
        firstName: 'Peter',
        commonName: 'James',
        lastName: 'Kingston',
        partialBranchInfo: {
            city: 'Kingston',
            provinceAbbr: 'ON'
        },
        email: '',
        phone: '',
        spokenLanguage: 'English',
        hasPicture: true,
        cNameArr: ['james'],
        lNameArr:['kingston'],
        fNameArr:['peter']
    },
    {
        firstName: 'Daniel',
        commonName: null,
        lastName: 'Johnstone',
        partialBranchInfo: {
            city: 'toronto',
            provinceAbbr: 'ON'
        },
        email: 'djohnstone@assante.com',
        phone: '416-348-9994',
        spokenLanguage: 'English',
        hasPicture: true,
        cNameArr: [],
        lNameArr:['johnstone'],
        fNameArr:['daniel']
    },
    {
        firstName: 'Jean Pierre',
        commonName: null,
        lastName: 'Beauchamp',
        partialBranchInfo: {
            city: 'Dorval',
            provinceAbbr: 'QC'
        },
        email: 'jpbeauchamp@assante.com',
        phone: '',
        spokenLanguage: 'Bilingual',
        hasPicture: true,
        cNameArr: [],
        lNameArr:['beauchamp'],
        fNameArr:[
            'jean',
            'pierre'
        ]
    },
    {
        firstName: 'Claudio',
        commonName: null,
        lastName: 'Di Sante',
        partialBranchInfo: {
            city: 'Hamilton',
            provinceAbbr: 'ON'
        },
        email: 'cdisante@assante.com',
        phone: '',
        spokenLanguage: 'English',
        hasPicture: true,
        cNameArr: [],
        lNameArr:[
            'di',
            'sante'
        ],
        fNameArr:[
            'claudio'
        ]
    },
    {
        firstName: 'Jocelyn',
        commonName: null,
        lastName: 'CÃ´tÃ©',
        partialBranchInfo: {
            city: 'Laval', provinceAbbr: 'QC',
            email: 'JCote@assante.com'
        },
        phone: '450-668-2400',
        spokenLanguage: 'French',
        hasPicture: true,
        cNameArr: [],
        lNameArr:['cote'],
        fNameArr:['jocelyn']
    },
    {
        firstName: 'GaÃ«l',
        commonName: null,
        lastName: 'LalibertÃ©',
        partialBranchInfo: {
            city: 'Quebec',
            provinceAbbr: 'QC'
        },
        email: 'GLaliberte@assante.com',
        phone: '418-559-4484',
        spokenLanguage: 'French',
        hasPicture: true,
        cNameArr: [],
        lNameArr:['laliberte'],
        fNameArr:['gael']
    },
    {
        firstName: 'Ashley',
        commonName: null,
        lastName: "D'Souza",
        partialBranchInfo: {
            city: 'Mississauga',
            provinceAbbr: 'ON',
        },
        email: 'adsouza@assante.com',
        phone: '',
        spokenLanguage: 'English',
        hasPicture: true,
        cNameArr: [],
        lNameArr:['dsouza'],
        fNameArr:['ashley']
    },
    {
        firstName: 'Michel',
        commonName: null,
        lastName: 'St.-Georges',
        partialBranchInfo: {
            city: 'St. Laurent',
            provinceAbbr: 'QC'
        },
        email: '',
        phone: '',
        spokenLanguage:'Bilingual',
        hasPicture: true,
        cNameArr: [],
        lNameArr:['stgeorges'],
        fNameArr:['michel']
    },
    {
        firstName: 'Barbara',
        commonName: 'Barb',
        lastName: 'Stranak-St-Georges',
        partialBranchInfo: {
            city: 'St. Laurent',
            provinceAbbr: 'QC',
        },
        email: 'bstranakstgeorges@assante.com',
        phone: '',
        spokenLanguage:'Bilingual',
        hasPicture: true,
        cNameArr: ['barb'],
        lNameArr:['stranak-st-georges'],
        fNameArr:['barbara']
    },
    {
        firstName: 'Thomas',
        commonName: 'Eric',
        lastName: 'Thomson',
        partialBranchInfo: {
            city: 'North Bay',
            provinceAbbr: 'ON'
        },
        email: 'ethomson@assante.com',
        phone: '',
        spokenLanguage:'English',
        hasPicture: true,
        cNameArr: ['eric'],
        lNameArr:['thomson'],
        fNameArr:['thomas']
    },
    {
        firstName: 'Troy',
        commonName: null,
        lastName: 'Thomson',
        partialBranchInfo: {
            city: 'Brandon',
            provinceAbbr: 'MB'
        },
        email: 'troy.thomson@assante.com',
        phone: '204-7252300  ext. 32',
        spokenLanguage: 'English',
        hasPicture: true,
        cNameArr: [],
        lNameArr:['thomson'],
        fNameArr:['troy']
    },
    {
        firstName: 'Alexander',
        commonName: 'Alex',
        lastName: 'Argento',
        partialBranchInfo: {
            city: 'Dorval',
            provinceAbbr: 'QC'
        },
        email: '',
        phone: '',
        spokenLanguage: 'English',
        hasPicture: true,
        cNameArr: ['alex'],
        lNameArr:['argento'],
        fNameArr:['alexander']
    },
    {
        firstName: 'Robert',
        commonName: 'Jay',
        lastName: 'Rayner',
        partialBranchInfo: {
            city: 'Kingston',
            provinceAbbr: 'ON'
        },
        email: 'jrayner@assante.com',
        phone: '613-766-7220',
        spokenLanguage: 'English',
        hasPicture: true,
        cNameArr: ['jay'],
        lNameArr:['rayner'],
        fNameArr:['robert']
    },
    {
        firstName: 'James Richard',
        commonName: 'Richard',
        lastName: 'Johnson',
        partialBranchInfo: {
            city: 'Antigonish',
            provinceAbbr: 'NS'
        },
        email: 'RJohnson@assante.com',
        phone: '',
        spokenLanguage: 'English',
        hasPicture: true,
        cNameArr: ['richard'],
        lNameArr:['johnson'],
        fNameArr:[
            'james',
            'richard'
        ]
    }
];

var paginationAdvisors = [
    {
        firstName: 'Dean',
        commonName: null,
        lastName: 'Cormier',
        partialBranchInfo: {
            city: 'Mount Pearl',
            provinceAbbr: 'NF'
        },
        email: 'dcormier@assante.com',
        phone: '709-5761785  ext. 1868',
        spokenLanguage: 'English',
        cNameArr: [],
        lNameArr:['cormier'],
        fNameArr:[
            'dean'
        ]
    },
    {
        firstName: 'Ronald',
        commonName: 'Ron',
        lastName: 'Schmidt',
        partialBranchInfo: {
            city: 'Courtenay',
            provinceAbbr: 'BC'
        },
        email: 'rschmidt@assante.com',
        phone: '',
        spokenLanguage: 'English',
        cNameArr: ['ron'],
        lNameArr:['schmidt'],
        fNameArr:[
            'ronald'
        ]
    },
    {
        firstName: 'Benjamin',
        commonName: 'Chris',
        lastName: 'Horan',
        partialBranchInfo: {
            city: 'Toronto',
            provinceAbbr: 'ON'
        },
        email: 'choran@assante.com',
        phone: '416-216-6532',
        spokenLanguage: 'English',
        cNameArr: ['chris'],
        lNameArr:['horan'],
        fNameArr:[
            'benjamin'
        ]
    },
    {
        firstName: 'Scott',
        commonName: null,
        lastName: 'Jamieson',
        partialBranchInfo: {
            city: 'Mississauga',
            provinceAbbr: 'ON'
        },
        email: 'sjamieson@assante.com',
        phone: '',
        spokenLanguage: 'English',
        cNameArr: [],
        lNameArr:['jamieson'],
        fNameArr:[
            'scott'
        ]
    },
    {
        firstName: 'Matthew',
        commonName: 'Kyle',
        lastName: 'Cumming',
        partialBranchInfo: {
            city: 'Langley',
            provinceAbbr: 'BC'
        },
        email: 'kcumming@assante.com',
        phone: '604-532-8622',
        spokenLanguage: 'English',
        cNameArr: ['kyle'],
        lNameArr:['cumming'],
        fNameArr:[
            'matthew'
        ]
    },
    {
        firstName: 'Robert',
        commonName: 'Robert J.M.',
        lastName: 'Smith',
        partialBranchInfo: {
            city: 'Hamilton',
            provinceAbbr: 'ON'
        },
        email: 'robert.smith@assante.com',
        phone: '',
        spokenLanguage: 'English',
        cNameArr: [
            'robert',
            'jm'
        ],
        lNameArr:['smith'],
        fNameArr:[
            'robert'
        ]
    },
    {
        firstName: 'James',
        commonName: 'Jamie',
        lastName: 'Geisler',
        partialBranchInfo: {
            city: 'Powassan',
            provinceAbbr: 'ON'
        },
        email: 'jgeisler@assante.com',
        phone: '',
        spokenLanguage: 'English',
        cNameArr: ['jamie'],
        lNameArr:['geisler'],
        fNameArr:[
            'james'
        ]
    },
    {
        firstName: 'Eeva',
        commonName: null,
        lastName: 'Niemi',
        partialBranchInfo: {
            city: 'Thunder Bay',
            provinceAbbr: 'ON'
        },
        email: 'eniemi@assante.com',
        phone: '807-683--4588',
        spokenLanguage: 'English',
        cNameArr: [],
        lNameArr:['niemi'],
        fNameArr:[
            'eeva'
        ]
    },
    {
        firstName: 'James',
        commonName: 'Jamie',
        lastName: 'Thomas',
        partialBranchInfo: {
            city: 'Kingston',
            provinceAbbr: 'ON'
        },
        email: 'Jamie.Thomas@assante.com',
        phone: '613-766-8600',
        spokenLanguage: 'English',
        cNameArr: ['jamie'],
        lNameArr:['thomas'],
        fNameArr:[
            'james'
        ]
    },
    {
        firstName: 'Paul',
        commonName: null,
        lastName: 'Lermitte',
        partialBranchInfo: {
            city: 'Vancouver',
            provinceAbbr: 'BC'
        },
        email: 'plermitte@assante.com',
        phone: '',
        spokenLanguage: 'English',
        cNameArr: [],
        lNameArr:['lermitte'],
        fNameArr:[
            'paul'
        ]
    }
];

