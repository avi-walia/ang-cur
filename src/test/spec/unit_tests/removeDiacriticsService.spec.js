var $removeDiacriticsService;

(function () {
    describe('RemoveDiacraticsService test', function () {

        beforeEach(function() {
            module('advisorLocator.utils');
        });


        beforeEach(
            inject(function(removeDiacriticsService) {
                $removeDiacriticsService = removeDiacriticsService;

            })
        );

        it('RemoveDiacratics service should exist', function() {
            expect($removeDiacriticsService).toBeDefined();
            expect($removeDiacriticsService.hasOwnProperty('remove')).toEqual(true);
            expect($removeDiacriticsService.remove('Sébastien')).toEqual('Sebastien');
            expect($removeDiacriticsService.remove('André')).toEqual('Andre');
            expect($removeDiacriticsService.remove('Côté')).toEqual('Cote');
            expect($removeDiacriticsService.remove('Gaël')).toEqual('Gael');
            expect($removeDiacriticsService.remove('Laliberté')).toEqual('Laliberte');
            expect($removeDiacriticsService.remove('asédf')).toEqual('asedf');
            expect($removeDiacriticsService.remove('àsdf')).toEqual('asdf');
            expect($removeDiacriticsService.remove('âsédf')).toEqual('asedf');
            expect($removeDiacriticsService.remove('asêdf')).toEqual('asedf');
            expect($removeDiacriticsService.remove('asédfî')).toEqual('asedfi');
            expect($removeDiacriticsService.remove('îasôdf')).toEqual('iasodf');
            expect($removeDiacriticsService.remove('asûdfî')).toEqual('asudfi');
            expect($removeDiacriticsService.remove('asëdfî')).toEqual('asedfi');
            expect($removeDiacriticsService.remove('ïasûdfî')).toEqual('iasudfi');
            expect($removeDiacriticsService.remove('asûdfîü')).toEqual('asudfiu');
            expect($removeDiacriticsService.remove('aÿsûdfî')).toEqual('aysudfi');
        });

    });
})();