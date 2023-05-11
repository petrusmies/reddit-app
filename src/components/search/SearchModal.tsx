import { Search } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, FormControl, InputAdornment, OutlinedInput, styled } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchSearchResults, selectSearchPosts } from '../../slices/searchSlice';
import SearchResults from './SearchResults';

interface SearchModalProps {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
}

const StyledInput = styled(OutlinedInput)(({ theme }) => ({
  // background color
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  '&:focus': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  '&:active': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  // text color
  '& .MuiOutlinedInput-input': {
    color: 'rgba(0, 0, 0, 0.8)',
  },
}))

const SearchModal = (props: SearchModalProps) => {
  const { modalOpen, setModalOpen } = props;
  const dispatch = useAppDispatch()
  const [search, setSearch] = React.useState<string>('')
  const [searchTimeout, setSearchTimeout] = React.useState<any>(null)
  const posts = useAppSelector(selectSearchPosts)
  const ref = React.useRef<HTMLInputElement>(null)

  // handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)

    clearTimeout(searchTimeout)

    const newSearchTimeout = setTimeout((searchValue) => {
      dispatch(fetchSearchResults(searchValue))
    }, 1000, e.target.value)

    setSearchTimeout(newSearchTimeout)
  }

  return (
    <Dialog
      data-testid='search-modal'
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      fullWidth
      maxWidth='sm'
      onTransitionEnd={() => {
        if (modalOpen && !search.length) {
          ref.current?.focus()
        }
      }}
      PaperProps={{ sx: { position: 'fixed', top: 0 } }}
    >
      <DialogTitle>Search</DialogTitle>
      <DialogContent>
        <FormControl
          variant='outlined'
          fullWidth
        >
          <StyledInput
            id='search'
            data-testid='search-input'
            inputRef={ref}
            fullWidth
            autoFocus={true}
            placeholder='Search...'
            aria-label='Search'
            startAdornment={<InputAdornment position='start'><Search /></InputAdornment>}
            onChange={handleSearch}
          />
        </FormControl>
        {posts.length > 0 ? <SearchResults posts={posts} /> : null}
      </DialogContent>
    </Dialog >
  )
}

export default SearchModal