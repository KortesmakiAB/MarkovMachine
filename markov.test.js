const { MarkovMachine } = require('./markov');

describe('makeChains method tests', () => {

    test('First word in "words" array should be a key. Second word in same array should be added to values array. Constructor should convert words to lower case and remove periods and exclamation marks.', () => {
        const mmTest = new MarkovMachine('Hello. World!');
        expect(mmTest.chains['hello'][0]).toBe('world');
    });

    test('When last word in array is a key, value array should contain 1 value, null ', () => {
        const mmTest = new MarkovMachine('You are my sunshine');
        expect(mmTest.chains['sunshine'].length).toBe(1);
        expect(mmTest.chains['sunshine'][0]).toBe(null);
    });
});


describe('makeText method tests', () => {
    let mmTest;
    
    beforeAll(() => {
        mmTest = new MarkovMachine('Amazing grace how sweet the sound.');
    });

    test('There should be 10 words. Output should be a string.', () => {
        const test = mmTest.makeText(10);
        expect(test.split(' ').length).toBe(10);
        expect(typeof test).toBe('string');
    });

    test('Should not contain other words or types.', () => {
        const test = mmTest.makeText(10);
        expect(test).not.toContain('TestWord');
        expect(test).not.toContain(undefined);
        expect(test).not.toContain(true);
    });
});