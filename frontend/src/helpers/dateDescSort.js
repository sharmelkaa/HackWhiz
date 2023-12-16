export const dateDescSort = (array) => {
    if (!array) {
        return []
    }

    const arrayCopy = [...array]
    return arrayCopy.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
}