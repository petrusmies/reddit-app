import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Paper, Stack, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { useAppSelector } from '../../app/hooks';
import { selectComments } from '../../slices/commentsSlice';
import Comment from './Comment';

interface CommentsProps {
  showComments: boolean;
  setShowComments: (showComments: boolean) => void;
  title: string;
  body: string;
}


const Comments = (props: CommentsProps) => {
  const { showComments, setShowComments, title, body } = props;
  const comments: any[] = useAppSelector(selectComments)

  const handleClose = () => {
    setShowComments(false);
  }

  return (
    <Dialog
      data-testid="comments"
      open={showComments}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      fullWidth
      maxWidth='sm'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {body ? <DialogContentText>{body}</DialogContentText> : null}
        {comments.length > 1 ? comments[1].data.children.map((comment: any) => (
          <Comment
            key={comment.data.id}
            author={comment.data.author}
            body={comment.data.body}
            ups={comment.data.ups}
            downs={comment.data.downs}
            replies={comment.data.replies}
          />
        ))
          : null
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Comments