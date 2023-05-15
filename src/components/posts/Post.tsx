import { ArrowDownwardOutlined, ArrowUpwardOutlined, ChatBubbleOutline, OpenInNew } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Link, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { fetchComments } from '../../slices/commentsSlice';
import Comments from '../comments/Comments';

type PostProps = {
  id: string;
  author: string;
  title: string;
  body: string;
  media?: any;
  is_video?: boolean;
  url?: string;
  permalink: string;
  score: number;
  num_comments: number;
}

const Post = (props: PostProps) => {
  const { id, author, title, body, media, is_video, url, score, num_comments } = props;
  const dispatch = useAppDispatch();
  const [showComments, setShowComments] = React.useState<boolean>(false);
  // make sure postId exists if not, fake it
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

  const Url = () => {
    // check if url is reddit url
    const external = !url?.includes('reddit.com');
    if (external) {
      // if url is link to image return image or gif
      if (url?.includes('.jpg') || url?.includes('.png') || url?.includes('.gif')) {
        return (
          <img src={url} alt={title} style={{ maxWidth: '100%', width: '100%', border: '4px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px' }} />
        )
      }

      // strip https://www., http:// or www. from url
      const urlText = url?.replace(/(https?:\/\/)?(www\.)?/, '');
      return (
        <Link href={url} target='_blank' rel='noopener noreferrer' sx={{ display: 'flex', alignContent: 'center' }}><OpenInNew fontSize='small' /> {urlText}</Link>
      )
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
        sx={{
          width: '100%',
          maxWidth: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <CardHeader
          title={title}
          subheader={`Posted by u/${author}`}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">{body}</Typography>
          <Box sx={{ my: 2 }}>
            {media ? <Media /> : null}
            {url ? <Url /> : null}
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          }}
        >
          <Button
            data-testid="show-comments-button"
            size='small'
            startIcon={<ChatBubbleOutline />}
            onClick={() => handleClick()}
          >
            {num_comments} comments
          </Button>
          <Box
            data-testid="score"
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ArrowUpwardOutlined fontSize='small' />
            <Typography variant="body2" color="text.secondary">{score}</Typography>
            <ArrowDownwardOutlined fontSize='small' />
          </Box>
        </CardActions>
      </Card>
      <Comments
        showComments={showComments}
        setShowComments={setShowComments}
        id={id}
      />
    </Fragment>
  )
}

export default Post