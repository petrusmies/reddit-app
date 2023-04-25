import React from 'react';
import { renderWithProviders } from '../../utils/test-utils';
import { screen } from '@testing-library/react';
import SearchResults from './SearchResults';

const MockState = {
  posts: [
    {
      data: {
        id: 1,
        title: "Post 1",
        selftext: "Post 1 body",
        author: "author1",
      },
    },
    {
      data: {
        id: 2,
        title: "Post 2",
        selftext: "Post 2 body",
        author: "author2",
      },
    },
  ],
  loading: false,
};

describe('SearchResults', () => {
  test('renders SearchResults component if posts length is more than 0', () => {
    renderWithProviders(<SearchResults posts={MockState.posts} />);
    const searchResults = screen.getByTestId('search-results');
    expect(searchResults).toBeInTheDocument();
  });


});