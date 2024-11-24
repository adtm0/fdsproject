const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors'); 
const app = express();
const port = 3000;

// Supabase client setup
const supabase = createClient(
  'https://lbcrjlsfgyuxhzsbjjzm.supabase.co', // Replace with your Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiY3JqbHNmZ3l1eGh6c2JqanptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0NDIyNzMsImV4cCI6MjA0ODAxODI3M30.3t1TS0XO6YPAwNxTwBIpYVLT8QHJRHZjNuKHxs7kem0' // Replace with your Supabase Anon Key
);

// Middleware to parse JSON
app.use(express.json());

// Use the CORS middleware
app.use(cors()); // This allows requests from any origin. You can specify origins if needed.

// API endpoint to add a new author
app.post('/add-author', async (req, res) => {
  const { lastname, firstname, email, researcher_type } = req.body;

  console.log('Request received:', req.body); // Log the incoming data

  try {
    const { data, error } = await supabase
      .from('authors')
      .insert([{ lastname, firstname, email, researcher_type }]);

    if (error) {
      console.error('Error inserting data:', error); // Log the error
      return res.status(500).send('Error adding author');
    }

    console.log('Author added:', data); // Log the inserted data
    res.status(200).send('Author added successfully');
  } catch (err) {
    console.error('Server error:', err); // Log any unexpected server error
    res.status(500).send('Server error');
  }
});

// API endpoint to fetch all authors
app.get('/authors', async (req, res) => {
    try {
        const { data, error } = await supabase.from('authors').select('*');
        if (error) {
            console.error('Error fetching authors:', error);
            return res.status(500).json({ error: 'Failed to fetch authors' });
        }
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching authors:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// API endpoint to fetch a single author by ID
app.get('/authors/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const { data, error } = await supabase.from('authors').select('*').eq('id', id).single();
      if (error) {
          console.error('Error fetching author:', error);
          return res.status(500).json({ error: 'Failed to fetch author' });
      }
      res.status(200).json(data);
  } catch (err) {
      console.error('Error fetching author:', err);
      res.status(500).json({ error: 'Server error' });
  }
});

// API endpoint to delete an author
app.delete('/delete-author/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase.from('authors').delete().match({ id });
    if (error) {
      return res.status(500).send('Error deleting author');
    }
    res.status(200).send('Author deleted successfully');
  } catch (err) {
    console.error('Error deleting author:', err);
    res.status(500).send('Server error');
  }
});

// API endpoint to update an author
app.put('/update-author/:id', async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, researcher_type } = req.body;

  try {
    const { data, error } = await supabase
      .from('authors')
      .update({ firstname, lastname, email, researcher_type })
      .match({ id });

    if (error) {
      console.error('Error updating author:', error);
      return res.status(500).send('Error updating author');
    }

    console.log('Author updated:', data);
    res.status(200).send('Author updated successfully');
  } catch (err) {
    console.error('Error updating author:', err);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
