import { Box, Modal, Typography } from '@mui/material'
import React from 'react'

const Comments = () => {
  return (
    <Modal
      data-testid="comments"
      open={true}
    >
      <Box sx={{ width: 400, height: 400, bgcolor: 'background.paper' }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
      </Box>
    </Modal>
  )
}

export default Comments