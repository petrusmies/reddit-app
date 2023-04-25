import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectComments } from '../../slices/commentsSlice';
import Comment from './Comment';

interface CommentsProps {
  showComments: boolean;
  setShowComments: (showComments: boolean) => void;
  id: string;
}


const Comments = (props: CommentsProps) => {
  const { showComments, setShowComments, id } = props;
  const comments: any = useAppSelector(selectComments)
  const title = comments[id] != null ? comments[id][0].data.children[0].data.title : undefined;
  const body = comments[id] != null ? comments[id][0].data.children[0].data.selftext : undefined;

  console.log(comments[id] != null)

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
      <DialogTitle>{title != null ? title : null}</DialogTitle>
      <DialogContent>
        {body != null ? <DialogContentText>{body}</DialogContentText> : null}
        {comments[id] != null ? comments[id][1].data.children.map((comment: any) => (
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