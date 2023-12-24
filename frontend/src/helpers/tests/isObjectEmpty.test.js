import {isObjectEmpty} from "../isObjectEmpty";

describe('Testing function "isObjectEmpty"', () => {
    test('Function return true if object is empty', () => {
        expect(isObjectEmpty({})).toBe(true)
    });

    test('Function return false if object is not empty', () => {
        expect(isObjectEmpty({ someKey: 'someValue' })).toBe(false)
    });

    test('Function return false if we call it without any variable', () => {
        expect(isObjectEmpty()).toBe(false)
    });

    test('Function return false if we pass to it not object', () => {
        expect(isObjectEmpty('string')).toBe(false)
        expect(isObjectEmpty(3)).toBe(false)
        expect(isObjectEmpty([])).toBe(false)
        expect(isObjectEmpty([1, '2', 3])).toBe(false)
        expect(isObjectEmpty(true)).toBe(false)
        expect(isObjectEmpty(false)).toBe(false)
    });

    test('Function return false if we pass to it null or undefined', () => {
        expect(isObjectEmpty(null)).toBe(false)
        expect(isObjectEmpty(undefined)).toBe(false)
    });
})