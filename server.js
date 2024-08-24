const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();
const port = 3000;
const bcrypt = require('bcryptjs');
// const mongoose = require('mongoose');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// MongoDB Connection URI
const uri = "mongodb+srv://old-man_07:Koundinya_1@cluster0.a5qcwu9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB Client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
app.post('/login', async(req, res) => {
    const data = {
        user_id: req.body.user_id,
        password: req.body.password
    };
    await client.connect();
    const database = client.db('User_data');
    const collection = database.collection('Uid');
    // Check if user exists
    const user = await collection.findOne({ 'user_id': data.user_id });
    if (!user) {
        return res.status(400).json({ msg: 'Invalid user id' });
    }

    // Validate password
    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    } else {
        res.redirect('/seatallocator');
    }

    // Generate JWT
    // const token = jwt.sign({ userId: user._id }, 'YOUR_JWT_SECRET', {
    //     expiresIn: '1h',
    // });

    // res.json({ token });
});
app.post('/signuppage', async(req, res) => {
    res.redirect('/sign_up');
});
app.post('/submit-form', async(req, res) => {
    try {
        await client.connect();
        const database = client.db('User_data');
        const collection = database.collection('Uid');
        const dataToInsert = {
            user_id: req.body.user_id,
            password: req.body.password,
            email: req.body.email,
            rank: req.body.rank
                // Add other fields as needed
        };
        // Insert data into MongoDB
        const salt = await bcrypt.genSalt(10);
        dataToInsert.password = await bcrypt.hash(dataToInsert.password, salt);
        const result = await collection.insertOne(dataToInsert);
        console.log('Form data inserted:', result);

        res.status(200).send('Data submitted successfully!');
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('An error occurred while submitting the data.');
    } finally {
        await client.close();
    }
});


// Serve your HTML file


// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'main.html'))
});

app.get('/sign_up', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'sign_up.html'));
});
app.get('/seatallocator', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'seatallocator.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});