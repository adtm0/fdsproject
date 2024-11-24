// handles form submission
// interacts with supabase API

const form = document.getElementById('add-author-form');

// Handle form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get form data
  const lastname = document.getElementById('lastname').value;
  const firstname = document.getElementById('firstname').value;
  const email = document.getElementById('email').value;
  const researcher_type = document.getElementById('researcher_type').value;

  // Send data to the backend server to insert into Supabase
  const response = await fetch('http://localhost:3000/add-author', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lastname, firstname, email, researcher_type })
  });

  if (response.ok) {
    alert('Author added successfully!');
    form.reset(); // Reset the form
  } else {
    alert('Failed to add author.');
  }
});


// Your JavaScript functions for fetching, editing, and deleting authors here
async function fetchAuthors() {
    try {
      const response = await fetch('http://localhost:3000/authors');
      const authors = await response.json();
      const authorsListDiv = document.getElementById('authors-list');
      authorsListDiv.innerHTML = '';
  
      if (authors.length === 0) {
        authorsListDiv.innerHTML = '<p>No authors found</p>';
        return;
      }
  
      authors.forEach((author) => {
        const authorDiv = document.createElement('div');
        authorDiv.innerHTML = `
          <p>${author.firstname} ${author.lastname}</p>
          <p>Email: ${author.email}</p>
          <p>Researcher Type: ${author.researcher_type}</p>
          <button onclick="deleteAuthor(${author.id})">Delete</button>
          <hr>
        `;
        authorsListDiv.appendChild(authorDiv);
      });
    } catch (error) {
      console.error('Error fetching authors:', error);
      document.getElementById('authors-list').innerHTML = '<p>Error loading authors.</p>';
    }
  }
  
  async function deleteAuthor(id) {
    try {
      const response = await fetch(`http://localhost:3000/delete-author/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert('Author deleted successfully');
        fetchAuthors();
      } else {
        alert('Failed to delete author');
      }
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  }
  
  document.getElementById('edit-author-form').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const id = 1; // Replace with the actual author ID to be updated
    const firstname = document.getElementById('edit-firstname').value;
    const lastname = document.getElementById('edit-lastname').value;
    const email = document.getElementById('edit-email').value;
    const researcher_type = document.getElementById('edit-researcher_type').value;
  
    try {
      const response = await fetch(`http://localhost:3000/update-author/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email, researcher_type }),
      });
  
      if (response.ok) {
        alert('Author updated successfully');
        fetchAuthors();
      } else {
        alert('Failed to update author');
      }
    } catch (error) {
      console.error('Error updating author:', error);
    }
  });
  
  fetchAuthors();
  