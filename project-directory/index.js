const axios = require('axios');

// Base URL of the API
const BASE_URL = 'http://example.com/api'; // replace with actual base URL

// Task 10: Get all books using async callback function
async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    return response.data;
  } catch (error) {
    console.error('Error getting all books:', error);
  }
}

// Task 11: Search by ISBN using Promises
function getBookByISBN(isbn) {
  return axios.get(`${BASE_URL}/books/isbn/${isbn}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error getting book with ISBN ${isbn}:`, error);
    });
}

// Task 12: Search by Author
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/books/author/${author}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting books by author ${author}:`, error);
  }
}

// Task 13: Search by Title
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`${BASE_URL}/books/title/${title}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting books by title ${title}:`, error);
  }
}

// Test the functions
async function testFunctions() {
  console.log('Getting all books:');
  const allBooks = await getAllBooks();
  console.log(allBooks);

  console.log('Getting book by ISBN:');
  const bookByISBN = await getBookByISBN('1234567890'); // replace with actual ISBN
  console.log(bookByISBN);

  console.log('Getting books by author:');
  const booksByAuthor = await getBooksByAuthor('Author Name'); // replace with actual author
  console.log(booksByAuthor);

  console.log('Getting books by title:');
  const booksByTitle = await getBooksByTitle('Book Title'); // replace with actual title
  console.log(booksByTitle);
}

testFunctions();
