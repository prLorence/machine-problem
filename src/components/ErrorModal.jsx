import React from 'react'
import { Modal, Box } from '@mui/material'

function ErrorModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = ({props}) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </Box>
      </Modal>
  )
}

export default ErrorModal