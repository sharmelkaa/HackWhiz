import {getJWT, removeLocalStorage, setLocalStorage} from "../manageLocalStorage";

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Testing functions from "manageLocalStorage"', () => {
    test('Testing function "setLocalStorage"', () => {
        const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
        setLocalStorage('testKey', 'testValue')
        expect(mockSetItem).toHaveBeenCalledTimes(1)
        expect(JSON.parse(localStorage.getItem('testKey'))).toBe('testValue')

        setLocalStorage('testKey', 'testValue2')

        expect(JSON.parse(localStorage.getItem('testKey'))).not.toBe('testValue')
        expect(JSON.parse(localStorage.getItem('testKey'))).toBe('testValue2')
        expect(localStorage.length).toBe(1)
        setLocalStorage('testKey2', 'testValue2')
        expect(localStorage.length).toBe(2)
        expect(mockSetItem).toHaveBeenCalledTimes(3)
    });

    test('Testing function "getJWT"', () => {
        const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
        localStorage.setItem('JWT', JSON.stringify('token'))

        expect(getJWT('JWT')).toBe('token')
        expect(mockGetItem).toHaveBeenCalledTimes(1)
        localStorage.removeItem('JWT')
        expect(getJWT('JWT')).toBe(null)
    });

    test('Testing function "removeLocalStorage"', () => {
        const mockRemoveItem = jest.spyOn(Storage.prototype, 'removeItem');
        localStorage.setItem('testKey', JSON.stringify('testValue'))
        removeLocalStorage('testKey')
        expect(mockRemoveItem).toBeCalledTimes(1)
        expect(localStorage.getItem('testValue')).toBe(null)
    });
})