export const titleValidation = {
    required: 'Title is required field',
    maxLength: {
        value: 300,
        message: 'Title can contain a maximum of 300 characters',
    },
    validate: {
        notOnlySpaces: (value) =>
            /^(?!\s*$).*$/.test(value) || "Title can't just consist of spaces",
        noSpacesAround: (value) =>
            /^\S(.*\S)?$/.test(value) || 'Title can"t start or end with spaces',
    },
}

export const bodyValidation = {
    required: 'Body is required field',
    maxLength: {
        value: 5000,
        message: 'Body can contain a maximum of 5000 characters',
    },
    validate: {
        notOnlySpaces: (value) =>
            /^(?!\s*$).*$/.test(value) || "Body can't just consist of spaces",
        noSpacesAround: (value) =>
            /^\S(.*\S)?$/.test(value) || 'Body can"t start or end with spaces',
    },
}
