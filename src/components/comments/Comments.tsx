import { Box, Modal, Typography } from '@mui/material'
import React from 'react'

interface CommentsProps {
  showComments: boolean;
  title: string;
  body: string;
}

const Comments = (props: CommentsProps) => {
  const { showComments, title, body } = props;

  return (
    <Modal
      data-testid="comments"
      open={showComments}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: 400, bgcolor: 'background.paper', padding: 2 }}>
        <Typography id="modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        {body ?
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {body}
          </Typography>
          : null}
      </Box>
    </Modal>
  )
}

export default Comments