import express from 'express';  // Use import instead of require
import cors from 'cors';
import pool from './backend/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let totalPoints = 0; //temporary points tracker

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.put('/api/chores/complete/:id', async (req,res) => {
  const { id } = req.params;
  const { nextDate, points } = req.body;

  try{
    await pool.query('UPDATE chores SET date = $1 WHERE id = $2', [nextDate, id]);
    totalPoints += points;
    console.log(`Total Points: ${totalPoints}`);

    res.status(200).send({message: 'Chore completed', totalPoints});
  } catch(error){
    console.error('Error completing chore:', error);
    res.status(500).send('Server error');
  }
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

app.delete('/api/chores/:id', async (req,res) => {
  const { id } = req.params;

  try{
    const result = await pool.query('DELETE FROM chores WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Chore not found'});
    }
    res.status(200).json({message:'Chore deleted successfully'});
  } catch (error){
    console.error('Error deleting chore:', error);
    res.status(500).send('Server Error');
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});