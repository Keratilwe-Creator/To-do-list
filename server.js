const express = require('express');
const cors = require('cors');  // Import CORS
const { MongoClient, ObjectId } = require('mongodb');  // Import MongoDB client and ObjectId
const path = require('path');
const dotenv = require('dotenv');  // Import dotenv to manage environment variables

dotenv.config();  // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;  // Use the PORT environment variable or default to 3000

// Enable CORS for all origins (allow your frontend to connect to the backend)
app.use(cors());

// Middleware to serve static files (like index.html)
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection URI from the environment variable
const uri = process.env.MONGO_URI;
const dbName = 'todoApp';  // Database name
let db;
let tasksCollection;

// Connect to MongoDB
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log("Connected to MongoDB");
    db = client.db(dbName);
    tasksCollection = db.collection('tasks');
  })
  .catch(error => console.error("Error connecting to MongoDB", error));

// GET endpoint to fetch tasks
app.get('/todos', (req, res) => {
  tasksCollection.find().toArray((err, tasks) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(tasks);
  });
});

// POST endpoint to add a new task
app.post('/todos', express.json(), (req, res) => {
  const { task } = req.body;
  const newTask = { task, completed: false };
  
  tasksCollection.insertOne(newTask, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ _id: result.insertedId, task, completed: false });
  });
});

// DELETE endpoint to delete a task
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const taskId = new ObjectId(id);
  
  tasksCollection.deleteOne({ _id: taskId }, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Task deleted successfully' });
  });
});

// PUT endpoint to update a task's completion status
app.put('/todos/:id', express.json(), (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const taskId = new ObjectId(id);
  
  tasksCollection.updateOne({ _id: taskId }, { $set: { completed } }, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Task updated successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



