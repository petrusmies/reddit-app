import { Search } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, FormControl, Input, InputAdornment, OutlinedInput } from '@mui/material';
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchSearchResults, selectSearchPosts } from '../../slices/searchSlice';

interface SearchModalProps {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
}

const SearchModal = (props: SearchModalProps) => {
  const { modalOpen, setModalOpen } = props;
  const dispatch = useAppDispatch()
  const [search, setSearch] = React.useState<string>('')
  const [searchTimeout, setSearchTimeout] = React.useState<any>(null)
  const posts = useAppSelector(selectSearchPosts)

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
    >
      <DialogTitle>Search</DialogTitle>
      <DialogContent>
        <FormControl
          variant='outlined'
          fullWidth
        >
          <OutlinedInput
            id='search'
            data-testid='search'
            fullWidth
            placeholder='Search...'
            aria-label='Search'
            startAdornment={<InputAdornment position='start'><Search /></InputAdornment>}
            onChange={handleSearch}
          />
        </FormControl>
      </DialogContent>
    </Dialog >
  )
}

export default SearchModal