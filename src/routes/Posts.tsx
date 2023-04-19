import { List } from "@mui/material"
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
  }


  // Get popular posts
  useEffect(() => {
    if (shouldFetchPosts.current) {
      shouldFetchPosts.current = false;
      dispatch(fetchPosts())
    }
  }, [])

  return (
    <List data-testid="posts-list">
      {posts.map((post: Post) => (
        <Post
          key={post.data.id}
          id={post.data.id}
          title={post.data.title}
          body={post.data.selftext}
        />
      ))}
    </List>
  )
}

export default Posts