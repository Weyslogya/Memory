const script = require('../script');

describe('Level', () => {
    it('should be contains the level', () => {
        expect(script.playEasy.level).toEqual('easy')
    });
});