import { useEffect, useState } from 'react';
import { Book } from '../types/book';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from '../components/Pagination';

const AdminBooksPage = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks(pageSize, pageNum, []);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalBooks / pageSize));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className='text-red-500'>Error: {error}</p>;

  return (
    <div>
      <h1>Admin - Books</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification/Category</th>
            <th>Number of Pages</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.bookID}>
              <td>{b.bookID}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.isbn}</td>
              <td>
                {b.classification}/{b.category}
              </td>
              <td>{b.pageCount}</td>
              <td>${b.price}</td>
              <td>
                <button onClick={() => console.log(`Edit book ${b.bookID}`)}>
                  Edit
                </button>
              </td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </div>
  );
};

export default AdminBooksPage;
