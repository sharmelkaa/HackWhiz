export const dateDescSort = (array) => {
    if (!array || array.constructor !== Array) {
        throw new Error('Variable should be array')
    }

    if (array.length === 0) {
        return []
    }

    const arrayCopy = [...array]
    return arrayCopy.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    )
}
