import { createServer } from 'https';
import { readFileSync } from 'fs';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { App } from '../App';
import { indexTemplate } from './indexTemplate';
import { verifyLaunchParams } from '../utils/verifyLaunchParams';

const crypto = require('crypto');

const app = express();

const server = createServer({
  key: readFileSync('key.pem'),
  cert: readFileSync('cert.pem'),
}, app);

app.use('/static', express.static('./dist/client'));


app.get('/*', (req, res) => {
  const params = Object.entries(req.query).map(([key, value]) => `${key}=${value}`).join('&');
  const areLaunchParamsValid = verifyLaunchParams(params, 'nXvIHScwWOqKswZKgOdq');

  if (areLaunchParamsValid) {
    res.send(indexTemplate(renderToString(App)))
  }
});

server.listen(3000, () => console.log('Server started on https://localhost:3000'));