const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Middleware untuk membaca JSON
app.use(express.json());

// Menyajikan file statis (HTML, JS, CSS) dari folder 'public'
app.use(express.static(path.join(__dirname, "public")));

// Simulasi Database
let books = [{ id: 1, judul: "Belajar Express.js", penulis: "Budi" }];

// Rute API CRUD
app.get("/api/buku", (req, res) => {
    res.json(books);
});

app.post("/api/buku", (req, res) => {
    const newBook = {
        id: Date.now(),
        judul: req.body.judul,
        penulis: req.body.penulis,
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put("/api/buku/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex((b) => b.id === id);

    if (index !== -1) {
        books[index] = { id, judul: req.body.judul, penulis: req.body.penulis };
        res.json(books[index]);
    } else {
        res.status(404).json({ pesan: "Buku tidak ditemukan" });
    }
});

app.delete("/api/buku/:id", (req, res) => {
    const id = parseInt(req.params.id);
    books = books.filter((b) => b.id !== id);
    res.json({ pesan: "Buku berhasil dihapus" });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
