import express from 'express';  // Use import instead of require
import cors from 'cors';
import pool from './backend/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['https://householdhero.netlify.app/', "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

//-----------------------------MAIN ROUTE-------------------------------------------
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch(error){
    console.error('Error connecting to the database:', error);
    res.status(500).send('Error connecting to the database.');
  }
});

//-----------------------------AUTHENTICATE TOKEN-------------------------------------------
const authToken = (req,res,next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if(!token){
    return res.status(401).json({message: 'Access Token Required'});
  }

  jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
    if(err){
      return res.status(403).json({message: 'Invalid or Expired Token'});
    }

    req.user = user;
    next();
  })

};

//-----------------------------COMPLETED CHORES ROUTE--------------------------------
app.put('/api/chores/complete/:id', authToken, async (req,res) => {
  const { id } = req.params;
  const { nextDate, chorePoints } = req.body;
  const userId = req.user.id;

  //console.log("Points received:", chorePoints);

  try{
    await pool.query('UPDATE chores SET date = $1 WHERE id = $2 AND user_id = $3', [nextDate, id, userId]);

    const result = await pool.query('UPDATE users SET points = points + $1 WHERE id = $2 RETURNING points', [chorePoints, userId])
    // totalPoints += Number(chorePoints);
    // console.log(`Total Points: ${totalPoints}`);

    res.status(200).send({message: 'Chore completed', totalPoints: result.rows[0].points});
  } catch(error){
    console.error('Error completing chore:', error);
    res.status(500).send('Server error');
  }
});

//-------------------------------GET CHORES ROUTE-------------------------------------
app.get('/api/chores', authToken, async (req, res) => {

    try {
      const result = await pool.query('SELECT * FROM chores WHERE user_id = $1 ORDER BY date ASC', [req.user.id]);
      res.json(result.rows); // Send back the rows as a JSON response
    } catch (error) {
      console.error('Error fetching chores:', error);
      res.status(500).send('Server error');
    }
  });

//-------------------------------CREATE NEW CHORES ROUTE---------------------------------
app.post('/api/chores', authToken, async (req, res) => {
  const { choreName, date, points, frequency } = req.body;
  const userId = req.user.id;

  try{
    const result = await pool.query(
      'INSERT INTO chores (name, date, points, frequency, user_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [choreName, date, points, frequency, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error){
    console.error('Error adding chore:', error);
    res.status(500).send('Server error');
  }
});

//----------------------------------DELETE CHORE ROUTE---------------------------------------
app.delete('/api/chores/:id', authToken, async (req,res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try{
    const result = await pool.query('DELETE FROM chores WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);

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
app.put('/api/chores/:id', authToken, async (req,res) => {
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

  if(!email || !password){
    return res.status(400).json({mesage: 'Email and password are required'});
  }

  try{
    const hashedPassword = await bcrypt.hash(password,10);
    const result = await pool.query(
      'INSERT INTO users (email,password) VALUES ($1,$2) RETURNING id, email',
      [email,hashedPassword]
    );

    const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET,);
    res.status(201).json({message: "User registered successfully", token});
  } catch(error){
    console.error('Error signing up:', error);
  if (error.code === '23505') {
      return res.status(400).json({ message: 'Email already exists' });
  }
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
    
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    console.log(jwt.decode(token));
    res.json({token, user: {id: user.id, email: user.email} });
  } catch(error){
    console.error('Error loggin in', error);
    res.status(500).send("Server error");
  }
});

//------------------------------------GET POINTS--------------------------------------------------
app.get('/api/users/points', authToken, async (req,res) => {
  try{
    const result = await pool.query('SELECT points FROM users WHERE id = $1', [req.user.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({message: "User not found"});
    }
    res.json({points: result.rows[0].points});
  } catch (error){
    console.error("Error getting points:", error);
    res.status(500).send("Server Error");
  }
});

//------------------------------------UPDATE POINTS--------------------------------------------------
app.put('/api/users/points', authToken, async (req,res) => {
  const {currentPoints} = req.body;
  const userId = req.user.id;
  try{
    const result = await pool.query('UPDATE users SET points = $1 WHERE id = $2 RETURNING points', [currentPoints, userId]);

    res.status(200).json({message: "Points updated", totalPoints: result.rows[0].points});
  } catch(error){
    console.error("Error updating user's points:", error);
    res.status(500).send("Server Error");
  }
});

//------------------------------------CREATE SHOP REWARDS--------------------------------------------------
app.post('/api/shop', authToken, async (req,res) => {
  const {description, price, selectedIcon} = req.body;
  const userId = req.user.id;

  try{
    const result = await pool.query('INSERT INTO shop (text, price, user_id, icon) VALUES ($1,$2,$3,$4) RETURNING *', [description, price, userId, selectedIcon]);
  res.status(201).json(result.rows[0]);
  } catch (error){
    console.error('Error adding Shop Item:', error);
    res.status(500).send('Server error');
  }
});

//------------------------------------GET SHOP REWARDS--------------------------------------------------
app.get('/api/shop', authToken, async (req,res) => {
  try {
    const result = await pool.query('SELECT * FROM shop WHERE user_id = $1', [req.user.id]);
    res.json(result.rows); // Send back the rows as a JSON response
  } catch (error) {
    console.error('Error fetching Shop Items:', error);
    res.status(500).send('Server error');
  }
});

//------------------------------------VALIDATE TOKEN--------------------------------------------------
app.post('/api/users/validate-token', (req,res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token){
    return res.status(401).json({message: 'Token missing'});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({valid: true, userId: decoded.id});
  } catch(error) {
    console.error('Token validation error:', error);
    res.status(401).json({valid: false, message: 'Token is invalid or expired.'});
  }
});

//-------------------------------------TESTING ROUTE------------------------------------
// app.post('/api/users/signup', (req, res) => {
//   console.log('Signup route hit!');
//   console.log('Request body:', req.body);
//   res.send('Test response');
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});