import express from 'express';  // Use import instead of require
import cors from 'cors';
import pool from './backend/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let totalPoints = 0; //temporary points tracker
//-----------------------------MAIN ROUTE-------------------------------------------
app.get('/', (req, res) => {
  res.send('Hello World!');
});
//-----------------------------COMPLETED CHORES ROUTE--------------------------------
app.put('/api/chores/complete/:id', async (req,res) => {
  const { id } = req.params;
  const { nextDate, chorePoints } = req.body;

  console.log("Points received:", chorePoints);

  try{
    await pool.query('UPDATE chores SET date = $1 WHERE id = $2', [nextDate, id]);
    totalPoints += Number(chorePoints);
    console.log(`Total Points: ${totalPoints}`);

    res.status(200).send({message: 'Chore completed', totalPoints});
  } catch(error){
    console.error('Error completing chore:', error);
    res.status(500).send('Server error');
  }
});
//-------------------------------GET CHORES ROUTE-------------------------------------
app.get('/api/chores', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM chores'); // Replace 'tasks' with your table name
      res.json(result.rows); // Send back the rows as a JSON response
    } catch (error) {
      console.error('Error fetching chores:', error);
      res.status(500).send('Server error');
    }
  });
//-------------------------------CREATE NEW CHORES ROUTE---------------------------------
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
//----------------------------------DELETE CHORE ROUTE---------------------------------------
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
//------------------------------------UPDATE/EDIT CHORES ROUTE------------------------------------
app.put('/api/chores/:id', async (req,res) => {
  const { id } = req.params;
  const { choreName, date, points, frequency } = req.body;
  try{
    const result = await pool.query('UPDATE chores SET name = $1, date = $2, points = $3, frequency = $4 WHERE id = $5 RETURNING *',
    [choreName, date, points, frequency, id]
    );
    if(result.rowCount === 0) {
      return res.status(404).json({message: 'Chore not found'});
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating chore:', error);
    res.status(500).send('Server Error');
  }
});
//------------------------------------SIGN UP ROUTE-------------------------------------------------
app.post('/api/users/signup', async(req,res) => {
  const {email, password} = req.body;
  try{
    const hashedPassword = await bcrypt.hash(password,10);
    const result = await pool.query(
      'INSERT INTO users (email,password) VALUES ($1,$2) RETURN id, email',
      [email,hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch(error){
    console.error('Error signing up:', error);
    res.status(500).send('Server Error');
  }
});
//------------------------------------LOG IN ROUTE--------------------------------------------------
app.post('/api/users/login', async (req,res) =>{
  const {email, password} = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if(!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({message: "Invalid credentials"});
    }
    
    const token = jwt.sign({id: user.id}, 'your_jwt_secret', {expiresIn: '1h'});
    res.json({token, user: {id: user.id, email: user.email} });
  } catch(error){
    console.error('Error loggin in', error);
    res.status(500).send("Server error");
  }
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});