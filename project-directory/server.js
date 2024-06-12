const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001; // Ensure this is not conflicting with any other process
const API_BASE_URL = 'https://openlibrary.org';

// Use body-parser to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html at the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// In-memory storage for reviews (for simplicity)
const reviews = {};

// Endpoint to register a new user
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  users.push({ username, password });
  res.status(201).json({ message: 'User registered successfully' });
});

// Endpoint to login a user
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

// Endpoint to get all books
app.get('/api/books', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subjects/fiction.json?limit=10`);
    res.json(response.data.works);
  } catch (error) {
    console.error('Error fetching the book list:', error);
    res.status(500).send('Error fetching the book list');
  }
});

// Endpoint to get book by ISBN
app.get('/api/books/isbn/:isbn', async (req, res) => {
  const { isbn } = req.params;
  try {
    const response = await axios.get(`${API_BASE_URL}/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
    res.json(response.data[`ISBN:${isbn}`]);
  } catch (error) {
    console.error(`Error fetching book with ISBN ${isbn}:`, error);
    res.status(500).send(`Error fetching book with ISBN ${isbn}`);
  }
});

// Endpoint to get books by author
app.get('/api/books/author/:author', async (req, res) => {
  const { author } = req.params;
  try {
    const response = await axios.get(`${API_BASE_URL}/search.json?author=${author}`);
    res.json(response.data.docs);
  } catch (error) {
    console.error(`Error fetching books by author ${author}:`, error);
    res.status(500).send(`Error fetching books by author ${author}`);
  }
});

// Endpoint to get books by title
app.get('/api/books/title/:title', async (req, res) => {
  const { title } = req.params;
  try {
    const response = await axios.get(`${API_BASE_URL}/search.json?title=${title}`);
    res.json(response.data.docs);
  } catch (error) {
    console.error(`Error fetching books by title ${title}:`, error);
    res.status(500).send(`Error fetching books by title ${title}`);
  }
});

// Endpoint to get book review
app.get('/api/books/review/:isbn', async (req, res) => {
  const { isbn } = req.params;
  try {
    const review = reviews[isbn] || "No reviews found.";
    res.json({ review });
  } catch (error) {
    console.error(`Error fetching review for book with ISBN ${isbn}:`, error);
    res.status(500).send(`Error fetching review for book with ISBN ${isbn}`);
  }
});

// Endpoint to add or modify a book review
app.post('/api/books/review/:isbn', (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  if (!review) {
    return res.status(400).json({ error: 'Review content is required' });
  }
  reviews[isbn] = review;
  res.status(201).json({ message: 'Review added/modified successfully' });
});

// Endpoint to delete a book review
app.delete('/api/books/review/:isbn', (req, res) => {
  const { isbn } = req.params;
  if (reviews[isbn]) {
    delete reviews[isbn];
    res.status(200).json({ message: 'Review deleted successfully' });
  } else {
    res.status(404).json({ error: 'Review not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
