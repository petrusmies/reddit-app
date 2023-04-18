import { render, waitFor, screen, findByTestId } from '@testing-library/react';
import Posts from './Posts';
import { Provider } from 'react-redux';
import { store } from '../app/store';

const MockState = {
  posts: [
    {
      id: 1,
      title: 'Post 1',
      body: 'Post 1 body',
      userId: 1,
    },
    {
      id: 2,
      title: 'Post 2',
      body: 'Post 2 body',
      userId: 1,
    },
  ]
}

beforeAll(() => {
  // mock redux store
  jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn().mockImplementation(() => ({
      posts: MockState.posts,
    })),
    useDispatch: jest.fn().mockImplementation(() => jest.fn()),
  }));
});

beforeEach(() => {
  // set token in session storage
  sessionStorage.setItem('token', 'dummy_token');
});

afterEach(() => {
  // clear token from session storage
  sessionStorage.clear();
});

describe('Posts', () => {
  test('renders Posts list component', async () => {
    render(<Provider store={store}><Posts /></Provider>);
    const postsList = await screen.findByTestId('posts-list');
    const posts = await screen.findAllByTestId('post');
    await waitFor(() => {
      expect(postsList).toBeInTheDocument();
    })
  })
});