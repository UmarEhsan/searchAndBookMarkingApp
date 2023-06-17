import React from 'react';
import { Card, CardContent, Typography, ToggleButton, Box } from '@mui/material';
import { Bookmark } from '@mui/icons-material';
import { Repository, useAppContext } from '../context/AppContext';

interface SearchResultProps {
  repository: Repository;
}

/**
 * SearchResult component.
 * Renders a single repository search result.
 *
 * @param {SearchResultProps} props - The component props.
 * @returns {JSX.Element} - The rendered component.
 */
const SearchResult: React.FC<SearchResultProps> = ({ repository }) => {
  const { bookmarks, addBookmark, removeBookmark } = useAppContext();

  /**
   * Handles the bookmark button click event.
   * Adds or removes the repository from bookmarks.
   */
  const handleBookmarkClick = () => {
    if (isBookmarked) {
      removeBookmark(repository);
    } else {
      addBookmark(repository);
    }
  };

  // Check if the repository is already bookmarked
  const isBookmarked = bookmarks.some((bookmark) => bookmark.id === repository.id);

  return (
    <Card sx={{ marginBottom: 2, display: 'flex', flexDirection: 'column' }} style={{ width: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ marginBottom: 1, overflowWrap: 'break-word' }} style={{ width: '80%' }}>
            {repository.name}
          </Typography>
          <ToggleButton
            value="bookmark"
            selected={isBookmarked}
            onChange={handleBookmarkClick}
            sx={{
              backgroundColor: isBookmarked ? '#FFD700' : '#FFFFFF',
              color: isBookmarked ? '#000000' : '#000000',
              transition: 'background-color 0.3s, color 0.3s',
              '&:hover': {
                backgroundColor: '#FFD700',
                color: '#000000',
              },
            }}
          >
            <Bookmark />
          </ToggleButton>
        </Box>
        <Typography variant="subtitle1" component="div" sx={{ marginBottom: 1 }}>
          Owner: {repository.owner}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
          {repository.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
          Stars: {repository.stars}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SearchResult;
