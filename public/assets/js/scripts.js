document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('suggestion-form');
    form.addEventListener('submit', handleFormSubmit);
});

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('map')) {
        var map = L.map('map').setView([20, 0], 2);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var visitedCities = [
            { name: 'Timmins', coords: [48.4758, -81.3305] },
            { name: 'Ottawa', coords: [45.4215, -75.6972] },
            { name: 'Toronto', coords: [43.651070, -79.347015] },
            { name: 'Madrid', coords: [40.4168, -3.7038] },
            { name: 'Avila', coords: [40.6566, -4.6813] },
            { name: 'Segovia', coords: [40.9429, -4.1088] },
            { name: 'Toledo', coords: [39.8628, -4.0273] },
            { name: 'Merida', coords: [38.9191, -6.3420] },
            { name: 'Valencia', coords: [39.4699, -0.3763] }
        ];

        var plannedCities = [
            { name: 'Oporto', coords: [41.1579, -8.6291] },
            { name: 'Aveiro', coords: [40.6405, -8.6538] },
            { name: 'Coimbra', coords: [40.2033, -8.4103] },
            { name: 'Lisbon', coords: [38.7223, -9.1393] },
            { name: 'Barcelona', coords: [41.3851, 2.1734] }
        ];

        var blueIcon = new L.Icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
            iconColor: 'blue'
        });

        var redIcon = new L.Icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
            iconColor: 'red'
        });

        visitedCities.forEach(function(city) {
            L.marker(city.coords, { icon: blueIcon }).addTo(map)
                .bindPopup(city.name)
                .openPopup();
        });

        plannedCities.forEach(function(city) {
            L.marker(city.coords, { icon: redIcon }).addTo(map)
                .bindPopup(city.name)
                .openPopup();
        });
    }
});

function handleFormSubmit(event) {
    event.preventDefault();
    const suggestionBox = document.getElementById('suggestion-box');
    const suggestion = suggestionBox.value.trim();

    if (suggestion === "") {
        alert("Please enter a suggestion before submitting.");
        return;
    }

    // Send the suggestion to the server
    fetch('/suggestions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ suggestion })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("Suggestion submitted:", data);
        alert("Thank you for your suggestion!");
        // Clear the suggestion box after submission
        suggestionBox.value = "";
    })
    .catch(error => {
        console.error("Error submitting suggestion:", error);
        alert("There was an error submitting your suggestion. Please try again.");
    });
}

// filepath: c:\Users\Alba\Downloads\Coding\Arden\server.js
const express = require('express');
const bodyParser = require('body-parser');
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
    // Here you can save the suggestion to a database or file
    res.json({ message: 'Suggestion received!' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});