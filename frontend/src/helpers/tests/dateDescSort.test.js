import {dateDescSort} from "../dateDescSort";

describe('Testing function "dateDescSort"', () => {
    test('Function return an array sorted by date in descending order', () => {
        const mockArray = [
            { title: 'First', updatedAt: '2023-12-12T07:35:05.516Z' },
            { title: 'Second' , updatedAt: '2023-11-12T07:35:05.516Z' },
            { title: 'Third' , updatedAt: '2022-11-12T07:35:05.516Z' },
            { title: 'Fifth' , updatedAt: '2022-11-10T07:35:05.516Z' },
            { title: 'Fourth' , updatedAt: '2022-11-10T08:35:05.516Z' },
        ]

        expect(dateDescSort(mockArray).map((post) => post.title)).toEqual(['First', 'Second', 'Third', 'Fourth', 'Fifth'])
    });

    test('Function throw Error if we pass to it not array', () => {
        expect(() => dateDescSort(3)).toThrow('Variable should be array')
        expect(() => dateDescSort(true)).toThrow('Variable should be array')
        expect(() => dateDescSort(false)).toThrow('Variable should be array')
        expect(() => dateDescSort(null)).toThrow('Variable should be array')
        expect(() => dateDescSort(undefined)).toThrow('Variable should be array')
        expect(() => dateDescSort('string')).toThrow('Variable should be array')
        expect(() => dateDescSort({})).toThrow('Variable should be array')
        expect(() => dateDescSort()).toThrow('Variable should be array')
    });

    test('Function return empty array if we pass to it empty array', () => {
        expect(dateDescSort([])).toEqual([])
    });

})