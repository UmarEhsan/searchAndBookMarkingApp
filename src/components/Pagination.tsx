import React from 'react';
import { Box, Button } from '@mui/material';

/**
 * Pagination component.
 * 
 * @param {number} currentPage - The current page number.
 * @param {number} totalPages - The total number of pages.
 * @param {function} onPageChange - The function to handle page change.
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const handlePreviousClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
      <Button
        disabled={isPreviousDisabled}
        onClick={handlePreviousClick}
        sx={{ marginRight: 1 }}
      >
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'contained' : 'outlined'}
          onClick={() => handlePageClick(page)}
          sx={{ marginRight: 1 }}
        >
          {page}
        </Button>
      ))}
      <Button
        disabled={isNextDisabled}
        onClick={handleNextClick}
        sx={{ marginRight: 1 }}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
