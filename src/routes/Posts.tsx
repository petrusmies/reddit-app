import { List, Stack } from "@mui/material"
import { Fragment, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { fetchPosts, selectPosts } from "../slices/postsSlice"
import Post from "../components/posts/Post"
import Searchbar from "../components/search/Searchbar"

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const shouldFetchPosts = useRef(true);

  interface Post {
    data: PostData;
  }

  interface PostData {
    id: string;
    title: string;
    selftext: string;
    media?: any;
    is_video?: boolean;
    url?: string;
    permalink: string;
  }


  // Get popular posts
  useEffect(() => {
    if (shouldFetchPosts.current) {
      shouldFetchPosts.current = false;
      dispatch(fetchPosts())
    }
  }, [])

  return (
    <Fragment>
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
            title={post.data.title}
            body={post.data.selftext}
            media={post.data.media}
            is_video={post.data.is_video}
            url={post.data.url}
            permalink={post.data.permalink}
          />
        ))}
      </Stack>
    </Fragment>
  )
}

export default Posts