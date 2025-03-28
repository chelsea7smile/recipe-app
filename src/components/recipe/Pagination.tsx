import ReactPaginate from 'react-paginate';
import { Loader2 } from 'lucide-react';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
  isLoading?: boolean;
}

export function Pagination({
  pageCount,
  currentPage,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  return (
    <div className="mt-8 mb-16">
      <div className="relative">
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={({ selected }) => onPageChange(selected)}
          forcePage={currentPage}
          containerClassName="flex justify-center items-center gap-2"
          pageClassName="w-10 h-10 flex items-center justify-center rounded-full text-base font-medium transition-all duration-200 cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80"
          activeClassName="bg-primary text-primary-foreground shadow-md scale-105"
          previousClassName="w-10 h-10 flex items-center justify-center rounded-full text-base font-medium transition-all duration-200 cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80"
          nextClassName="w-10 h-10 flex items-center justify-center rounded-full text-base font-medium transition-all duration-200 cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80"
          disabledClassName="opacity-50 cursor-not-allowed"
          breakLabel="..."
          previousLabel="←"
          nextLabel="→"
          renderOnZeroPageCount={null}
          hrefBuilder={(pageIndex) => `#page-${pageIndex + 1}`}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}
