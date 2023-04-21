import { Card, CardActions, CardContent, Typography, Button } from '@mui/material';
import React, { Fragment, useState } from 'react'
import Comments from '../comments/Comments';
import { fetchComments } from '../../slices/postsSlice';
import { useAppDispatch } from '../../app/hooks';

type PostProps = {
  id: string | undefined;
  title: string;
  body: string;
}

const Post = (props: PostProps) => {
  const { id, title, body } = props;
  const dispatch = useAppDispatch();
  const [showComments, setShowComments] = React.useState<boolean>(false);
  const postId = typeof id === 'string' ? id : Math.random().toString(36).substring(7);

  const handleClick = () => {
    setShowComments(!showComments);
    if(typeof id === 'string') {
      dispatch(fetchComments(id));
    }
  }
  return (
    <Fragment>
      <Card
        data-testid="post"
        id={postId}
      >
        <CardContent>
          <Typography variant="h5" component="div">{title}</Typography>
          <Typography variant="body2" color="text.secondary">{body}</Typography>
        </CardContent>
        <CardActions>
          <Button
            data-testid="show-comments-button"
            variant='contained'
            onClick={() => handleClick()}
          >Show comments</Button>
        </CardActions>
      </Card>
      <Comments
        showComments={showComments}
        title={title}
        body={body}
      />
    </Fragment>
  )
}

export default Post