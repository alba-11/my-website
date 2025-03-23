const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Endpoint to handle suggestions
app.post('/suggestions', (req, res) => {
    const suggestion = req.body.suggestion;
    console.log('Received suggestion:', suggestion);

    // Use the full path to the suggestions.txt file
    const filePath = 'c:\\Users\\Alba\\Downloads\\Coding\\Arden\\suggestions.txt';
    console.log('Saving suggestion to:', filePath);

    // Save the suggestion to a file
    fs.appendFile(filePath, suggestion + '\n', (err) => {
        if (err) {
            console.error('Error saving suggestion:', err);
            res.status(500).json({ message: 'Error saving suggestion' });
        } else {
            console.log('Suggestion saved successfully');
            res.json({ message: 'Suggestion received!' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});