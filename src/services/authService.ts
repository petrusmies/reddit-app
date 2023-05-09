import axios from "axios";

interface IAuth {
  login: () => void;
  logout: () => void;
  auth: () => { code: string } | { error: string } | null;
  oauth: (code: string) => Promise<any>;
  setToken: (token: IToken) => void;
}

interface IToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  expires_at: number;
}

const authService: IAuth = {
  login: () => {
    const RANDOM_STRING = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('state', RANDOM_STRING);
    const { REACT_APP_CLIENT_ID, REACT_APP_REDIRECT_URI, REACT_APP_RESPONSE_TYPE, REACT_APP_DURATION, REACT_APP_SCOPE } = process.env;
    window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=${REACT_APP_RESPONSE_TYPE}&state=${RANDOM_STRING}&redirect_uri=${REACT_APP_REDIRECT_URI}&duration=${REACT_APP_DURATION}&scope=${REACT_APP_SCOPE}`
  },
  // Remove access token from session storage
  logout: () => {
    sessionStorage.removeItem('token');
  },
  // Get auth code from reddit
  auth: () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    const error = params.get('error');
    if (code && state && state === sessionStorage.getItem('state')) {
      return { code };
    } else if (error) {
      return { error };
    } else {
      return null;
    }
  },
  // Get access token from reddit
  oauth: async (code: string) => {
    const { REACT_APP_REDIRECT_URI, REACT_APP_CLIENT_ID, REACT_APP_SECRET } = process.env;
    const clientId = REACT_APP_CLIENT_ID ?? '';
    const clientSecret = REACT_APP_SECRET ?? '';
    const credentials = `${clientId}:${clientSecret}`;
    const encodedCredentials = window.btoa(credentials);

    const response = await axios.post('https://www.reddit.com/api/v1/access_token', null, {
      params: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REACT_APP_REDIRECT_URI
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encodedCredentials}`
      }
    }
    )

    return response.data;
  },
  // Set access token to session storage
  setToken: (token: IToken) => {
    if (!token) {
      throw new Error('Token is required');
    }

    const tokenObject = {
      ...token,
      expires_at: token.expires_in + Math.floor(Date.now() / 1000)
    }

    const tokenString = JSON.stringify(tokenObject);

    sessionStorage.setItem('token', tokenString);
  }
}

export default authService;