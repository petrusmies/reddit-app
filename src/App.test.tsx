import { render, screen } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from './utils/test-utils';
import { BrowserRouter } from 'react-router-dom';

beforeEach(() => {
  jest.resetAllMocks();
  window.sessionStorage.clear();
});

describe('App', () => {
  test('window.location.pathname is /login if no token in sessionStorage', async () => {
    renderWithProviders(<BrowserRouter><App /></BrowserRouter>);
    expect(window.location.pathname).toBe('/login');
  });

  test('window.location.pathname is / if token in sessionStorage', async () => {
    window.sessionStorage.setItem('token', JSON.stringify({ token: 'dummy_token', expires_at: 9999999999 }));
    renderWithProviders(<BrowserRouter><App /></BrowserRouter>);
    expect(window.location.pathname).toBe('/');
  });

  test('window.location.pathname is /login if token in sessionStorage is expired', async () => {
    window.sessionStorage.setItem('token', JSON.stringify({ token: 'dummy_token', expires_at: 5000 }));
    renderWithProviders(<BrowserRouter><App /></BrowserRouter>);
    expect(window.location.pathname).toBe('/login');
  });
});