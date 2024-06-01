const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user.js');
const bcrypt = require('bcrypt');



const app = express();
app.use(bodyParser.json());
app.use(cors());



app.post('/register', async (req, res) => {
    const { username, email, password, dateOfBirth } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        dateOfBirth,
    });
    
    try {
        await newUser.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(500).send('Error creating user: ' + error.message);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send('User not found');
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send('Invalid credentials');
      }
  
      res.status(200).send('Login successful');
    } catch (error) {
      res.status(500).send('Error logging in: ' + error.message);
    }
  });


mongoose.connect('mongodb url').then(() => {
    app.listen(5000, ()=> console.log(`listening on 5000`));
}).catch((error) => console.log(error));