import express from 'express';  // Use import instead of require
import cors from 'cors';
import pool from './backend/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.get('/api/chores', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM chores'); // Replace 'tasks' with your table name
      res.json(result.rows); // Send back the rows as a JSON response
    } catch (error) {
      console.error('Error fetching chores:', error);
      res.status(500).send('Server error');
    }
  });

app.post('/api/chores', async (req, res) => {
  const { choreName, date, points, frequency } = req.body;

  try{
    const result = await pool.query(
      'INSERT INTO chores (name, date, points, frequency) VALUES ($1,$2,$3,$4) RETURNING *',
      [choreName, date, points, frequency]
    );
    res.status(201).json(result.rows[0]);
  } catch (error){
    console.error('Error adding chore:', error);
    res.status(500).send('Server error');
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});