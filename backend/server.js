const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db.js');
const {errorHandler} = require('./middleware/errorMiddleware.js'); 

// Connect to Database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.status(201).json(
        {msg: "Welcome to the Support Desk", from: "Carsten Niemand", route: 'users'}
    );
})

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));