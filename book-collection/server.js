const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();

const books = [];

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON request body
app.use(bodyParser.json());

// Return array of books
app.get('/books', (req, res) => {
    res.json(books);
});

// Add a new book
app.post('/books', (req, res) => {
    const { title, author, publishedDate } = req.body;

    if (!title || !author) {
        res.status(400).json({ error: 'Title and author are required' });
        return;
    }

    const id = uuidv4();

    const book = { id, title, author, publishedDate };

    books.push(book);

    res.json(book);
});

// Delete a book
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;

    const index = books.findIndex(book => book.id === id);

    if (index === -1) {
        res.status(404).json({ errorMessage: 'Book not found' });
        return;
    }

    books.splice(index, 1);

    res.json({ message: 'Book deleted successfully' });
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
