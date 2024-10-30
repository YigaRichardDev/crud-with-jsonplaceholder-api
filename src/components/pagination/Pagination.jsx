import React from 'react';

const Pagination = ({ currentPage, onPageChange, totalPages }) => {
  // Handles the click event for the "Previous" button
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Handles the click event for the "Next" button
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className='my-3'>
      <button className='btn btn-sm btn-secondary' onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      <span className='mx-3'>Page {currentPage} of {totalPages}</span>
      <button className='btn btn-sm btn-secondary' onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
