import authService from './authService';

// Redefine window.location
Object.defineProperty(window, 'location', {
  writable: true,
  value: { href: 'https://localhost/' }
});

beforeEach(() => {
  sessionStorage.clear();
});

afterEach(() => {
  sessionStorage.clear();
});

// Test reddit auth
describe('Reddit auth', () => {
  test('should return null if no code or state', () => {
    window.location.search = '';
    expect(authService.auth()).toBe(null);
  });
  test('should return code if code and state and state equals state in sessionStorage', () => {
    window.location.search = '?code=123&state=abc';
    sessionStorage.setItem('state', 'abc');
    expect(authService.auth()).toEqual({ code: '123' });
  });
  test('should return error if error', () => {
    window.location.search = '?error=123';
    expect(authService.auth()).toEqual({ error: '123' });
  });
});

// Test reddit oauth
describe('Reddit oauth', () => {
  test('should return access_token', async () => {
    // Mock oauth method
    const mockOAuthMethod = jest.fn().mockReturnValue({ access_token: 'dummy_token' });
    const mockOAuth = {
      ...authService,
      oauth: mockOAuthMethod
    }

    // Call the method
    const response = mockOAuth.oauth('123')
  
    // Assert that the mock method was called with the correct argument
    expect(mockOAuthMethod).toHaveBeenCalledWith('123');

    // Assert that the mock method returned the expected value
    expect(response.access_token).toEqual('dummy_token');
  });
});

//Test reddit logout
describe('Reddit logout', () => {
  test('should remove user from sessionStorage', () => {
    authService.logout();
    expect(sessionStorage.getItem('user')).toBe(null);
  });
});

// Test reddit login
describe('Reddit login', () => {
  test('should redirect to reddit authorize', () => {
    authService.login();
    expect(window.location.href).toMatch(/^https:\/\/www.reddit.com\/api\/v1\/authorize/);
  });
});

// Test reddit setToken
describe('Reddit setToken', () => {
  test('should set token to sessionStorage', () => {
    const token = '123';
    authService.setToken(token);
    expect(sessionStorage.getItem('token')).toBe(token);
  });
});