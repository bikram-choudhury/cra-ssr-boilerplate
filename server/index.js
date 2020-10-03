import Path from 'path';
import fs from 'fs';
import express from 'express';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './../src/App';

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
    const clientApp = ReactDOMServer.renderToString(<App />);

    const indexFile = Path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, content) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }
        return res.send(
            content.replace('<div id="root"></div>', `<div id="root">${clientApp}</div>`)
        );
    })
});

app.use(express.static('./build'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});