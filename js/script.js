function searchBooks() {
    var bookTitle = document.getElementById('bookTitle').value;
    var apiUrl = 'http://openlibrary.org/search.json?q=' + encodeURIComponent(bookTitle);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            var books = data.docs;
            var bookResults = document.getElementById('bookResults');
            bookResults.innerHTML = ''; // Önceki arama sonuçlarını temizle

            if (books.length === 0) {
                bookResults.innerHTML = '<p>Kitap bulunamadı.</p>';
            } else {
                books.forEach(book => {
                    var title = book.title;
                    var authors = book.author_name ? book.author_name.join(', ') : 'Bilinmiyor';
                    var publishYear = book.first_publish_year || 'Bilinmiyor';

                    var bookInfo = `
                        <div>
                            <h2>${title}</h2>
                            <p><strong>Yazar(lar):</strong> ${authors}</p>
                            <p><strong>Yayın Tarihi:</strong> ${publishYear}</p>
                        </div>
                        <hr>
                    `;

                    bookResults.innerHTML += bookInfo;
                });
            }
        })
        .catch(error => {
            console.error('Hata:', error);
            var bookResults = document.getElementById('bookResults');
            bookResults.innerHTML = '<p>Kitap bilgileri getirilirken bir hata oluştu.</p>';
        });
}