interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  return (
    <div className='flex item-center justify-center mt-4'>
      <div className='d-flex justify-content-center mt-4'>
        <button
          className='btn btn-outline-primary me-2'
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        >
          Previous
        </button>

        {Array.from({ length: Math.max(1, totalPages) }, (_, i) => (
          <button
            key={i + 1}
            className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
            onClick={() => onPageChange(i + 1)}
            disabled={currentPage === i + 1}
          >
            {i + 1}
          </button>
        ))}

        <button
          className='btn btn-outline-primary ms-2'
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        >
          Next
        </button>
      </div>

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(s) => {
            onPageSizeChange(Number(s.target.value));
            onPageChange(1);
          }}
        >
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='20'>20</option>
        </select>
      </label>
    </div>
  );
};

export default Pagination;
