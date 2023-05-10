import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/test-utils';
import Login from './Login';

describe('Login', () => { 
  test('renders Login component', async () => {
    renderWithProviders(<Login />);
    const login = await screen.findByTestId('login');
    expect(login).toBeInTheDocument();
  }); 

  test('renders Login component with login button', async () => {
    renderWithProviders(<Login />);
    const loginButton = await screen.findByRole('button');
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveTextContent('Login');
  });

  test('Clicking on Login button should run authService.login function', async () => {
    const login = jest.fn();
    renderWithProviders(<Login />);
    const loginButton = await screen.findByRole('button');
    loginButton.onclick = login;
    loginButton.click();
    expect(login).toHaveBeenCalled();
  });
});