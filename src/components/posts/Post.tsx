import { Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react'

type PostProps = {
  id: string | undefined;
  title: string;
  body: string;
}

const Post = (props: PostProps) => {
  const { id, title, body } = props;
  const postId = typeof id === 'string' ? id : Math.random().toString(36).substring(7);
  return (
    <Card
      data-testid="post"
      id={postId}
    >
      <CardContent>
        <Typography variant="h5" component="div">{title}</Typography>
        <Typography variant="body2" color="text.secondary">{body}</Typography>
      </CardContent>
      <CardActions>
        <button data-testid="show-comments-button">Show comments</button>
      </CardActions>
    </Card>
  )
}

export default Post