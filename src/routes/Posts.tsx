import { Stack, ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material"
import { Fragment, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import Post from "../components/posts/Post"
import Searchbar from "../components/search/Searchbar"
import { fetchPosts, selectPosts } from "../slices/postsSlice"
import customTheme from "../styles/theme"

const Posts = () => {
  let theme = customTheme
  theme = responsiveFontSizes(theme)
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const shouldFetchPosts = useRef(true);

  interface Post {
    data: PostData;
  }

  interface PostData {
    id: string;
    author: string;
    title: string;
    selftext: string;
    media?: any;
    is_video?: boolean;
    url?: string;
    permalink: string;
    score: number;
    num_comments: number;
  }


  // Get popular posts
  useEffect(() => {
    if (shouldFetchPosts.current) {
      shouldFetchPosts.current = false;
      dispatch(fetchPosts())
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Searchbar />
      <Stack
        data-testid="posts-list"
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{ maxWidth: '600px', margin: '0 auto' }}
      >
        {posts.map((post: Post) => (
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
        ))}
      </Stack>
    </ThemeProvider>
  )
}

export default Posts