import { Book } from '../types/book';

interface FetchBooksResponse {
  books: Book[];
  totalBooks: number;
}

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
      .join('&');

    const response = await fetch(
      `https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};
