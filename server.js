const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const imagesFolderPath = './images'; // Folder containing images

app.use(express.static('.')); // Serve static files

// Endpoint to get the list of images
app.get('/images', (req, res) => {
    fs.readdir(imagesFolderPath, (err, files) => {
        if (err) {
            res.status(500).send('Error reading images folder');
            return;
        }
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.json(imageFiles.map(file => `${req.protocol}://${req.get('host')}/${imagesFolderPath}/${file}`));
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    import('open').then(open => open.default(`http://localhost:${port}`));
});
