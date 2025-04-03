import { useEffect, useState } from 'react';
import { Book } from '../types/book';
import { useNavigate } from 'react-router-dom';
import BookModal from './BookModal'; // Import the modal

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); // State for selected book
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
        .join('&');

      const response = await fetch(
        `https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();

      setBooks(data.books);
      setTotalPages(Math.ceil(data.totalBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, selectedCategories]);

  const sortedBooks = books.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  const openModal = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <>
      <h1>Book List</h1>
      <br />
      {/* Sort Button */}
      <button
        className='btn btn-outline-secondary'
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      >
        Sort by Title ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>

      {sortedBooks.map((b) => (
        <div id='bookCard' className='card' key={b.bookID}>
          <h3 className='card-title'>{b.title}</h3>
          <div className='card-body'>
            <ul className='list-unstyled'>
              <li>
                <strong>Author: </strong>
                {b.author}
              </li>
              <li>
                <strong>Price: $</strong>
                {b.price}
              </li>
            </ul>

            <button
              className='btn btn-success'
              onClick={() =>
                navigate(`/addBook/${b.title}/${b.bookID}/${b.price}`)
              }
            >
              Checkout Book
            </button>
            <button
              className='btn btn-info ms-2'
              onClick={() => openModal(b)} // Open modal with the selected book
            >
              View Details
            </button>
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

      {/* Modal Component */}
      <BookModal onClose={closeModal} book={selectedBook!} />
    </>
  );
}

export default BookList;
