import { Button, Collapse, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

interface CommentProps {
  author: string;
  body: string;
  ups: number;
  downs: number;
  replies?: any;
}

const Comment = (props: CommentProps) => {
  const { author, body, ups, replies } = props;
  const [open, setOpen] = React.useState<boolean>(true);

  return (
    <Paper
      data-testid='comment'
      sx={{ p: 2, mt: 2 }}
    >
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant='caption' sx={{ mt: 2 }}>
          {author}
        </Typography>
        <Button onClick={() => setOpen(!open)} sx={{ marginLeft: 'auto' }}>
          {open ? 'Hide' : 'Show'} comment
        </Button>
      </Stack>
      <Collapse in={open}>
        <Typography sx={{ mt: 2 }}>
          {body}
        </Typography>
        <Typography variant='caption' sx={{ mt: 2 }}>
          upvotes: {ups}
        </Typography>
        {replies ? replies.data.children.map((reply: any) => (
          <Comment
            key={reply.data.id}
            author={reply.data.author}
            body={reply.data.body}
            ups={reply.data.ups}
            downs={reply.data.downs}
            replies={reply.data.replies}
          />
        )) : null}
      </Collapse>
    </Paper>
  )
}

export default Comment