document.addEventListener("DOMContentLoaded", () => {
    const bookForm = document.getElementById("bookForm");
    const bookTableBody = document.querySelector("#bookTable tbody");
    const userBookTableBody = document.querySelector("#userBookTable tbody");
  
    async function fetchBooks() {
      try {
        const response = await fetch("http://localhost:5500/admin/books");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();
  
        bookTableBody.innerHTML = "";
  
        books.forEach((book) => {
          addBookToTable(book);
        });
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
  
    function addBookToTable(book) {
      const row = document.createElement("tr");
      const btn = document.createElement("button");
      btn.appendChild(document.createTextNode("Return"));
      btn.className = "action-btn";
  
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${new Date(book.issueTime).toLocaleString()}</td>
        <td>${new Date(book.returnTime).toLocaleString()}</td>
        <td>${book.fine.toFixed(2)} USD</td>
      `;
      row.appendChild(btn);
      bookTableBody.appendChild(row);
      btn.addEventListener("click", async () => {
        await fetch("http://localhost:5500/admin/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: book.id }),
        });
        document.location.reload();
      });
    }
  
    bookForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const title = document.getElementById("title").value;
  
      try {
        const response = await fetch("http://localhost:5500/admin/createBook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const book = await response.json();
        addBookToTable(book);
        addUserBookToTable(book);
        bookForm.reset();
      } catch (error) {
        console.error("Error:", error);
      }
    });
  
    function addUserBookToTable(book) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.returned ? "Yes" : "No"}</td>
        <td>${book.finePaid.toFixed(2)} USD</td>
      `;
      userBookTableBody.appendChild(row);
    }
  
    async function fetchUserBookInfo() {
      try {
        const response = await fetch("http://localhost:5500/admin/returns");
        const returns = await response.json();
  
        userBookTableBody.innerHTML = ""; 
        returns.forEach(returnedBook => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${returnedBook.title}</td>
            <td>${new Date(returnedBook.returnTime).toLocaleString()}</td>
            <td>${returnedBook.fine.toFixed(2)} USD</td>
          `;
          userBookTableBody.appendChild(row);
        });
      } catch (error) {
        console.error("Error fetching user book info:", error);
      }
    }
  
    fetchBooks();
    fetchUserBookInfo();
  });
  