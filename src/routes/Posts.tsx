import { List, Stack } from "@mui/material"
import { useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { fetchPosts, selectPosts } from "../slices/postsSlice"
import Post from "../components/posts/Post"

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const shouldFetchPosts = useRef(true);

  interface Post {
    data: PostData;
  }

  interface PostData {
    id: string | undefined;
    title: string;
    selftext: string;
    media?: any;
    is_video?: boolean;
  }


  // Get popular posts
  useEffect(() => {
    if (shouldFetchPosts.current) {
      shouldFetchPosts.current = false;
      dispatch(fetchPosts())
    }
  }, [])

  return (
    <Stack
      data-testid="posts-list"
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
      sx={{ maxWidth: '600px', margin: '0 auto'}}
    >
      {posts.map((post: Post) => (
        <Post
          key={post.data.id}
          id={post.data.id}
          title={post.data.title}
          body={post.data.selftext}
          media={post.data.media}
          is_video={post.data.is_video}
        />
      ))}
    </Stack>
  )
}

export default Posts