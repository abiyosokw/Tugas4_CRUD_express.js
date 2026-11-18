const apiUrl = '/api/buku';

document.addEventListener('DOMContentLoaded', fetchBooks);

async function fetchBooks() {
    const response = await fetch(apiUrl);
    const books = await response.json();
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    books.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="book-info">
                <strong>${book.judul}</strong>
                <small>Oleh: ${book.penulis}</small>
            </div>
            <div class="actions">
                <button class="btn-edit" onclick="editBook(${book.id}, '${book.judul}', '${book.penulis}')">Edit</button>
                <button class="btn-delete" onclick="deleteBook(${book.id})">Hapus</button>
            </div>
        `;
        bookList.appendChild(li);
    });
}

async function saveBook() {
    const id = document.getElementById('bookId').value;
    const judul = document.getElementById('judul').value;
    const penulis = document.getElementById('penulis').value;

    if (!judul || !penulis) return alert('Isi judul dan penulis terlebih dahulu!');

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ judul, penulis })
    });

    document.getElementById('bookId').value = '';
    document.getElementById('judul').value = '';
    document.getElementById('penulis').value = '';

    fetchBooks();
}

function editBook(id, judul, penulis) {
    document.getElementById('bookId').value = id;
    document.getElementById('judul').value = judul;
    document.getElementById('penulis').value = penulis;
}

async function deleteBook(id) {
    if (confirm('Yakin ingin menghapus buku ini?')) {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        fetchBooks();
    }
}