var branchListServiceMockConstructor = function(branchLists) {
    return {
        getLocation: function() {},
        getBranchList: function(){
            return {
                'then': function() {
                    return branchLists;
                }
            }
        }
    }
}