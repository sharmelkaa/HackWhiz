export const usernameValidation = {
    required: 'Username is required field',
    minLength: {
        value: 4,
        message: 'Username must be at least 4 characters long',
    },
    maxLength: {
        value: 25,
        message: 'Username can contain a maximum of 25 characters',
    },
    pattern: {
        value: /^(?![aA][dD][mM][iI][nN]\s*$).+/,
        message: 'You can"t use "admin" as username',
    },
    validate: {
        notOnlySpaces: (value) =>
            /^(?!\s*$).*$/.test(value) ||
            "Username can't just consist of spaces",
        noSpacesAround: (value) =>
            /^\S[^\s.]+\S$/.test(value) || 'Username can"t contain spaces',
    },
}

export const emailValidation = {
    required: 'Email is required field',
    pattern: {
        value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Enter a valid email',
    },
    validate: (value) => {
        for (const symbol of value) {
            if (/[а-яА-Я]/.test(symbol)) {
                return "Email can't contain Cyrillic characters"
            }
        }
    },
}

export const passwordValidation = {
    required: 'Password is required field',
    pattern: {
        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
        message:
            'Password must consist of 6-20 characters containing at least one digit, one upper and one lowercase letter',
    },
    validate: (value) =>
        /^\S[^\s.]+\S$/.test(value) || 'Password can"t contain spaces',
}
