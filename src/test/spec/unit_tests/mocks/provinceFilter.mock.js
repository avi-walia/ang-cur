var provinceFilterServiceMock = {
    defaultValue: 'Province',
    filterFunc: function(){},
    label: 'province',
    value: 'Province',
    options: [
        'Province',//0
        'AB',//1
        'BC',//2
        'MB',//3
        'NB',//4
        'NL',//5
        'NS',//6
        'NT',//7
        'NU',//8
        'ON',//9
        'PE',//10
        'QC',//11
        'SK',//12
        'YT'//13
    ]
};
//designed to be used with filterRunnerService.allData = advisors
var mockNSFilter = function() {
    /*
    spyOn(provinceFilterServiceMock, "filterFunc").and.returnValues(
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true
    );
    */
    spyOn(provinceFilterServiceMock, "filterFunc").and.returnValues(
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true
    );
}
var provinceFilter = {
    possibleValues: provinceFilterServiceMock.options,
    AB: {
        partialBranchInfo: {
            provinceAbbr: provinceFilterServiceMock.options[1]
        }
    },
    BC: {
        partialBranchInfo: {
            provinceAbbr: provinceFilterServiceMock.options[2]
        }
    },
    MB: {
        partialBranchInfo: {
            provinceAbbr: provinceFilterServiceMock.options[3]
        }
    },
    NB: {
        partialBranchInfo: {
            provinceAbbr: provinceFilterServiceMock.options[4]
        }
    },
    NL: {
        partialBranchInfo: {
            provinceAbbr: provinceFilterServiceMock.options[5]
        }
    },
    NS: {
        partialBranchInfo: {
            provinceAbbr: provinceFilterServiceMock.options[6]
        }
    },
    NT: {
        partialBranchInfo: {
            provinceAbbr: provinceFilterServiceMock.options[7]
        }
    },
    NU: {
        partialBranchInfo: {
            provinceAbbr: provinceFilterServiceMock.options[8]
        }
    },
    ON: {
        partialBranchInfo: {
            provinceAbbr: provinceFilterServiceMock.options[9]
        }
    },
    PE: {
        partialBranchInfo: {
            provinceAbbr: provinceFilterServiceMock.options[10]
        }
    },
    QC: {
        partialBranchInfo: {
            provinceAbbr: provinceFilterServiceMock.options[11]
        }
    },
    SK: {
        partialBranchInfo: {
            provinceAbbr: provinceFilterServiceMock.options[12]
        }
    },
    YT: {
        partialBranchInfo: {
            provinceAbbr: provinceFilterServiceMock.options[13]
        }
    }
};