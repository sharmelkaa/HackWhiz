export const usernameValidation = {
    required: 'Username is required field',
    minLength: {
        value: 4,
        message: 'Username must be at least 4 characters long'
    },
    pattern: {
        value: /^(?!admin\s*$).+/,
        message: 'You can"t use "admin" as username'
    }
}

export const emailValidation = {
    required: 'Email is required field',
    pattern: {
        value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Enter a valid email'
    }
}

export const passwordValidation = {
    required: 'Password is required field',
    pattern: {
        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
        message: 'Password must consist of 6-20 characters containing at least one digit, one upper and one lowercase letter'
    }
}