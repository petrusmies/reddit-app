import React from 'react'

interface SearchResultsProps {
  posts: any[];
}

const SearchResults = (props: SearchResultsProps) => {
  const { posts } = props;

  return (
    <div data-testid='search-results'>SearchResults</div>
  )
}

export default SearchResults