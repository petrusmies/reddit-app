import { Box, Button, Dialog, DialogTitle, FormControl, Input, InputAdornment, InputLabel, OutlinedInput, TextField, Toolbar } from '@mui/material'
import { Search } from '@mui/icons-material'
import React, { Fragment } from 'react'
import { styled } from '@mui/material/styles'
import SearchModal from './SearchModal'

// styled button made to look like search field
const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  color: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'flex-start',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    color: 'rgba(0, 0, 0, 0.5)',
  },
}))

const Searchbar = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false)

  return (
    <Fragment>
    <Box data-testid='searchbar'>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '600px',
          margin: '0 auto',
          pt: 2,
          pb: 2
        }}
      >
        <SearchButton
          data-testid='search-button'
          variant='contained'
          startIcon={<Search />}
          fullWidth
          onClick={() => setModalOpen(true)}
        >
          Search...
        </SearchButton>
      </Toolbar>
    </Box>
    <SearchModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </Fragment>
  )
}

export default Searchbar