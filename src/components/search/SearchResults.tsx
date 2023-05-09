import React, { Fragment } from 'react'
import Post from '../posts/Post'
import { Divider, Stack, Typography, styled } from '@mui/material';

interface SearchResultsProps {
  posts: any[];
}

const StyledDivider = styled(Divider)(({ theme }) => ({
  '&:after': {
    borderTopColor: `rgba(255, 255, 255, 0.5)`
  },
  '&:before': {
    borderTopColor: `rgba(255, 255, 255, 0.5)`
  }
}))

const SearchResults = (props: SearchResultsProps) => {
  const { posts } = props;

  return (
    <Stack>
      <StyledDivider sx={{ mt: 2, }}>
        <Typography data-testid='search-results' variant='h5' sx={{ mt: 2, mb: 2 }}>
          Search Results
        </Typography>
      </StyledDivider>
      {
        posts.map((post: any) => (
          <Post
            key={post.data.id}
            id={post.data.id}
            author={post.data.author}
            title={post.data.title}
            body={post.data.selftext}
            media={post.data.media}
            is_video={post.data.is_video}
            url={post.data.url}
            permalink={post.data.permalink}
            score={post.data.score}
            num_comments={post.data.num_comments}
          />
        ))
      }
    </Stack >
  )
}

export default SearchResults