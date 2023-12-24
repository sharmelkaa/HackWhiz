export const isObjectEmpty = (objectName) => {
    if (!objectName) {
        return false
    }

    return (
        objectName &&
        Object.keys(objectName).length === 0 &&
        objectName.constructor === Object
    );
};