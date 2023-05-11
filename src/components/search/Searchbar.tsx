import { Logout, Search } from '@mui/icons-material'
import { Avatar, Box, Button, IconButton, Toolbar } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { Fragment } from 'react'
import SearchModal from './SearchModal'

// styled button made to look like search field
const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  color: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(8px)',
  justifyContent: 'flex-start',
  maxWidth: '600px',
  width: '100%',
  gridColumn: 'center',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    color: 'rgba(0, 0, 0, 0.5)',
  },
}))

const LogoutButton = styled(IconButton)(({ theme }) => ({
  gridColumn: 'right',
  '& .MuiAvatar-root': {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    transition: 'background-color 0.2s ease-in-out',
    color: 'rgba(255, 255, 255, 1)',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      color: 'rgba(0, 0, 0, 0.9)',
    }
  }
}))

const Searchbar = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false)

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <Fragment>
      <Box data-testid='searchbar'>
        <Toolbar
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '[center] minmax(200px , 600px) [right] minmax(60px , auto)',
              sm: '[left] minmax(60px , auto) [center] minmax(200px , 600px) [right] minmax(60px , auto)'
            },
            justifyContent: 'space-between ',
            gridGap: '16px',
            py: 4
          }}
        >
          <SearchButton
            data-testid='search-button'
            variant='contained'
            startIcon={<Search />}
            fullWidth
            onClick={() => setModalOpen(true)}
            aria-label='search'
          >
            Search...
          </SearchButton>
          <LogoutButton
            data-testid='logout-button'
            onClick={() => handleLogout()}
            aria-label='logout'
          >
            <Avatar>
              <Logout fontSize='medium' />
            </Avatar>
          </LogoutButton>
        </Toolbar>
      </Box>
      <SearchModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </Fragment>
  )
}

export default Searchbar