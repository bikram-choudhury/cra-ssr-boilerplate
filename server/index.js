import Path from 'path';
import fs from 'fs';
import express from 'express';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import serializeJavascript from 'serialize-javascript';
import Routes from '../src/Routes';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./build'));

app.get('*', (req, res) => {
    // Route based ssr: https://www.digitalocean.com/community/tutorials/react-react-router-ssr
    const matchingRoutes = matchRoutes(Routes, req.path);

    const promises = matchingRoutes.map(({ route }) => {
        return route.loadData ? route.loadData() : Promise.resolve(null)
    })

    Promise.all(promises).then(dataArr => {
        
        // Let's add the data to the context
        const context = { data: dataArr[1] };
        const clientApp = ReactDOMServer.renderToString(
            <StaticRouter context={context} location={req.path}>
                <div>{renderRoutes(Routes)}</div>
            </StaticRouter>
        );

        const indexFile = Path.resolve('./server-build/index.html');
        fs.readFile(indexFile, 'utf8', (err, content) => {
            if (err) {
                console.error('Something went wrong:', err);
                return res.status(500).send('Oops, better luck next time!');
            }
            res.status(context.status ? context.status : 200);
            return res.send(
                content
                    .replace('<div id="root"></div>', `<div id="root">${clientApp}</div>`)
                    .replace('</body>',
                        `<script>window.__ROUTE_DATA__ = ${serializeJavascript(context.data)}</script></body>`
                        //  can be accessed by staticContext when rendering on the server
                    )
            );
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});