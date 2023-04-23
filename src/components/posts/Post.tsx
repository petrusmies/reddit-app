import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { fetchComments } from '../../slices/commentsSlice';
import Comments from '../comments/Comments';

type PostProps = {
  id: string | undefined;
  title: string;
  body: string;
  media?: any;
  is_video?: boolean;
}

const Post = (props: PostProps) => {
  const { id, title, body, media, is_video } = props;
  const dispatch = useAppDispatch();
  const [showComments, setShowComments] = React.useState<boolean>(false);
  const postId = typeof id === 'string' ? id : Math.random().toString(36).substring(7);

  const Media = () => {
    // if media is a video return video else return image
    if (media) {
      if (is_video) {
        return (
          <video
            src={media.reddit_video.fallback_url}
            controls
            autoPlay
            loop
            style={{ maxWidth: '100%', maxHeight: '500px' }}
          />
        )
      } else {
        return (
          <img
            src={media.oembed.thumbnail_url}
            alt={title}
          />
        )
      }
    } else {
      return null;
    }
  }


  const handleClick = () => {
    setShowComments(!showComments);
    if (typeof id === 'string') {
      dispatch(fetchComments(id));
    }
  }

  return (
    <Fragment>
      <Card
        data-testid="post"
        id={postId}
        sx={{ width: '100%', maxWidth: '100%' }}
      >
        <CardContent>
          <Typography variant="h5" component="div">{title}</Typography>
          <Typography variant="body2" color="text.secondary">{body}</Typography>
          <Box sx={{ my: 2 }}>
            {media ? <Media /> : null}
          </Box>
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
        setShowComments={setShowComments}
        title={title}
        body={body}
      />
    </Fragment>
  )
}

export default Post