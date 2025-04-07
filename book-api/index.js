const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000; // Use dynamic port for deployment

app.use(bodyParser.json());
app.use(cors());

let books = [
    { id: 1, title: '1984', author: 'George Orwell', price: 50 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 40 },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 35 },
];

// Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Add a book
app.post('/books', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.json(newBook);
});

// Update a book
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const updatedBook = req.body;
    books = books.map((book) => (book.id === parseInt(id) ? updatedBook : book));
    res.json(updatedBook);
});

// Delete a book
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    books = books.filter((book) => book.id !== parseInt(id));
    res.json({ message: 'Book deleted successfully' });
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
