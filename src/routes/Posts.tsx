import { Fragment, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts, selectPosts } from "../slices/postsSlice"
import { AppThunkDispatch } from "../app/store"

const Posts = () => {
  const dispatch = useDispatch<AppThunkDispatch>()
  const posts = useSelector(selectPosts)
  const shouldFetchPosts = useRef(true);

  interface Post {
    data: PostData;
  }

  interface PostData {
    id: number;
    title: string;
    body: string;
    userId: number;
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
      {posts.map((post: Post) => (
        <div key={post.data.id}>
          <h3>{post.data.title}</h3>
          <p>{post.data.body}</p>
        </div>
      ))}
    </Fragment>
  )
}

export default Posts