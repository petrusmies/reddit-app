import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchPosts } from "../slices/postsSlice"
import { AppThunkDispatch } from "../app/store"

const Posts = () => {
  // set up dispatch with right type
  const dispatch = useDispatch<AppThunkDispatch>()

  // Get popular posts
  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <div>Posts</div>
  )
}

export default Posts