const axios = require('axios');

// Replace with your actual API endpoint
const API_URL = 'https://openlibrary.org/subjects/fiction.json?limit=10';

async function getBookList() {
  try {
    const response = await axios.get(API_URL);
    console.log('Book List:', response.data);
  } catch (error) {
    console.error('Error fetching the book list:', error);
  }
}

getBookList();
