import { useEffect, useState } from 'react';
import { book } from './types/book';

function BookList() {
  const [books, setBooks] = useState<book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}`
      );
      const data = await response.json();

      console.log('API Response:', data);
      console.log('Total Books:', data.totalBooks);

      setBooks(data.books);
      setTotalItems(data.totalBooks);
      setTotalPages(Math.ceil(data.totalBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum]);

  return (
    <>
      <h1>Book List</h1>
      <br />
      {books.map((b) => (
        <div id='bookCard' className='card' key={b.bookID}>
          <h3 className='card-title'>{b.title}</h3>
          <div className='card-body'>
            <ul className='list-unstyled'>
              <li>
                <strong>Author: </strong>
                {b.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {b.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {b.isbn}
              </li>
              <li>
                <strong>Classification/Category: </strong>
                {b.classification}/{b.category}
              </li>
              <li>
                <strong>Number of Pages: </strong>
                {b.pageCount}
              </li>
              <li>
                <strong>Price: $</strong>
                {b.price}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <div className='d-flex justify-content-center mt-4'>
        <button
          className='btn btn-outline-primary me-2'
          disabled={pageNum === 1}
          onClick={() => setPageNum(Math.max(1, pageNum - 1))}
        >
          Previous
        </button>

        {Array.from({ length: Math.max(1, totalPages) }, (_, i) => (
          <button
            key={i + 1}
            className={`btn ${pageNum === i + 1 ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
            onClick={() => setPageNum(i + 1)}
            disabled={pageNum === i + 1}
          >
            {i + 1}
          </button>
        ))}

        <button
          className='btn btn-outline-primary ms-2'
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(Math.min(totalPages, pageNum + 1))}
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
            setPageSize(Number(s.target.value));
            setPageNum(1);
          }}
        >
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='20'>20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
