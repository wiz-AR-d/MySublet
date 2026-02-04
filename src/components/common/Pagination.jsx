import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Number of page buttons to show
    
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };
  
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-colors ${
          currentPage === 1
            ? 'border-gray-200 text-gray-400 cursor-not-allowed'
            : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
        }`}
        data-testid="pagination-prev"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {/* First page */}
      {getPageNumbers()[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
            data-testid="pagination-page-1"
          >
            1
          </button>
          {getPageNumbers()[0] > 2 && (
            <span className="text-gray-400">…</span>
          )}
        </>
      )}
      
      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-colors ${
            currentPage === page
              ? 'border-orange-500 bg-orange-500 text-white'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
          }`}
          data-testid={`pagination-page-${page}`}
        >
          {page}
        </button>
      ))}
      
      {/* Last page */}
      {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
        <>
          {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
            <span className="text-gray-400">…</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
            data-testid={`pagination-page-${totalPages}`}
          >
            {totalPages}
          </button>
        </>
      )}
      
      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-colors ${
          currentPage === totalPages
            ? 'border-gray-200 text-gray-400 cursor-not-allowed'
            : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
        }`}
        data-testid="pagination-next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      
      {/* Page Info */}
      <div className="ml-4 text-sm text-gray-600">
        Page <span className="font-medium">{currentPage}</span> of{' '}
        <span className="font-medium">{totalPages}</span>
      </div>
    </div>
  );
}