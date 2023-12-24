export const ucFirst = (str) => {
    if (!str || typeof str !== 'string') {
        throw new Error('Variable should be string')
    }

    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}