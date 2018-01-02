import { sequence } from './sequenceGenerator';

describe('should return the new sequence everytime', () => {

    const obj = [{
        type: 'ghost',
        level: 0,
        disabled: false
    }, {
        type: 'water',
        level: 0,
        disabled: false
    },{
        type: 'fire',
        level: 0,
        disabled: false
    },{
        type: 'grass',
        level: 0,
        disabled: false
    },{
        type: 'fighting',
        level: 0,
        disabled: false
    }]

    it ('get the sequence for n=2', () => {
      var ret =  sequence.heapsPermute(obj, obj.length);
      expect(ret.length).toBe(120);
    });

    it('should test if elements of two arrays are arranged identically', () => {
        const obj1 = [{
            type: 'ghost',
            level: 0,
            disabled: false
        }, {
            type: 'water',
            level: 0,
            disabled: false
        },{
            type: 'grass',
            level: 0,
            disabled: false
        },{
            type: 'fire',
            level: 0,
            disabled: false
        },{
            type: 'fighting',
            level: 0,
            disabled: false
        }]

        const obj2 = [{
            type: 'ghost',
            level: 0,
            disabled: false
        }, {
            type: 'water',
            level: 0,
            disabled: false
        },{
            type: 'grass',
            level: 0,
            disabled: false
        },{
            type: 'fire',
            level: 0,
            disabled: false
        },{
            type: 'fighting',
            level: 0,
            disabled: false
        }]
        const isDifferent = sequence.isArrayDifferent(obj, obj1);
        expect(isDifferent).toBe(true);
        expect(sequence.isArrayDifferent(obj1,obj2)).toBe(false);
    });

    // it ('get the sequence for n=3', () => {
    //     var ret = sequence.heapsPermute([1,2,3]);
    //     expect(ret.length).toBeGreaterThan(6);
    // });

    // it ('get the sequence for n=4', () => {
    //     var ret = sequence.heapsPermute([1,2,3,4]);
    //     expect(ret.length).toBeGreaterThan(24);
    // });

    // it ('get the sequence for n=5', () => {
    //     var ret = sequence.heapsPermute([1,2,3,4,5]);
    //     expect(ret.length).toBeGreaterThan(120);
    // });
});