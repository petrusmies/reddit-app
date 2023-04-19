import { cleanup, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../utils/test-utils';
import Posts from './Posts';

const MockState = {
  posts: [
    {
      data: {
        id: 1,
        title: 'Post 1',
        body: 'Post 1 body',
        userId: 1,
      }
    },
    {
      data: {
        id: 2,
        title: 'Post 2',
        body: 'Post 2 body',
        userId: 1,
      }
    },
  ],
  loading: false,
}

describe('Posts', () => {
  beforeEach(() => {
    // set token in session storage
    sessionStorage.setItem('token', 'dummy_token');
  });

  afterEach(() => {
    // clear token from session storage
    sessionStorage.clear();
  });

  afterAll(() => {
    // clear all mocks
    jest.clearAllMocks();
    cleanup();
  });

  test('renders Posts list component', async () => {
    renderWithProviders(<Posts />);
    const postsList = await screen.findByTestId('posts-list');

    await waitFor(() => {
      expect(postsList).toBeInTheDocument();
    })
  });

  test('renders Posts list component with posts', async () => {
    renderWithProviders(<Posts />, {
      preloadedState: { posts: MockState },
    });

    const posts = await screen.findAllByTestId('post');
    await waitFor(() => {
      expect(posts).toHaveLength(2);
    })
  });
});