import { Button, Collapse, Divider, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

interface CommentProps {
  author: string;
  body: string;
  ups: number;
  downs: number;
  replies?: any;
}

const Upvotes = styled(Typography)(({ theme }) => ({
  color: theme.palette.success.main
}))

const Downvotes = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main
}))


const Comment = (props: CommentProps) => {
  const { author, body, ups, downs, replies } = props;
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
        <Button size='small' onClick={() => setOpen(!open)} sx={{ marginLeft: 'auto' }}>
          {open ? 'Hide' : 'Show'} comment
        </Button>
      </Stack>
      <Collapse in={open}>
        <Typography sx={{ mt: 2 }}>
          {body}
        </Typography>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Stack direction='row' alignItems='center' justifyContent='flex-end'>
          <Upvotes variant='caption'>
            upvotes: {ups}
          </Upvotes>
          <Downvotes variant='caption' sx={{ ml: 2 }}>
            downvotes: {downs}
          </Downvotes>
          <Typography variant='caption' sx={{ ml: 2 }}>
            {replies ? replies.data.children.length : 0} replies
          </Typography>
        </Stack>
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