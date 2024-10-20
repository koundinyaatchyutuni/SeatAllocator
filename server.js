const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();
const port = 3000;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Configure session middleware
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// MongoDB Connection URI
const uri = "mongodb+srv://old-man_07:Koundinya_1@cluster0.a5qcwu9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB Client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();
const database = client.db('User_data');
const collection = database.collection('Uinfo');
const collages = database.collection('collages');
// console.log("Connected to MongoDB!");
const admin_check = database.collection('Uid');
// Login route
app.post('/login', async(req, res) => {

    const data = {
        user_id: req.body.user_id,
        password: req.body.password
    };

    try {
        if (data.user_id == "Admin@1") {
            const user = await admin_check.findOne({ 'user_id': data.user_id });
            if (!user) {
                return res.status(400).json({ msg: 'Invalid user id' });
            }
            // Validate password
            const isValid = await bcrypt.compare(data.password, user.password);
            if (!isValid) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }
            return res.json({ redirectUrl: '/submit' });
        } else {
            const user = await collection.findOne({ 'user_id': data.user_id });
            if (!user) {
                return res.status(400).json({ msg: 'Invalid user id' });
            }

            // Validate password
            const isValid = await bcrypt.compare(data.password, user.password);
            if (!isValid) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            req.session.user_id = data.user_id;
            return res.json({ redirectUrl: '/middle' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Check if user_id is unique
app.post('/is_unique_userid', async(req, res) => {
    try {

        const uid = req.body.user_id;
        // console.log(uid.length);
        const user = await collection.findOne({ 'user_id': uid });
        if (!user) {
            res.json({ available: true });
        } else {
            res.json({ available: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/is_unique_rank', async(req, res) => {
    try {
        const rank = req.body.rank;
        const user = await collection.findOne({ 'rank': rank });
        if (!user) {
            res.json({ available: true });
        } else {
            res.json({ available: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.post('/save-colleges-order', async(req, res) => {

    const selectedColleges = req.body.colleges; // Get the submitted list of colleges
    const userId = String(req.body.user_id).trim();
    if (!selectedColleges || selectedColleges.length === 0) {
        return res.json({ success: false, message: 'No colleges selected' });
    }

    // Insert the order into MongoDB
    const result = await collection.updateOne({ 'user_id': userId }, // Match condition
        {
            $set: { 'collages_order': selectedColleges } // Add the new field or update the value of an existing field
        }, { strict: false }
    );
    if (result.matchedCount > 0) {
        return res.json({ success: true, message: 'colleges selected' });
    } else {
        return res.json({ success: false, message: 'No colleges selected' });
    }

});
app.post('/main-cal', async(req, res) => {
    try {
        // Retrieve only the specified fields: user_id, colleges, and rank
        console.log("entered main-cal!!");
        const report = await collection.find({}, { projection: { user_id: 1, collages_order: 1, rank: 1 } }).sort({ rank: 1 }).toArray();
        const vacencies = await collages.find({}).toArray();
        console.log(report);
        console.log(vacencies);
        return res.json({ information: report, vacancy: vacencies }); // Send the filtered data back as a JSON response
    } catch (err) {
        console.log("erroor occured");
        res.status(500).json({ message: err.message });
    }
});
// checking if result is available for result button enabling
app.post('/results-aval', async(req, res) => {
    try {
        const userId = String(req.body.user_id).trim();
        const ackn = await collection.findOne({ user_id: userId });
        // console.log(typeof ackn);
        // console.log(ackn);
        // console.log(userId);
        if (ackn.allocated_collage) {
            console.log('The key "result" exists in ackn.');
            res.json({ available: true });
        } else {
            console.log('The key "result" does not exist in ackn.');
            res.json({ available: false });
        }
    } catch (err) {
        console.error(err);
        res.json({ available: false });
    }
});
//fetching results fro user
app.post('/get-result', async(req, res) => {
    try {
        const userId = String(req.body.user_id).trim();
        const ackn = await collection.findOne({ user_id: userId });
        if (ackn.allocated_collage) {
            // console.log('The key "result" exists in ackn.');
            res.json({ available: true, colg: ackn.allocated_collage });
        } else {
            // console.log('The key "result" does not exist in ackn.');
            res.json({ available: false });
        }
    } catch (err) {
        console.error(err);
        res.json({ available: false });
    }
});
// uploading results for students
app.post('/results-upload', async(req, res) => {
    try {
        const result = String(req.body.result).trim();
        const user_id = String(req.body.userId).trim();
        console.log("enterd results-upload");
        console.log(result);
        console.log(user_id);
        const test = await collection.updateOne({ 'user_id': user_id }, // Match condition
            {
                $set: { 'allocated_collage': result } // Add the new field or update the value of an existing field
            }, { strict: false }
        );
        if (test.matchedCount > 0) {
            console.log("succesfull");
            res.json({ success: true, message: 'uploaded allocated collage' });
        } else {
            console.log("unsuccesful");
            res.json({ success: false, message: 'unable to upload !!!' });
        }
    } catch (err) {
        console.log("erroor occured");
        res.status(500).json({ message: err.message });
    }
})
app.post('/update-vacancies', async(req, res) => {
        try {
            const collageId = req.body.new_vacancy;
            delete collageId._id;
            const query = { uni: 1 };
            // {"_id":{"$oid":"66e7e97eefdf987fc76194be"}}
            console.log("collage id:", collageId);
            for (let key in collageId) {
                console.log(key);
                const update = {
                    $set: {
                        [key]: collageId[key]
                    }
                };
                await collages.updateOne(query, update);
            }
            // Your specific document _id


        } catch (err) {
            console.log("failure while updating the vacancies::");
            console.error(err);
            res.json({ success: false });
        }
    })
    // Sign-up route
app.post('/submit-form', async(req, res) => {
    try {
        const dataToInsert = {
            user_id: req.body.user_id,
            password: req.body.password,
            first_name: req.body.first_name,
            email: req.body.email,
            phone_no: req.body.phone_number,
            rank: req.body.rank
        };

        // Hash password before saving to database
        const salt = await bcrypt.genSalt(10);
        dataToInsert.password = await bcrypt.hash(dataToInsert.password, salt);
        if (dataToInsert.user_id == "Admin@1") {
            const result = await admin_check.insertOne(dataToInsert);
            console.log('Form data inserted:', result);
        }
        // Insert data into MongoDB
        else {
            const result = await collection.insertOne(dataToInsert);
            console.log('Form data inserted:', result);
        }
        res.redirect('/');
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('An error occurred while submitting the data.');
    }
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'main.html'));
});
app.get('/submit', (req, res) => {
    res.render('submit');
})
app.get('/sign_up', (req, res) => {
    res.render('sign_up');
});
app.get('/middle', (req, res) => {
    if (!req.session.user_id) {
        return res.redirect('/'); // Redirect to homepage if not logged in
    }

    // You can now use req.session.user_id to fetch user-specific data
    res.render('middle', { user_id: req.session.user_id });
});
// Seat allocator route
app.get('/seatallocator', (req, res) => {
    if (!req.session.user_id) {
        res.redirect('/');
    }
    res.render('seatallocator', { user_id: req.session.user_id });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});