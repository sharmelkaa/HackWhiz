import { screen, render, fireEvent } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router'
import { act } from 'react-dom/test-utils'
import { LogIn } from './pages/login'
import { Root } from './components/Root'
import { store } from './store/store'
import { LoginForm } from './pages/login/components/LoginForm'

describe('Trying testing my components', () => {
    test('Testing if Root component works properly', () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Root />
                </Provider>
            </MemoryRouter>
        )
        const logInBtn = screen.getByText('Log In')
        const signInBtn = screen.getByText('Sign Up')
        const logOutBtn = screen.queryByText('Log Out')

        expect(logInBtn).toBeInTheDocument()
        expect(signInBtn).toBeInTheDocument()
        expect(logOutBtn).toBeNull()
    })

    test('Testing if LoginForm opens after click on LogIn button', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<Root />} />
                        <Route path="/login" element={<LogIn />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        )

        const loginBtn = screen.getByText('Log In')
        fireEvent.click(loginBtn)
        expect(screen.getByText('Username')).toBeInTheDocument()
        expect(screen.getByText('Password')).toBeInTheDocument()
        expect(screen.getByText('Let me in!')).toBeInTheDocument()
    })

    test('Testing log in functional', async () => {
        const mockSubmit = jest.fn()

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/login']}>
                    <LoginForm onSubmit={mockSubmit} />
                </MemoryRouter>
            </Provider>
        )

        const usernameInput = screen.getByTestId('username')
        const passwordInput = screen.getByTestId('password')

        await act(async () => {
            fireEvent.input(usernameInput, { target: { value: 'test' } })
            fireEvent.input(passwordInput, { target: { value: '123' } })
            fireEvent.click(screen.getByText('Let me in!'))
        })
        expect(mockSubmit).toHaveBeenCalled()
    })

    test('Break login form by passing empty inputs', async () => {
        const mockSubmit = jest.fn()

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/login']}>
                    <LoginForm onSubmit={mockSubmit} />
                </MemoryRouter>
            </Provider>
        )

        await act(async () => {
            fireEvent.click(screen.getByText('Let me in!'))
        })

        expect(mockSubmit).not.toHaveBeenCalled()
    })
})
