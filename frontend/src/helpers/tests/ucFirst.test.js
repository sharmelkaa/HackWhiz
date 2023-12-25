import { ucFirst } from '../ucFirst'

describe('Testing function "ucFirst"', () => {
    test('Function return string with capitalized first letter', () => {
        expect(ucFirst('test')).toBe('Test')
        expect(ucFirst('TEST')).toBe('Test')
        expect(ucFirst('Test')).toBe('Test')
        expect(ucFirst('test test')).toBe('Test test')
    })

    test('Function throw Error if we pass to it not string', () => {
        expect(() => ucFirst(3)).toThrow('Variable should be string')
        expect(() => ucFirst(true)).toThrow('Variable should be string')
        expect(() => ucFirst(false)).toThrow('Variable should be string')
        expect(() => ucFirst(null)).toThrow('Variable should be string')
        expect(() => ucFirst(undefined)).toThrow('Variable should be string')
        expect(() => ucFirst([1, 2, 3])).toThrow('Variable should be string')
        expect(() => ucFirst({})).toThrow('Variable should be string')
        expect(() => ucFirst()).toThrow('Variable should be string')
    })
})
